import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "info";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-brand-50 text-brand-700",
  success: "bg-green-50 text-green-700",
  warning: "bg-yellow-50 text-yellow-700",
  info: "bg-blue-50 text-blue-700",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
