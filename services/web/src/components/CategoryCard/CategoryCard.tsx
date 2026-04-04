import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
  name: string;
  id: string;
  onSelect: (id: string) => void;
}

const CategoryCard = ({ name, id, onSelect }: CategoryCardProps) => {
  return (
    <div className={styles.card} onClick={() => onSelect(id)}>
      {name}
    </div>
  );
};

export default CategoryCard;
