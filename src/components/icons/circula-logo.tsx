import * as React from "react";

export function CirculaLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 155 48" // Adjusted viewBox for new combined logo
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // Allows passing className, style, etc.
    >
      {/* Group for C and Plus, scaled to fit if needed */}
      <g>
        {/* Blue C shape - Path data from CirculaCPlusLogo */}
        <path
          d="M 44.5 30 A 19 19 0 1 0 30 7.5"
          strokeWidth="9"
          stroke="currentColor" // Inherits color from parent (e.g., text-primary)
          strokeLinecap="butt"
          className="text-primary" // Ensures the C part is primary color
        />
        {/* White Plus Sign - Path data from CirculaCPlusLogo */}
        <path
          d="M38.5 8.5V23.5M31 16H46"
          stroke="#FFFFFF" // Plus sign is white
          strokeWidth="5"
          strokeLinecap="butt"
        />
      </g>
      {/* Text "IRCULA" */}
      <text
        x="55" // Positioned to the right of the C-plus symbol
        y="33" // Adjusted for vertical alignment
        fontFamily="Inter, Arial, sans-serif" // Using Inter to match app font, with fallbacks
        fontSize="26" // Adjusted for visual balance with the C-plus symbol
        fontWeight="bold"
        fill="hsl(var(--foreground))" // Use foreground color from theme
      >
        IRCULA
      </text>
    </svg>
  );
}
