import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Note: I need to install class-variance-authority and @radix-ui/react-slot for this to work fully as ashadcn/ui
// For now I will stick to a simpler version without those dependencies to avoid dependency hell if installs are failing, 
// OR I will just install them. "Premium" usually implies these standard libraries.
// Let's stick to a simpler version first that relies just on standard props to minimize dependency risk until I confirm installs work.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {

        // Base styles
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

        // Variants
        const variants = {
            primary: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        };

        // Sizes
        const sizes = {
            sm: "h-9 rounded-md px-3",
            md: "h-10 px-4 py-2",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        };

        // Simplified without cva for now to reduce dependencies, using simple lookup
        const variantStyles = variants[variant] || variants.primary;
        const sizeStyles = sizes[size] || sizes.md;

        const Comp = "button";

        return (
            <Comp
                className={cn(baseStyles, variantStyles, sizeStyles, className)}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
