import { MailItem, ProductColor, ShirtSize } from '@cart-app/types';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AddressType } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UsersService } from '@users/users.service';
import { ActionResponseDto } from 'src/common/dto/common';
import { MailsService } from '../mails/mails.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersDto } from './dto/find-orders.dto';
import { OrderListDto, OrderUpdateResponseDto } from './dto/response.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { allowedTransitions } from './validation/update.validation';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly users: UsersService,
    private readonly mail: MailsService,
  ) {}

  async create(userId: string, dto: CreateOrderDto): Promise<ActionResponseDto> {
    const user = await this.users.findOneByid(userId);

    if (!user) throw new NotFoundException('User not found');

    const shippingAddress = user.addresses.find((a) => a.type === AddressType.SHIPPING);
    const billingAddress = user.addresses.find((a) => a.type === AddressType.BILLING);

    if (!shippingAddress || !billingAddress) {
      throw new BadRequestException('Billing or Shipping address missing');
    }

    const variantIds = dto.cartItems.map((i) => i.variantId);
    const variants = await this.prisma.productVariant.findMany({
      where: { id: { in: variantIds } },
      include: { product: { include: { images: true } } },
    });

    if (!variants?.length)
      throw new NotFoundException(`There are no product variants associated with cart items`);

    let totalPrice = 0;
    const orderItemsData: any = [];
    const mailItemsData: MailItem[] = [];

    for (const cartItem of dto.cartItems) {
      const variant = variants.find((v) => v.id === cartItem.variantId)!;

      const product = variant.product;

      if (variant.stock < cartItem.quantity)
        throw new BadRequestException(`Not enough stock for ${product.name}`);

      const image = product.images.find((img) => img.color === cartItem.color);
      if (!image)
        throw new BadRequestException(
          `No image available for color ${cartItem.color} of product ${product.name}`,
        );

      orderItemsData.push({
        variantId: variant.id,
        quantity: cartItem.quantity,
        price: product.price,
      });

      variant.stock -= cartItem.quantity;
      totalPrice += Number(product.price) * cartItem.quantity;

      mailItemsData.push({
        productName: product.name,
        brand: product.name,
        size: (variant.shirtSize as ShirtSize) ?? variant.shoeSize,
        color: cartItem.color as ProductColor,
        quantity: cartItem.quantity,
        price: Number(product.price),
        imageUrl: image?.url,
      });

      await this.prisma.productVariant.update({
        where: { id: variant.id },
        data: { stock: variant.stock },
      });
    }

    const order = await this.prisma.order.create({
      data: {
        userId,
        totalPrice,
        shippingAddressId: shippingAddress.id,
        billingAddressId: billingAddress.id,
        items: { create: orderItemsData },
      },
    });

    const mailDto = { items: mailItemsData, totalPrice };

    await this.mail.sendMail(user.email, 'Your Order Confirmation', mailDto);

    return { message: 'Order successfully created', id: order.id };
  }

  async findAll({ orderStatus }: FindOrdersDto): Promise<OrderListDto[]> {
    const orders = await this.prisma.order.findMany({
      where: orderStatus ? { status: orderStatus } : undefined,
      include: {
        user: true,
        shippingAddress: true,
      },
    });
    return orders.map((o) => ({
      id: o.id,
      totalPrice: Number(o.totalPrice),
      status: o.status,
      createdAt: o.createdAt,
      user: {
        email: o.user.email,
        firstName: o.user.firstName,
        lastName: o.user.lastName,
      },
      shippingAddress: {
        street: o.shippingAddress.street,
        city: o.shippingAddress.city,
        zipcode: o.shippingAddress.zipcode,
        country: o.shippingAddress.country,
        county: o.shippingAddress.county,
        type: o.shippingAddress.type,
      },
    }));
  }

  async update(orderId: string, { status }: UpdateOrderStatusDto): Promise<OrderUpdateResponseDto> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) throw new NotFoundException(`Order with id ${orderId} not found`);

    if (!allowedTransitions[order.status].includes(status))
      throw new BadRequestException(`Cannot change status from ${order.status} to ${status}`);

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return { message: 'Order status updated', id: updated.id, status: updated.status };
  }
}
