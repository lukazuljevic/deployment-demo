import { useCategories } from "@api/category";
import blackHoodie from "@assets/images/homeCollections/blackHoodie.svg";
import blackShirt from "@assets/images/homeCollections/blakcShirt.svg";
import grayHoodie from "@assets/images/homeCollections/grayHoodie.svg";
import streetShirt from "@assets/images/homeCollections/streetShirt.svg";
import link from "@assets/images/link.svg";
import FetchError from "@components/FetchError";
import HomeHeader from "@components/HomeHeader";
import HomePageProductCard from "@components/HomePageProductCard";
import LoadingState from "@components/LoadingState";
import useHomePageProducts from "@hooks/useHomePageProducts";
import useInfiniteScroll from "@hooks/useInfiniteScroll";
import { productsRoute } from "@routes/productRoute";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useHomePageProducts();

  const ref = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const { data: categories } = useCategories();

  const categoriesByName = useMemo(() => {
    if (!categories) return {};

    return {
      casual: categories.find((c) => c.name.toLowerCase() === "casual"),
      formal: categories.find((c) => c.name.toLowerCase() === "formal"),
      streetwear: categories.find((c) => c.name.toLowerCase() === "streetwear"),
    };
  }, [categories]);

  const products = data?.pages.flatMap((page) => page.results) ?? [];

  if (isError)
    return <FetchError message="Error loading products" onRetry={refetch} />;

  return (
    <>
      <HomeHeader />
      <div className={styles.container}>
        {isLoading && <LoadingState />}

        <div className={styles.cardContainer}>
          <div
            className={styles.collection}
            style={{ border: "2px solid gray" }}
          >
            <div className={styles.imageWrapper}>
              <img src={grayHoodie} alt="gray hoodie" />
              <img src={blackHoodie} alt="black hoodie" />
            </div>
            <div className={styles.content} style={{ backgroundColor: "gray" }}>
              <span>Explore our casual collection</span>
              <Link
                to={productsRoute.id}
                search={{
                  categoryId: categoriesByName.casual?.id ?? undefined,
                }}
                className={styles.card}
              >
                <button className={styles.linkButton}>
                  <img src={link} alt="link button" />
                </button>
              </Link>
            </div>
          </div>

          <div
            className={styles.collection}
            style={{ border: "2px solid var(--bg-color-brown)" }}
          >
            <div className={styles.imageWrapper}>
              <img src={blackShirt} alt="black shirt" />
            </div>
            <div
              className={styles.content}
              style={{ backgroundColor: "var(--bg-color-brown)" }}
            >
              <span>Be ready for special occasions</span>
              <Link
                to={productsRoute.id}
                search={{
                  categoryId: categoriesByName.formal?.id ?? undefined,
                }}
                className={styles.card}
              >
                <button className={styles.linkButton}>
                  <img src={link} alt="link button" />
                </button>
              </Link>
            </div>
          </div>
          <div
            className={styles.collection}
            style={{ border: "2px solid var(--color-orange)" }}
          >
            <div className={styles.imageWrapper}>
              <img src={streetShirt} alt="street shirt" />
            </div>
            <div
              className={styles.content}
              style={{ backgroundColor: "var(--color-orange)" }}
            >
              <span>Explore our streetwear collection</span>
              <Link
                to={productsRoute.id}
                search={{
                  categoryId: categoriesByName.streetwear?.id ?? undefined,
                }}
                className={styles.card}
              >
                <button className={styles.linkButton}>
                  <img src={link} alt="link button" />
                </button>
              </Link>
            </div>
          </div>
          {products?.map((product) => (
            <HomePageProductCard key={product.id} product={product} />
          ))}
        </div>

        <div ref={ref} style={{ height: 1 }} />
      </div>
    </>
  );
};

export default HomePage;
