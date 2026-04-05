import { useCartItems } from "@api/cart";
import { useProfile } from "@api/profile";
import cash from "@assets/images/cash.svg";
import creditCard from "@assets/images/credit-card.svg";
import truck from "@assets/images/truck.svg";
import { AddressType } from "@cart-app/types";
import FetchError from "@components/FetchError";
import LoadingState from "@components/LoadingState";
import useCart from "@hooks/useCart";
import useNotifications from "@hooks/useNotifications";
import usePlaceOrder from "@hooks/usePlaceorder";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./CartCheckout.module.scss";

enum PaymentMethod {
  CARD = "CARD",
  CASH = "CASH",
}

interface CartCheckoutProps {
  onProceed: () => void;
}
const CartCheckout = ({ onProceed }: CartCheckoutProps) => {
  const {
    data: profile,
    isLoading: profileLoading,
    isError,
    refetch,
  } = useProfile();

  const placeOrderMutation = usePlaceOrder();
  const { data: cartItems = [], isLoading: cartLoading } = useCartItems();
  const { clearCart } = useCart();
  const { createNotification } = useNotifications();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null,
  );

  if (isError || !profile)
    return (
      <FetchError message="Error loading checkout info" onRetry={refetch} />
    );

  const shippingAddress = profile.addresses.find(
    (addr) => addr.type === AddressType.SHIPPING,
  );
  const billingAddress = profile.addresses.find(
    (addr) => addr.type === AddressType.BILLING,
  );

  const handlePlaceOrder = () => {
    if (!cartItems?.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (!selectedPayment) {
      toast.error("You must select payment method");
      return;
    }

    placeOrderMutation.mutate(
      { cartItems, paymentMethod: selectedPayment },
      {
        onSuccess: () => {
          clearCart.mutate();
          createNotification(
            `Your order has been placed successfully! You ordered ${cartItems.length} item(s).`,
          );
          onProceed();
        },
      },
    );
  };

  return (
    <>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Checkout</h1>
      </div>
      {(profileLoading || cartLoading) && <LoadingState />}
      <div className={styles.checkoutContainer}>
        <div className={styles.address}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Shipping address</h2>
            <img src={truck} alt="truck" />
          </div>
          <h3 className={styles.subtitle}>Postal Address</h3>
          <div className={styles.addressInfo}>
            <p>
              {profile.firstName} {profile.lastName}
            </p>
            <p>
              {shippingAddress?.street} {shippingAddress?.city}
            </p>
            <p>{shippingAddress?.county}</p>
            <p>
              {shippingAddress?.zipcode} {shippingAddress?.country}
            </p>
          </div>
        </div>

        <div className={styles.address}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}> address</h2>
            <img src={truck} alt="truck" />
          </div>
          <h3 className={styles.subtitle}>Billing Address</h3>
          <div className={styles.addressInfo}>
            <p>
              {profile.firstName} {profile.lastName}
            </p>
            <p>
              {billingAddress?.street} {billingAddress?.city}
            </p>
            <p>{billingAddress?.county}</p>
            <p>
              {billingAddress?.zipcode} {billingAddress?.country}
            </p>
          </div>
        </div>

        <div className={styles.paymentForm}>
          <h3>Form of Payment</h3>
          <button
            className={`${styles.methodButton} ${selectedPayment === PaymentMethod.CARD ? styles.selected : ""}`}
            onClick={() => setSelectedPayment(PaymentMethod.CARD)}
          >
            <img src={creditCard} alt="credit card payment"></img>
          </button>
          <button
            className={`${styles.methodButton} ${selectedPayment === PaymentMethod.CASH ? styles.selected : ""}`}
            onClick={() => setSelectedPayment(PaymentMethod.CASH)}
          >
            <img src={cash} alt="cash payment" />
          </button>
        </div>

        <div>
          <button className={styles.completeButton} onClick={handlePlaceOrder}>
            Complete Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CartCheckout;
