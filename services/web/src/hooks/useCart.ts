import { type CartItemDto } from "@cart-app/types";
import LocalStorage from "@helpers/LocalStorage";
import { useLocalStorage } from "./useLocalStorage";

const useCart = () => {
  const [cartItems, setCartItems] = useLocalStorage<CartItemDto[]>({
    key: LocalStorage.cartkey,
    initialValue: [],
  });

  const addToCart = (item: CartItemDto, maxStock: number) => {
    const existingIndex = cartItems.findIndex(
      (ci) => ci.variantId === item.variantId && ci.color === item.color,
    );

    let desiredQuantity = item.quantity;

    if (existingIndex !== -1)
      desiredQuantity += cartItems[existingIndex].quantity;

    if (desiredQuantity > maxStock)
      return {
        success: false,
        message: `You can add only ${maxStock} of this product, you have already added ${cartItems[existingIndex]?.quantity ?? item.quantity}`,
      };

    if (existingIndex === -1) {
      setCartItems([...cartItems, item]);
    } else {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity = desiredQuantity;
      setCartItems(updatedItems);
    }

    return { success: true, message: "Added product to cart" };
  };

  return {
    addToCart,
    cartItems,
  };
};

export default useCart;
