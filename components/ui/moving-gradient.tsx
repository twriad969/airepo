"use client";

import { useTheme } from "next-themes";

export function MovingGradient() {
  const { theme } = useTheme();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30">
      <div 
        className="absolute -inset-[100%] animate-[move_8s_linear_infinite]"
        style={{
          background: theme === 'dark' 
            ? 'conic-gradient(from 0deg, transparent 0 340deg, hsl(var(--primary)) 360deg)'
            : 'conic-gradient(from 0deg, transparent 0 340deg, hsl(var(--primary)) 360deg)',
          opacity: theme === 'dark' ? 0.4 : 0.2
        }}
      />
    </div>
  );
}