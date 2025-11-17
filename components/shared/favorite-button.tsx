"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e?: React.MouseEvent) => void;
  size?: "sm" | "md" | "lg";
}

export function FavoriteButton({
  isFavorite,
  onToggle,
  size = "md",
}: FavoriteButtonProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        variant={isFavorite ? "default" : "outline"}
        size="icon"
        onClick={onToggle}
        className={`${sizeClasses[size]} border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
          isFavorite
            ? "bg-accent text-accent-foreground"
            : "bg-background text-foreground"
        }`}
      >
        <Heart
          className={`${iconSize[size]} ${isFavorite ? "fill-current" : ""}`}
        />
      </Button>
    </motion.div>
  );
}
