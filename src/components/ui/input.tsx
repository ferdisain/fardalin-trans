import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base",
          "transition-colors duration-[150ms] ease-[var(--ease-out-expo)]",
          "placeholder:text-gray-400",
          "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
