import React from 'react';
import { cn } from '../../utils/helpers';

export const Button = React.forwardRef(({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
  const variants = {
    default: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm",
    outline: "border border-gray-200 bg-transparent hover:bg-gray-100 text-gray-900 dark:border-dark-border dark:text-gray-100 dark:hover:bg-dark-border",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-dark-border text-gray-700 dark:text-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-12 rounded-lg px-8 text-lg",
    icon: "h-10 w-10 flex items-center justify-center",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
