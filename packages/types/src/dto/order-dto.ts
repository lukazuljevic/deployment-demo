import { ProductColor, ShirtSize } from "../enums/enum";

export interface MailDto {
  items: MailItem[];
  totalPrice?: number;
}

export interface MailItem {
  productName: string;
  brand: string;
  size: ShirtSize | number | null;
  color: ProductColor;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface CartItemDto {
  variantId: string;
  quantity: number;
  color: string;
}
