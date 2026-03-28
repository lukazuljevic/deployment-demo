import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShirtSize } from '@prisma/client';

export class ProductVariantResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the variant',
  })
  id: string;

  @ApiPropertyOptional({
    description: 'Shirt size (if product is clothing)',
    enum: ShirtSize,
  })
  size?: ShirtSize;

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
