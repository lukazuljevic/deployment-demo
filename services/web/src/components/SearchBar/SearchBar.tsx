import searchIcon from "@assets/images/search.svg";
import { useDebounce } from "@hooks/useDebounce";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarOptions {
  value: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onSearchChange,
  placeholder,
}: SearchBarOptions) => {
  const firstRender = useRef(true);
  const [internalValue, setInternalValue] = useState(value);
  const debouncedValue = useDebounce({ value: internalValue });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    onSearchChange(debouncedValue);
  }, [debouncedValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <img src={searchIcon} alt="Search" className={styles.searchIcon} />
      <input
        type="text"
        placeholder={placeholder ?? "Type your input here..."}
        value={internalValue}
        onChange={handleChange}
        className={styles.searchInput}
      ></input>
    </div>
  );
};

export default SearchBar;
