import { Link } from "@remix-run/react";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps<T extends ElementType = "button"> = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border-transparent",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 border-transparent dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
  outline: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border-gray-300 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border-transparent dark:text-gray-300 dark:hover:bg-gray-800",
  link: "bg-transparent text-blue-600 hover:text-blue-700 focus:ring-blue-500 border-transparent underline dark:text-blue-400 dark:hover:text-blue-300",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", asChild = false, as, children, ...props }, ref) => {
    const Component = asChild ? (props.href ? Link : as || "button") : "button";
    
    const buttonClasses = `
      inline-flex items-center justify-center
      font-medium rounded-md
      border focus:outline-none focus:ring-2 focus:ring-offset-2
      transition-colors duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `;

    return (
      <Component ref={ref} className={buttonClasses} {...props}>
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
