import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { UserAddressDto } from '@users/dto/user-address.dto';
import { ActionResponseDto } from 'src/common/dto/common';

export class OrderListDto {
  @ApiProperty({ description: 'Unique identifier of the order' })
  id: string;

  @ApiProperty({ description: 'Total price of the order', example: 59.99 })
  totalPrice: number;

  @ApiProperty({
    description: 'Status of the order',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ApiProperty({
    description: 'Date and time when the order was created',
    example: '2026-03-30T20:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Information about the user who made the order',
    example: {
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
  })
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };

  @ApiProperty({ description: 'Shipping address of the order', type: () => UserAddressDto })
  shippingAddress: UserAddressDto;
}

export class OrderUpdateResponseDto extends ActionResponseDto {
  @ApiProperty({ description: 'New order status after update', enum: OrderStatus })
  status: OrderStatus;
}
