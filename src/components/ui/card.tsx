import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-100 bg-white p-6 shadow-sm",
        hover &&
          "transition-all duration-[200ms] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
