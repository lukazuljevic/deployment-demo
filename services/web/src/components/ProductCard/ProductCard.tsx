import type { ProductListDto } from "@cart-app/types";
import FavoriteButton from "@components/FavoriteButton";
import ProductColors from "@components/ProductColors";
import useDisableFavorite from "@hooks/disableFavorite";
import { useToggleFavorite } from "@hooks/useToggleFavorite";
import { productRoute } from "@routes/productRoute";
import { Link, useLocation } from "@tanstack/react-router";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: ProductListDto;
}

const CLICK_TIMEOUT = 3000;

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, images, description, brand, isFavorite } = product;
  const toggleFavorite = useToggleFavorite({
    productId: product.id,
    isFavorite,
  });

  const location = useLocation();

  const { disabledFavorite, disable, enable } = useDisableFavorite();

  const handleFavoriteClick = () => {
    if (disabledFavorite) return;

    disable();

    toggleFavorite.mutate(undefined, {
      onSettled: () => {
        setTimeout(() => {
          enable();
        }, CLICK_TIMEOUT);
      },
    });
  };

  return (
    <Link
      to={productRoute.id}
      params={{ productId: product.id }}
      search={location.search}
      className={styles.card}
    >
      <div className={styles.btnContainer}>
        <FavoriteButton
          onToggle={handleFavoriteClick}
          isFavorite={isFavorite}
          disabled={disabledFavorite}
        />
      </div>
      <div className={styles.imageWrapper}>
        <img src={images[0].url} alt={name} className={styles.productImg} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>
          {brand} {name}
        </h3>
        <span className={styles.description}>{description}</span>
        <span>{price}$</span>
        <div className={styles.colorContainer}>
          <ProductColors images={images} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
