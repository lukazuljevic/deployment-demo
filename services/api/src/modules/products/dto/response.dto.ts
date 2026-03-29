import { ProductType, ShirtSize } from '@cart-app/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductActionResponseDto {
  @ApiProperty({ description: 'Created product id' })
  id: string;

  @ApiPropertyOptional({ description: 'Description of the performed action' })
  message?: string;
}

export class ProductImageResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ description: 'Image URL' })
  url: string;

  @ApiPropertyOptional({ description: 'Color associated with image' })
  color?: string;
}

export class ProductVariantResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the variant',
  })
  id: string;

  @ApiPropertyOptional({
    description: 'Shirt size (if product is clothing)',
    enum: ShirtSize,
  })
  shirtSize?: ShirtSize;

  @ApiPropertyOptional({
    description: 'Shirt size (if product is shoes)',
    example: 42,
  })
  shoeSize?: number;

  @ApiProperty({
    description: 'Available stock for this variant',
    example: 5,
  })
  stock: number;
}

export class ProductListDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiPropertyOptional({ description: 'If user marks product as favorite this field will be true' })
  isFavorite?: boolean;

  @ApiProperty({ type: () => [ProductImageResponseDto] })
  images: ProductImageResponseDto[];
}

export class ProductResponseDto extends ProductListDto {
  @ApiProperty({ description: 'Full product description' })
  description: string;

  @ApiProperty({ description: 'Brand of the product' })
  brand: string;

  @ApiProperty({ description: 'Product type (CLOTHING, SHOES)', enum: ProductType })
  type: ProductType;

  @ApiProperty({
    type: () => [ProductVariantResponseDto],
    description: 'Available product variants (sizes, stock)',
  })
  variants: ProductVariantResponseDto[];
}
