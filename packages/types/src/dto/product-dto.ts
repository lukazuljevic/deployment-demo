
import { ProductType, ShirtSize } from "../enums/enum";

export interface ProductActionResponseDto {
  id: string;
  response: string;
}

export interface ProductImageResponseDto {
  id: string;
  url: string;
  color?: string;
}

export interface ProductVariantResponseDto {
  id: string;
  shirtSize?: ShirtSize;
  shoeSize?: number;
  stock: number;
}

export interface ProductListDto {
  id: string;
  name: string;
  price: number;
  isFavorite: boolean;
  images: ProductImageResponseDto[];
}

export interface ProductResponseDto extends ProductListDto {
  description: string;
  brand: string;
  type: ProductType;
  variants: ProductVariantResponseDto[];
}