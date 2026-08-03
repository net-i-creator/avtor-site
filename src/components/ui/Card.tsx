import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({
  className = "",
  hover = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`card-surface p-6 ${
        hover
          ? "transition-all duration-300 hover:border-flame/40 hover:shadow-[0_0_40px_rgba(255,90,31,0.08)]"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
