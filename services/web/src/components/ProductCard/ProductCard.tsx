import type { ProductListDto } from "@cart-app/types";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: ProductListDto;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, images } = product;
  return (
    <div className={styles.card}>
      <img src={images[0].url} alt={name} />
      <span>{name}</span>
      <span>{price}</span>
    </div>
  );
};

export default ProductCard;
