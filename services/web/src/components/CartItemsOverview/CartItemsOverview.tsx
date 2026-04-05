import { useCartItems } from "@api/cart";
import CartItemCard from "@components/CartItemCard";
import EmptyState from "@components/EmptyState";
import FetchError from "@components/FetchError";
import LoadingState from "@components/LoadingState";
import styles from "./CartItemsOverview.module.scss";

interface CartItemsOverviewProps {
  onProceed: () => void;
}
const CartItemsOverview = ({ onProceed }: CartItemsOverviewProps) => {
  const { data: cartItems = [], isLoading, isError, refetch } = useCartItems();

  if (isError)
    return <FetchError message="Error loading cart items" onRetry={refetch} />;

  const isEmpty = !isLoading && cartItems.length === 0;

  const total =
    cartItems?.reduce((acc, item) => acc + item.quantity * item.price, 0) ?? 0;

  return (
    <>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>My Cart</h1>
      </div>

      <div className={styles.cartItemContainer}>
        {isLoading && <LoadingState />}
        {isEmpty && <EmptyState message="No cart items found" />}
        {cartItems.map((item) => (
          <CartItemCard key={item.variantId + item.color} item={item} />
        ))}

        <div className={styles.paymentWrapper}>
          <div className={styles.paymentInfo}>
            <div className={styles.group}>
              <span>You are paying</span>
              <span>with PDV</span>
            </div>
            <span className={styles.total}>{total.toFixed(2)} $</span>
          </div>

          <button
            className={styles.proceedButton}
            onClick={onProceed}
            disabled={isEmpty}
          >
            Proceed
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItemsOverview;
