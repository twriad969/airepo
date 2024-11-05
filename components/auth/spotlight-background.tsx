"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function SpotlightBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePosition.current = { x, y };
      
      const spotlight = container.querySelector(".spotlight") as HTMLElement;
      if (spotlight) {
        spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`;
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
      <div className="spotlight absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]" />
      
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50" />
        <div className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50" />
      </motion.div>

      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
}