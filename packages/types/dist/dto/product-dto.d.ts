import { ProductColor, ProductType, ShirtSize, SortOrder } from "../enums/enum";
export interface ProductImageResponseDto {
  id: string;
  url: string;
  color?: ProductColor;
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
  isFavorite?: boolean;
  images: ProductImageResponseDto[];
}
export interface ProductResponseDto extends ProductListDto {
  description: string;
  brand: string;
  type: ProductType;
  variants: ProductVariantResponseDto[];
}
export interface FindProductsDto {
  categoryId?: string;
  search?: string;
  sortOrder?: SortOrder;
  inStock?: boolean;
  pageNumber?: number;
  limit?: number;
}
