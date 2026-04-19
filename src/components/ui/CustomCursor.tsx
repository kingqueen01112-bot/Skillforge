"use client";

import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const hoverElements = document.querySelectorAll("a, button, [data-cursor-hover]");
    const enterHover = () => setIsHovering(true);
    const leaveHover = () => setIsHovering(false);

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", enterHover);
      el.addEventListener("mouseleave", leaveHover);
    });

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", enterHover);
        el.removeEventListener("mouseleave", leaveHover);
      });
    };
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
    }
  }, [x, y]);

  useEffect(() => {
    if (!followerRef.current) return;
    let animationId: number;
    let followerX = x;
    let followerY = y;

    const animate = () => {
      followerX += (x - followerX) * 0.15;
      followerY += (y - followerY) * 0.15;
      if (followerRef.current) {
        const size = isHovering ? 48 : 32;
        followerRef.current.style.transform = `translate(${followerX - size / 2}px, ${followerY - size / 2}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [x, y, isHovering]);

  if (isMobile || prefersReducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#6366f1",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s, transform 0.05s",
          transform: `translate(${x - 4}px, ${y - 4}px) scale(${isClicking ? 0.5 : 1})`,
        }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          border: `1.5px solid ${isHovering ? "#ec4899" : "#6366f180"}`,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.3s cubic-bezier(0.25,1,0.5,1), height 0.3s cubic-bezier(0.25,1,0.5,1), border-color 0.3s, opacity 0.3s",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
