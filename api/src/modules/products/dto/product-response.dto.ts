import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { ProductListDto } from './product-list.dto';
import { ProductVariantResponseDto } from './product-variant-response.dto';

export class ProductResponseDto extends ProductListDto {
  @ApiProperty({ description: 'Full product description' })
  description: string;

  @ApiProperty({ description: 'Brand of the product' })
  brand: string;

  @ApiProperty({ description: 'Product type (CLOTHING, SHOES)', enum: ProductType })
  type: ProductType;

  @ApiProperty({
    type: [ProductVariantResponseDto],
    description: 'Available product variants (sizes, stock)',
  })
  variants: ProductVariantResponseDto[];
}
