import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styles from "./FavoriteButton.module.scss";

interface FavoriteButtonProps {
  onToggle: (e: React.MouseEvent) => void;
  isFavorite?: boolean;
  disabled: boolean;
}

const FavoriteButton = ({
  isFavorite,
  onToggle,
  disabled,
}: FavoriteButtonProps) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={styles.favoriteBtn}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {isFavorite ? (
        <AiFillHeart color="red" size={24} />
      ) : (
        <AiOutlineHeart color="black" size={24} />
      )}
    </button>
  );
};

export default FavoriteButton;
