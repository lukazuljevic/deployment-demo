import type { CartItemDto } from "@cart-app/types";

class LocalStorage {
  static readonly accessTokenKey = "accessToken";
  static readonly cartkey = "cart";

  static getAccessToken(): string | null {
    const stored = localStorage.getItem(LocalStorage.accessTokenKey);
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      return stored;
    }
  }

  static getCart(): CartItemDto[] {
    const stored = localStorage.getItem(LocalStorage.cartkey);
    if (!stored) return [];

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  static addToCard(item: CartItemDto) {
    const cart = LocalStorage.getCart();
    cart.push(item);
    localStorage.setItem(LocalStorage.cartkey, JSON.stringify(cart));
  }
}

export default LocalStorage;
