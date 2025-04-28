import * as React from "react";

export function CirculaLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="120" // Adjusted width for better display
      height="24" // Adjusted height based on aspect ratio
      viewBox="0 0 150 30" // Adjusted viewBox
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Simple C shape */}
      <path
        d="M25 15C25 8.37258 19.6274 3 13 3C6.37258 3 1 8.37258 1 15C1 21.6274 6.37258 27 13 27"
        stroke="currentColor" // Use currentColor to inherit color
        strokeWidth="3" // Increased stroke width
        strokeLinecap="round"
        strokeLinejoin="round"
      />
       {/* Dot inside C */}
      <circle cx="13" cy="15" r="4" fill="currentColor" />
      {/* Text "IRCULA" */}
      <text
        x="35" // Adjusted position
        y="21" // Adjusted vertical alignment
        fontFamily="Arial, sans-serif" // Example font
        fontSize="20" // Adjusted font size
        fontWeight="bold"
        fill="hsl(var(--foreground))" // Use foreground color variable
      >
        IRCULA
      </text>
    </svg>
  );
}
