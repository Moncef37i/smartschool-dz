import React from 'react';
import { cn } from '../../utils/helpers';

export const Card = ({ className, children, ...props }) => {
  return (
    <div 
      className={cn("bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border", className)} 
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-white", className)} {...props}>
    {children}
  </h3>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);
