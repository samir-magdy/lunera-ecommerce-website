import { useRef, useCallback, useState } from "react";

interface SwipeConfig {
  direction: "left" | "right";
  threshold?: number;
  onClose: () => void;
  swipeOutDuration?: number;
}

export function useSwipeToDismiss({
  direction,
  threshold = 80,
  onClose,
  swipeOutDuration = 250,
}: SwipeConfig) {
  const startX = useRef(0);
  const currentX = useRef(0);
  const isSwiping = useRef(false);
  const [offset, setOffset] = useState(0);
  const [swipeOut, setSwipeOut] = useState(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
    isSwiping.current = true;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    currentX.current = e.touches[0].clientX;
    const delta = currentX.current - startX.current;

    if (direction === "left" && delta < 0) {
      setOffset(delta);
    } else if (direction === "right" && delta > 0) {
      setOffset(delta);
    }
  }, [direction]);

  const onTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;

    const delta = currentX.current - startX.current;
    const pastThreshold =
      direction === "left" ? delta < -threshold : delta > threshold;

    if (pastThreshold) {
      setOffset(0);
      setSwipeOut(true);
      setTimeout(() => {
        setSwipeOut(false);
        onClose();
      }, swipeOutDuration);
    } else {
      setOffset(0);
    }
  }, [direction, threshold, onClose, swipeOutDuration]);

  return {
    offset,
    swipeOut,
    handlers: { onTouchStart, onTouchMove, onTouchEnd },
  };
}
