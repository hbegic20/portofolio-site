import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  name: "name" | "email" | "message";
  label: string;
  errors?: string[];
  multiline?: boolean;
} & Pick<ComponentProps<"input">, "type" | "autoComplete" | "maxLength">;

const control =
  "w-full rounded-control border bg-surface-sunk px-3 py-2.5 font-mono text-sm placeholder:text-text-subtle";

export function Field({ name, label, errors, multiline, ...rest }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const invalid = Boolean(errors?.length);
  const shared = {
    id,
    name,
    required: true,
    "aria-invalid": invalid || undefined,
    "aria-describedby": invalid ? errorId : undefined,
    className: cn(control, invalid ? "border-err/70" : "border-border"),
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-sm text-ok">
        {label}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          rows={6}
          maxLength={rest.maxLength}
          className={cn(shared.className, "resize-y")}
        />
      ) : (
        <input {...shared} {...rest} />
      )}
      {invalid && (
        <p id={errorId} className="font-mono text-xs text-err">
          {errors?.[0]}
        </p>
      )}
    </div>
  );
}
