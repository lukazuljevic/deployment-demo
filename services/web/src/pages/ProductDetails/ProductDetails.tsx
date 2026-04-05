import popupExit from "@assets/images/popup_exit.svg";
import type { ProductResponseDto } from "@cart-app/types";
import ColorFilterPopup from "@components/ColorFilterPopup";
import ProductOptions from "@components/ProductOptions/ProductOptions";
import useCarousel from "@hooks/useCarousel";
import { productRoute, productsRoute } from "@routes/productRoute";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./ProductDetails.module.scss";

const ProductDetails = () => {
  const product: ProductResponseDto = productRoute.useLoaderData();

  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    navigate({ to: productsRoute.id, search: location.search });
  };

  const {
    currentItem: currentImage,
    next,
    prev,
  } = useCarousel({ items: product.images });

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.imageCarousel}>
        <button onClick={prev} className={styles.prevButton}>
          <FaChevronLeft size={26} />
        </button>

        <img
          src={currentImage.url}
          className={styles.carouselImage}
          alt="product"
        />

        <button onClick={next} className={styles.nextButton}>
          <FaChevronRight size={26} />
        </button>
      </div>

      <div className={styles.info}>
        <span className={styles.name}>
          {product.brand} {product.name}
        </span>
        <span className={styles.price}>{product.price} $</span>
      </div>
      <div className={styles.options}>
        <ProductOptions
          productId={product.id}
          initialFavorite={product.isFavorite!}
          productName={`${product.brand} ${product.name}`}
          images={product.images}
          productVariants={product.variants}
        />
      </div>
      <button onClick={handleClose} className={styles.exitButton}>
        <img src={popupExit} alt="exit" />
      </button>
      <ColorFilterPopup />
    </div>
  );
};

export default ProductDetails;
