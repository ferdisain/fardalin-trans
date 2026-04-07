import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "whatsapp" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
  secondary:
    "bg-gold-500 text-brand-900 hover:bg-gold-600 shadow-sm",
  outline:
    "border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1fb855] shadow-sm",
  ghost:
    "text-brand-600 hover:bg-brand-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
        "transition-all duration-[150ms] ease-[var(--ease-out-expo)]",
        "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
        "transition-all duration-[150ms] ease-[var(--ease-out-expo)]",
        "active:scale-[0.97]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
