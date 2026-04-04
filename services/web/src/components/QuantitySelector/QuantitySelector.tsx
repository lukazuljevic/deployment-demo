import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import styles from "./QuantitySelector.module.scss";

interface QuantitySelectorProps {
  value: number;
  onChange?: (value: number) => void;
  max: number;
  disabled?: boolean;
}

const QuantitySelector = ({
  value,
  onChange,
  max,
  disabled,
}: QuantitySelectorProps) => {
  const handleIncrease = () => {
    if (value >= max) {
      toast.error(`Max product quantity of ${max} exceeded`);
      return;
    }

    onChange?.(value + 1);
  };

  const handleDecrease = () => {
    if (value <= 1) {
      toast.error("Product quantity can't be zero or negative");
      return;
    }
    onChange?.(value - 1);
  };

  return (
    <div className={styles.quantitySelector}>
      <button
        onClick={handleIncrease}
        disabled={disabled}
        className={styles.selectorButton}
      >
        <FaPlus />
      </button>
      <span className={styles.value}>{value}</span>
      <button
        onClick={handleDecrease}
        disabled={disabled}
        className={styles.selectorButton}
      >
        <FaMinus />
      </button>
    </div>
  );
};

export default QuantitySelector;
