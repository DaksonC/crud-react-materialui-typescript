import { useCallback, useRef } from "react";

export const useDebounce = (delay = 300, notDelay = true) => {
  const debouncing = useRef();
  const isFirstTime = useRef(notDelay);

  const debounce = useCallback((fn: () => void) => {
    if (isFirstTime.current) {
      isFirstTime.current = false;
      fn();
    } else {
      if (debouncing.current) {
        clearTimeout(debouncing.current);
      }
      setTimeout(() => fn(), delay);
    }
  }, [delay]);

  return { debounce };
};