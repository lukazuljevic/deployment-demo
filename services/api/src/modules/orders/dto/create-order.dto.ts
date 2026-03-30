import { MIN_CART_ITEMS_NUM, ProductColor } from '@cart-app/types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsEnum, IsInt, IsPositive, IsUUID, ValidateNested } from 'class-validator';

export class CartItemDto {
  @ApiProperty({ description: 'Id of product variant which is placed in cart' })
  @IsUUID()
  variantId: string;

  @ApiProperty({ description: 'Quantity of product variant which is placed in cart' })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    description: 'Color of product variant which is placed in cart',
    enum: ProductColor,
  })
  @IsEnum(ProductColor)
  color: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: () => [CartItemDto] })
  @ArrayMinSize(MIN_CART_ITEMS_NUM)
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  cartItems: CartItemDto[];
}
