import { SortOrder } from "@cart-app/types";
import CategoryCard from "@components/CategoryCard";
import ProductSort from "@components/ProductSort";
import SearchBar from "@components/SearchBar/SearchBar";
import useProductsPage from "@hooks/useProductsPage";
import styles from "./ProductHeader.module.scss";

const ProductsHeader = () => {
  const { search, categories, handleSearch, handleCategory, handleSortOrder } =
    useProductsPage();

  return (
    <div className={styles.header}>
      <SearchBar
        value={search.search || ""}
        placeholder="Search for..."
        onSearchChange={handleSearch}
      />

      <div className={styles.categoriesContainer}>
        <CategoryCard key="all" name="All" id="" onSelect={handleCategory} />
        {categories?.map((cat) => (
          <CategoryCard
            key={cat.id}
            name={cat.name}
            id={cat.id}
            onSelect={handleCategory}
            isActive={cat.id === search.categoryId}
          />
        ))}
      </div>

      <div className={styles.sortWrapper}>
        <span className={styles.sortText}>Sort by name</span>
        <ProductSort
          onSortOrderChange={handleSortOrder}
          sortOrder={search.sortOrder || SortOrder.ASC}
        />
      </div>
    </div>
  );
};

export default ProductsHeader;
