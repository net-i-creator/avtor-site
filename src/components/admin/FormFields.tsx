"use client";

import { ReactNode } from "react";

interface FieldProps {
  label: string;
  name: string;
  children?: ReactNode;
  error?: string;
  hint?: string;
}

export function Field({ label, name, children, error, hint }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-ink-muted">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink-border bg-ink px-4 py-2.5 text-white outline-none transition focus:border-flame";

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input {...props} className={`${inputClass} ${props.className || ""}`} />;
}

export function TextTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={`${inputClass} min-h-[120px] resize-y ${props.className || ""}`}
    />
  );
}

export function TextSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  return (
    <select {...props} className={`${inputClass} ${props.className || ""}`} />
  );
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm text-ink-muted">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
