import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductType, ShirtSize } from '@prisma/client';
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

  @ApiPropertyOptional({ description: 'Shoe size (if applicable)' })
  @IsOptional()
  @IsInt()
  @Min(30)
  @Max(50)
  shoeSize?: number;

  @ApiProperty({ description: 'Stock quantity for this variant' })
  @IsInt()
  @Min(0)
  stock: number;
}

export class CreateProductImageDto {
  @ApiProperty({ description: 'Image URL' })
  @IsUrl()
  url: string;

  @ApiPropertyOptional({ description: 'Color associated with image' })
  @IsOptional()
  @IsString()
  color?: string;
}

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Full product description' })
  @IsString()
  @Length(1, 500)
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

  @ApiProperty({ description: 'Brand name' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Product variants (stock,shoe size, shirt size)',
    type: [CreateProductVariantDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  @ArrayMinSize(1)
  variants: CreateProductVariantDto[];

  @ApiProperty({ description: 'Product images (url, color)', type: [CreateProductImageDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  @ArrayMinSize(1)
  images: CreateProductImageDto[];
}
