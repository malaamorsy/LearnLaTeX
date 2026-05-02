interface Props {
  size?: number;
  color?: string;
  className?: string;
}

export function MobiusLogo({ size = 36, color = "currentColor", className }: Props) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Möbius strip — vertical orientation */}
      {/* Back loop (bottom arc, behind) */}
      <path
        d="M20 50 C6 50 4 38 12 32 C16 29 20 30 20 30"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Back loop (top arc, behind) */}
      <path
        d="M20 10 C34 10 36 22 28 28 C24 31 20 30 20 30"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Front left ribbon */}
      <path
        d="M20 10 C6 10 4 22 12 28 C16 31 20 30 20 30"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Front right ribbon */}
      <path
        d="M20 50 C34 50 36 38 28 32 C24 29 20 30 20 30"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Twist lines at crossing */}
      <path
        d="M17 28.5 L23 31.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Top cap */}
      <path
        d="M14 10 C14 7 26 7 26 10"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Bottom cap */}
      <path
        d="M14 50 C14 53 26 53 26 50"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
