"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface UseMouseEscapeOptions {
  escapeDistance?: number;
  escapeStrength?: number;
  returnSpeed?: number;
}

export function useMouseEscape(options: UseMouseEscapeOptions = {}) {
  const { escapeDistance = 150, escapeStrength = 40, returnSpeed = 0.1 } = options;
  
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const targetOffset = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      const distanceX = e.clientX - elementCenterX;
      const distanceY = e.clientY - elementCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < escapeDistance) {
        const escapeRatio = 1 - distance / escapeDistance;
        const escapeX = -distanceX * escapeRatio * (escapeStrength / escapeDistance);
        const escapeY = -distanceY * escapeRatio * (escapeStrength / escapeDistance);
        targetOffset.current = { x: escapeX, y: escapeY };
      } else {
        targetOffset.current = { x: 0, y: 0 };
      }
    },
    [escapeDistance, escapeStrength]
  );

  useEffect(() => {
    const animate = () => {
      setOffset((prev) => ({
        x: prev.x + (targetOffset.current.x - prev.x) * returnSpeed,
        y: prev.y + (targetOffset.current.y - prev.y) * returnSpeed,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, returnSpeed]);

  return { elementRef, offset };
}
