import gsap from "gsap";
import { useEffect, useRef, type RefObject } from "react";
interface UseRevealOptions {
  duration?: number;
  fromOpacity?: number;
  toOpacity?: number;
  start: boolean;
  onComplete?: () => void;
}
const useReveal = <T extends HTMLElement>({
  fromOpacity = 0,
  toOpacity = 1,
  duration = 0.5,
  onComplete,
  start,
}: UseRevealOptions): RefObject<T | null> => {
  const ref = useRef<T>(null);
  console.log(ref);
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: fromOpacity },
        { opacity: toOpacity, duration, ease: "power1.inOut", onComplete },
      );
    });
    return () => ctx.revert();
  }, [ref.current, start]);
  return ref;
};

export default useReveal;
