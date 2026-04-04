import type { ProductVariantResponseDto } from "@cart-app/types";
import styles from "./ProductVariant.module.scss";

interface ProductVariantProps {
  variant: ProductVariantResponseDto;
  isSelected: boolean;
  onSelect: (variantId: string) => void;
}

const ProductVariant = ({
  variant,
  isSelected,
  onSelect,
}: ProductVariantProps) => {
  return (
    <button
      className={`${styles.variantButton} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelect(variant.id)}
    >
      {variant.shirtSize ?? variant.shoeSize}
    </button>
  );
};

export default ProductVariant;
