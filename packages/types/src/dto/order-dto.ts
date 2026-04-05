import {
  ClothingSize,
  OrderStatus,
  PaymentMethod,
  ProductColor,
} from "../enums/enum";
import { UserAddressDto } from "./user-dto";

export interface MailDto {
  items: MailItem[];
  totalPrice?: number;
}

export interface MailItem {
  productName: string;
  brand: string;
  size: ClothingSize | number | null;
  color: ProductColor;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface CartItemDto {
  variantId: string;
  quantity: number;
  color: string;
}

export interface CreateOrderDto {
  cartItems: CartItemDto[];
  paymentMethod: PaymentMethod;
}

export interface FindOrdersDto {
  orderStatus?: OrderStatus;
}

export class OrderListDto {
  id: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  shippingAddress: UserAddressDto;
}
