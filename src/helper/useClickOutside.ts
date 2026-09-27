import { useEffect, type RefObject } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLLIElement | HTMLDivElement | null>,
  fn: () => void,
) => {
  useEffect(() => {
    function click(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        fn();
      }
    }
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [ref]);
};
