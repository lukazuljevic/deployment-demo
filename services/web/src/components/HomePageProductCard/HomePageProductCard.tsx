import type { ProductListDto } from "@cart-app/types";
import styles from "./HomePageProductCard.module.scss";

interface ProductCardProps {
  product: ProductListDto;
}

const HomePageProductCard = ({ product }: ProductCardProps) => {
  const { name, price, images } = product;

  return (
    <div
      className={styles.homeCard}
      style={{ border: `2px solid ${product.images[0].color || "black"} ` }}
    >
      <div className={styles.imageWrapper}>
        <img src={images[0].url} alt={name} className={styles.productImg} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <span>{price}$</span>
      </div>
    </div>
  );
};

export default HomePageProductCard;
