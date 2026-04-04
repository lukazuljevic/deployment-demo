import type { ProductColor, ProductImageResponseDto } from "@cart-app/types";
import Color from "@components/Color";
import styles from "./ProductColors.module.scss";

interface ProductColorsProps {
  images: ProductImageResponseDto[];
  selectedColor?: ProductColor;
  onSelectColor?: (color: ProductColor) => void;
}

const ProductColors = ({
  images,
  onSelectColor,
  selectedColor,
}: ProductColorsProps) => {
  return (
    <>
      {images
        .filter((img) => img.color !== undefined)
        .map((img) => {
          const isSelectable = !!onSelectColor && img.color !== selectedColor;

          return (
            <button
              key={img.id}
              onClick={() => onSelectColor?.(img.color!)}
              style={{
                border:
                  img.color === selectedColor ? "4px solid orange" : "none",
                cursor: isSelectable ? "pointer" : "default",
              }}
              className={isSelectable ? styles.hoverable : ""}
            >
              <Color color={img.color!} />
            </button>
          );
        })}
    </>
  );
};

export default ProductColors;
