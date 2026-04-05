import SearchBar from "@components/SearchBar/SearchBar";
import useHomePageProducts from "@hooks/useHomePageProducts";
import styles from "./HomeHeader.module.scss";

const HomeHeader = () => {
  const { search, handleSearch } = useHomePageProducts();

  return (
    <div className={styles.header}>
      <SearchBar
        value={search.search || ""}
        placeholder="Search for..."
        onSearchChange={handleSearch}
      />
    </div>
  );
};

export default HomeHeader;
