import CartCheckout from "@components/CartCheckout";
import CartItemsOverview from "@components/CartItemsOverview";
import CartSuccessState from "@components/CartSuccessState";
import { useState } from "react";
import styles from "./Cart.module.scss";

type CartStep = "overview" | "checkout" | "thankyou";

const Cart = () => {
  const [step, setStep] = useState<CartStep>("overview");

  const handleProceedToCheckout = () => setStep("checkout");
  const handleCompleteOrder = () => setStep("thankyou");

  return (
    <div className={styles.cartContainer}>
      {step === "overview" && (
        <CartItemsOverview onProceed={handleProceedToCheckout} />
      )}
      {step === "checkout" && <CartCheckout onProceed={handleCompleteOrder} />}
      {step === "thankyou" && <CartSuccessState />}
    </div>
  );
};

export default Cart;
