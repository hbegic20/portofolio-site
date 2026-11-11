import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-5 text-sm font-medium transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent/90",
  outline: "border border-border-strong text-text hover:border-text-subtle hover:bg-surface",
};

type CommonProps = {
  variant?: Variant;
  mono?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & Omit<ComponentProps<"a">, keyof CommonProps> & { href: string };
type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", mono, className, children, ...rest } = props;
  const classes = cn(base, variants[variant], mono && "font-mono", className);

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
