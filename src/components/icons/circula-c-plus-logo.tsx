// src/components/icons/circula-c-plus-logo.tsx
import * as React from "react";

export function CirculaCPlusLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 52 48" // Adjusted viewBox to match image aspect ratio (232x212 px)
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Blue C shape */}
      <path
        // This path defines the centerline of the C-shaped arc.
        // The arc starts near the bottom-right and sweeps counter-clockwise (due to sweep-flag 0)
        // to the top-left part of the C.
        // Large-arc-flag is 1, meaning it will draw the longer arc between the start and end points.
        // strokeWidth creates the thickness.
        // strokeLinecap="butt" makes the ends of the C flat.
        d="M 44.5 30 A 19 19 0 1 0 30 7.5" 
        strokeWidth="9"
        stroke="currentColor" // Inherits color from parent, e.g., text-primary
        className="text-primary" // Applies primary color from theme
        strokeLinecap="butt"
      />
      {/* White Plus Sign */}
      <path
        // Defines two lines forming a plus:
        // 1. Vertical line: M38.5 8.5 V23.5 (from y=8.5 to y=23.5 at x=38.5)
        // 2. Horizontal line: M31 16 H46 (from x=31 to x=46 at y=16)
        d="M38.5 8.5V23.5M31 16H46"
        stroke="#FFFFFF" // Plus sign is white
        strokeWidth="5"  // Thickness of the plus sign lines
        strokeLinecap="butt" // Flat ends for the plus sign lines
      />
    </svg>
  );
}
