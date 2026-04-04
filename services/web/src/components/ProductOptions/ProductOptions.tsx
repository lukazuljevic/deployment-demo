import {
  ProductColor,
  type ProductImageResponseDto,
  type ProductVariantResponseDto,
} from "@cart-app/types";
import ProductColors from "@components/ProductColors";
import ProductVariant from "@components/ProductVariant";
import QuantitySelector from "@components/QuantitySelector";
import useCart from "@hooks/useCart";
import useNotifications from "@hooks/useNotifications";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import styles from "./ProductOptions.module.scss";

interface ProductOptionsProps {
  productName: string;
  productVariants: ProductVariantResponseDto[];
  images: ProductImageResponseDto[];
}

const ProductOptions = ({
  productName,
  images,
  productVariants,
}: ProductOptionsProps) => {
  const [selectedColor, setSelectedColor] = useState<
    ProductColor | undefined
  >();
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();

  const handleColorClick = (color: ProductColor) => {
    setSelectedColor(color);
  };

  const handleVariantSelect = (variantId: string) => {
    setSelectedVariant(variantId);
  };

  const selectedVariantObject = useMemo(
    () => productVariants.find((v) => v.id === selectedVariant),
    [productVariants, selectedVariant],
  );

  const handleAddToCart = () => {
    if (
      selectedColor === undefined ||
      selectedVariant === undefined ||
      selectedVariantObject === undefined
    ) {
      toast.error("You must choose color and size(variant)");
      return;
    }

    const { success, message } = addToCart(
      {
        variantId: selectedVariant,
        color: selectedColor,
        quantity,
      },
      selectedVariantObject.stock,
    );

    if (success) {
      toast.success(message);
      addNotification(
        `Added ${quantity} x ${productName} (${selectedColor.toLowerCase()}) to cart`,
      );
    } else toast.error(message);
  };

  return (
    <div className={styles.optionsWrapper}>
      <div className={styles.colorContainer}>
        <ProductColors
          images={images}
          onSelectColor={handleColorClick}
          selectedColor={selectedColor}
        />
      </div>

      <div className={styles.variantsWrapper}>
        <div className={styles.variantsContainer}>
          {productVariants.map((variant) => (
            <ProductVariant
              key={variant.id}
              variant={variant}
              isSelected={variant.id === selectedVariant}
              onSelect={handleVariantSelect}
            />
          ))}
        </div>
        <button className={styles.submitButton} onClick={handleAddToCart}>
          Add To Cart
        </button>
        <QuantitySelector
          onChange={setQuantity}
          value={quantity}
          max={selectedVariantObject?.stock ?? 1}
          disabled={!selectedVariant || !selectedColor}
        />
      </div>
    </div>
  );
};

export default ProductOptions;
