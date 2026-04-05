import thankYou from "@assets/images/thankyou.svg";
import useGoHome from "@hooks/useGoHome";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "./CartSuccessState.module.scss";

const CartSuccessState = () => {
  const goHome = useGoHome();

  return createPortal(
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={goHome}>
        <FaTimes size={32} />
      </button>
      <div className={styles.innerContainer}>
        <img src={thankYou} alt="thank you" />
        <p className={styles.message}>Thank you for buying with us</p>
      </div>
    </div>,
    document.getElementById("root")!,
  );
};

export default CartSuccessState;
