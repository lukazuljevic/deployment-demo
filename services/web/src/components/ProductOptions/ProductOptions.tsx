import type {
  ProductColor,
  ProductImageResponseDto,
  ProductVariantResponseDto,
} from "@cart-app/types";
import FavoriteButton from "@components/FavoriteButton";
import ProductColors from "@components/ProductColors";
import ProductVariant from "@components/ProductVariant";
import QuantitySelector from "@components/QuantitySelector";
import useDisableFavorite from "@hooks/disableFavorite";
import useCart from "@hooks/useCart";
import useNotifications from "@hooks/useNotifications";
import { useToggleFavorite } from "@hooks/useToggleFavorite";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import styles from "./ProductOptions.module.scss";

interface ProductOptionsProps {
  productId: string;
  initialFavorite: boolean;
  productName: string;
  productVariants: ProductVariantResponseDto[];
  images: ProductImageResponseDto[];
}

const CLICK_TIMEOUT = 3000;

const ProductOptions = ({
  productId,
  initialFavorite,
  productName,
  images,
  productVariants,
}: ProductOptionsProps) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>();
  const [selectedVariant, setSelectedVariant] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const { addToCart } = useCart();
  const { createNotification } = useNotifications();

  const { disabledFavorite, disable, enable } = useDisableFavorite();

  const toggleFavorite = useToggleFavorite({
    productId,
    isFavorite,
  });

  const handleFavoriteClick = () => {
    if (disabledFavorite) return;

    disable();

    toggleFavorite.mutate(undefined, {
      onSuccess: () => setIsFavorite(!isFavorite),
      onSettled: () => {
        setTimeout(() => {
          enable();
        }, CLICK_TIMEOUT);
      },
    });
  };

  const selectedVariantObject = useMemo(
    () => productVariants.find((v) => v.id === selectedVariant),
    [productVariants, selectedVariant],
  );

  const handleAddToCart = () => {
    if (!selectedColor || !selectedVariant || !selectedVariantObject) {
      toast.error("You must choose color and size(variant)");
      return;
    }

    addToCart.mutate(
      {
        variantId: selectedVariant,
        color: selectedColor,
        quantity,
      },
      {
        onSuccess: () => {
          createNotification(
            `Added ${quantity} x ${productName} (${selectedColor.toLowerCase()}) to cart`,
          );
        },
      },
    );
  };

  return (
    <div className={styles.optionsWrapper}>
      <div className={styles.colorContainer}>
        <ProductColors
          images={images}
          onSelectColor={setSelectedColor}
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
              onSelect={setSelectedVariant}
            />
          ))}
        </div>

        <div className={styles.wrapper}>
          <button className={styles.submitButton} onClick={handleAddToCart}>
            Add To Cart
          </button>

          <div className={styles.favoriteWrapper}>
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={handleFavoriteClick}
              disabled={disabledFavorite}
            ></FavoriteButton>
          </div>
        </div>

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
