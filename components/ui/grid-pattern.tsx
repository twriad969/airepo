"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function GridPattern() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const gridColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0";
  const opacity = "0.05"; // Reduced opacity for both light and dark themes

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none"
      style={{
        backgroundImage: `linear-gradient(rgba(${gridColor}, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(${gridColor}, ${opacity}) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
        backgroundPosition: "-1px -1px",
      }}
    />
  );
}