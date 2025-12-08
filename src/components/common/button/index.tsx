import { Button as BaseButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

interface ButtonProps
  extends Omit<ComponentProps<typeof BaseButton>, "variant"> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive";
}

const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const styles =
    variant === "primary"
      ? "bg-prm hover:bg-prm/90 text-secondary"
      : variant === "secondary"
      ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
      : variant === "ghost"
      ? "bg-transparent hover:bg-muted hover:text-prm text-muted-text"
      : variant === "outline"
      ? "bg-transparent border border-prm text-prm hover:bg-muted"
      : variant === "destructive"
      ? "bg-error text-white"
      : "bg-transparent hover:bg-muted";

  return (
    <BaseButton
      className={cn(
        `${styles} h-12 text-base disabled:opacity-80 disabled:cursor-not-allowed`,
        className
      )}
      {...props}
    />
  );
};

export default Button;
