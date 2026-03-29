import { ProductListDto, ProductResponseDto, ProductType } from "@cart-app/types";
import { ProductWithRelations } from "@products/products.service";
import mapToImageDto from "./map-to-image-dto.helper";
import mapToVariantDto from "./map-to-variant.dto.helper";


export function mapProductDetails(
  product: ProductWithRelations,
  isFavorite?: boolean,
): ProductResponseDto {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    description: product.description,
    brand: product.brand,
    type: product.type as ProductType,
    images: product.images.map(mapToImageDto),
    variants: product.variants.map(mapToVariantDto),
    ...(isFavorite === undefined ? {} : { isFavorite }),
  };
}

export function mapProductList(
  product: ProductWithRelations,
  isFavorite?: boolean,
): ProductListDto {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    images: product.images.map(mapToImageDto),
    ...(isFavorite === undefined ? {} : { isFavorite }),
  };
}