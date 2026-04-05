import { ClothingSize, ProductColor } from "../enums/enum";

export class CartItemResponseDto {
  productId: string;
  variantId: string;
  name: string;
  brand: string;
  imageUrl: string;
  size: ClothingSize | number | null;
  color: ProductColor;
  quantity: number;
  price: number;
}
