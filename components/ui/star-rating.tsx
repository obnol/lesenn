"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type StarRatingProps = {
  value?: number;
  onChange: (value: number | undefined) => void;
  className?: string;
};

export function StarRating({ value, onChange, className }: StarRatingProps) {
  const [hoveredValue, setHoveredValue] = useState<number | undefined>();

  const handleClick = (rating: number) => {
    if (value === rating) {
      // If clicking the same rating, clear it
      onChange(undefined);
    } else {
      onChange(rating);
    }
  };

  const displayValue = hoveredValue ?? value;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHoveredValue(star)}
          onMouseLeave={() => setHoveredValue(undefined)}
          className="transition-transform hover:scale-110 active:scale-95"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            className={cn(
              "h-6 w-6 transition-colors",
              displayValue && star <= displayValue
                ? "fill-yellow-400 text-yellow-400"
                : "fill-transparent text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}
