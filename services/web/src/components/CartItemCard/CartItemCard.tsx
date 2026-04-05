import info from "@assets/images/error.svg";
import { CartItemResponseDto } from "@cart-app/types";
import priceWithoutPDV from "@helpers/priceWithPdv";
import styles from "./CartItemCard.module.scss";

interface CartItemCardProps {
  item: CartItemResponseDto;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const { imageUrl, name, brand, size, price, quantity, color } = item;

  return (
    <div className={styles.card}>
      <div className={styles.cardLeft}>
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt={name} className={styles.image} />
        </div>
        <div className={styles.shopInfo}>
          <span>Prodaje CART</span>
          <img src={info} alt="info" />
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.title}>
          <span className={styles.brand}>{brand}</span>
        </div>

        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span className={styles.variant}>
            {color[0].toLocaleUpperCase() + color.slice(1).toLocaleLowerCase()},{" "}
            {size}
          </span>
          <span className={styles.quantity}>Quantity: {quantity}</span>
        </div>

        <span className={styles.price}>
          {priceWithoutPDV(price * quantity).toFixed(2)} $
        </span>
        <div className={styles.pdvInfo}>
          <p>ukl. PDV</p>
          <p>Before: {(price * quantity).toFixed(2)} $</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
