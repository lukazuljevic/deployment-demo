import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
  name: string;
  id: string;
  onSelect: (id: string) => void;
  isActive?: boolean;
}

const CategoryCard = ({ name, id, onSelect, isActive }: CategoryCardProps) => {
  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={() => onSelect(id)}
    >
      {name}
    </div>
  );
};

export default CategoryCard;
