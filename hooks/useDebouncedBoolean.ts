import { useEffect, useRef, useState } from "react";

/**
 * Returns true immediately when `value` becomes true, and false only after
 * `value` has been false continuously for `delayMs`.
 */
export function useDebouncedBoolean(value: boolean, delayMs = 300): boolean {
  const [debounced, setDebounced] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (value) {
      setDebounced(true);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDebounced(false);
      timeoutRef.current = null;
    }, delayMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, delayMs]);

  return debounced;
}
