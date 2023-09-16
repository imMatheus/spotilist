import { cn } from "@/utils/cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        "rounded-full bg-primary px-4 py-1.5 font-semibold text-black transition-colors",
        className
      )}
    >
      {children}
    </button>
  );
};
