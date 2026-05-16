import type { SVGProps } from "react";

export function PokeballIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <circle cx="32" cy="32" r="30" fill="#fff" stroke="#000" strokeWidth="4" />

      <path
        d="M32 4 A28 28 0 0 1 60 32 H4 A28 28 0 0 1 32 4Z"
        fill="#e53935"
        stroke="#000"
        strokeWidth="2"
      />

      <rect x="4" y="28" width="56" height="8" fill="#000" />

      <circle cx="32" cy="32" r="10" fill="#fff" stroke="#000" strokeWidth="4" />
      <circle cx="32" cy="32" r="5" fill="#fff" stroke="#000" strokeWidth="2" />
    </svg>
  );
}
