import { useCallback, useRef } from "react";

export const useDebounce = (delay = 1000, notDelay = true) => {
  const debouncing = useRef<any>();
  const isFirstTime = useRef(notDelay);

  const debounce = useCallback((fn: () => void) => {
    if (isFirstTime.current) {
      isFirstTime.current = false;
      fn();
    } else {
      if (debouncing.current) {
        clearTimeout(debouncing.current);
      }
      debouncing.current = setTimeout(() => fn(), delay);
    }
  }, [delay]);

  return { debounce };
};