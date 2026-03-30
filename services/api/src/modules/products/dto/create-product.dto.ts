import {
  MAX_DESC_LENGTH,
  MAX_SHOE_SIZE,
  MIN_ARRAY_SIZE,
  MIN_DESC_LENGTH,
  MIN_PRICE,
  MIN_SHOE_SIZE,
  MIN_STOCK_NUMBER,
} from '@cart-app/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductColor, ProductType, ShirtSize } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateProductVariantDto {
  @ApiPropertyOptional({
    description: 'Shirt size (if product is clothing)',
    enum: ShirtSize,
  })
  @IsOptional()
  @IsEnum(ShirtSize)
  shirtSize?: ShirtSize;

  @ApiPropertyOptional({
    description: 'Shoe size (if applicable)',
    minimum: MIN_SHOE_SIZE,
    maximum: MAX_SHOE_SIZE,
  })
  @IsOptional()
  @IsInt()
  @Min(MIN_SHOE_SIZE)
  @Max(MAX_SHOE_SIZE)
  shoeSize?: number;

  @ApiProperty({ description: 'Stock quantity for this variant', minimum: MIN_STOCK_NUMBER })
  @IsInt()
  @Min(MIN_STOCK_NUMBER)
  stock: number;
}

export class CreateProductImageDto {
  @ApiProperty({ description: 'Image URL', default: 'http://example.image.com' })
  @IsUrl()
  url: string;

  @ApiPropertyOptional({ description: 'Color associated with image', enum: ProductColor })
  @IsOptional()
  @IsEnum(ProductColor)
  color?: ProductColor;
}

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Full product description',
    minimum: MIN_DESC_LENGTH,
    maximum: MAX_DESC_LENGTH,
  })
  @IsString()
  @Length(MIN_DESC_LENGTH, MAX_DESC_LENGTH)
  description: string;

  @ApiProperty({ description: 'Brand name' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ description: 'Category id of product' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ description: 'Product type', enum: ProductType })
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty({
    description: `Product price with minimum value of: ${MIN_PRICE} euro`,
    minimum: MIN_PRICE,
  })
  @IsNumber()
  @Min(MIN_PRICE)
  price: number;

  @ApiProperty({
    description: 'Product variants (stock,shoe size, shirt size)',
    type: () => [CreateProductVariantDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  @ArrayMinSize(MIN_ARRAY_SIZE)
  variants: CreateProductVariantDto[];

  @ApiProperty({ description: 'Product images (url, color)', type: () => [CreateProductImageDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  @ArrayMinSize(MIN_ARRAY_SIZE)
  images: CreateProductImageDto[];
}
