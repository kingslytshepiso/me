import { useCallback, useRef, useState } from "react";
import { Platform, ScrollView } from "react-native";

const DRAG_THRESHOLD_PX = 8;

/**
 * Handles horizontal drag-to-scroll on web for badge strips.
 * Strip expand/collapse on hover is owned by CertificationBadgeStrip + useDebouncedBoolean.
 */
export function useDragToScroll(scrollRef: React.RefObject<ScrollView | null>) {
  const isWeb = Platform.OS === "web";
  const [isDragging, setIsDragging] = useState(false);
  const didDragRef = useRef(false);
  const dragActiveRef = useRef(false);
  const startClientXRef = useRef(0);
  const startScrollXRef = useRef(0);
  const totalMovementRef = useRef(0);

  const endDrag = useCallback(() => {
    dragActiveRef.current = false;
    setIsDragging(false);
  }, []);

  const beginDrag = useCallback((clientX: number, scrollX: number) => {
    didDragRef.current = false;
    totalMovementRef.current = 0;
    dragActiveRef.current = true;
    startClientXRef.current = clientX;
    startScrollXRef.current = scrollX;
    setIsDragging(true);
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    if (!dragActiveRef.current) return;
    const delta = startClientXRef.current - clientX;
    totalMovementRef.current = Math.max(
      totalMovementRef.current,
      Math.abs(delta)
    );
    if (totalMovementRef.current >= DRAG_THRESHOLD_PX) {
      didDragRef.current = true;
    }
    const nextX = Math.max(0, startScrollXRef.current + delta);
    scrollRef.current?.scrollTo({ x: nextX, animated: false });
  }, [scrollRef]);

  const resetDidDrag = useCallback(() => {
    didDragRef.current = false;
  }, []);

  return {
    isDragging,
    isWeb,
    didDragRef,
    beginDrag,
    moveDrag,
    endDrag,
    resetDidDrag,
  };
}
