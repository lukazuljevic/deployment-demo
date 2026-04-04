import { useState } from "react";

interface UseCarouselProps<T> {
  items: T[];
}
const useCarousel = <T>({ items }: UseCarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((i) => (i + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + items.length) % items.length);
  };

  return {
    currentIndex,
    currentItem: items[currentIndex],
    next,
    prev,
  };
};

export default useCarousel;
