import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "quiet";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-ballpoint px-4 py-2.5 text-on-ballpoint hover:bg-ballpoint-strong",
  secondary: "border border-rule bg-surface px-4 py-2.5 text-ink hover:border-ballpoint",
  quiet: "px-1 py-1 text-muted underline decoration-rule underline-offset-4 hover:text-ink",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `${buttonBase} ${buttonVariants[variant]} ${extra}`.trim();
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}

export const inputClass =
  "mt-1.5 block w-full rounded-md border border-rule bg-surface px-3 py-2 text-base text-ink placeholder:text-muted/80 focus:border-ballpoint focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-sm text-muted">{hint}</span> : null}
    </label>
  );
}

export function TextInput({
  label,
  hint,
  ...props
}: ComponentProps<"input"> & { label: string; hint?: ReactNode }) {
  return (
    <Field label={label} hint={hint}>
      <input className={inputClass} {...props} />
    </Field>
  );
}

export function FormError({ message }: { message?: string }) {
  return (
    <p role="alert" aria-live="polite" className="min-h-5 text-sm font-medium text-rejected">
      {message ?? ""}
    </p>
  );
}

export function PageTitle({ children, lead }: { children: ReactNode; lead?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-bold tracking-[-0.02em] sm:text-5xl">{children}</h1>
      {lead ? <p className="mt-3 text-lg leading-relaxed text-muted">{lead}</p> : null}
    </div>
  );
}
