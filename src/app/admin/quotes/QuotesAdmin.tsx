"use client";

import { FormEvent, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import {
  AdminPageHeader,
  Field,
  TextInput,
  TextTextarea,
} from "@/components/admin/FormFields";
import { createQuote, deleteQuote, updateQuote } from "@/lib/actions";

interface QuoteItem {
  id: string;
  text: string;
  context: string;
  sortOrder: number;
}

export function QuotesAdmin({ quotes }: { quotes: QuoteItem[] }) {
  const [editing, setEditing] = useState<QuoteItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function close() {
    setEditing(null);
    setCreating(false);
    setError("");
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError("");
    startTransition(async () => {
      try {
        if (editing) await updateQuote(editing.id, formData);
        else await createQuote(formData);
        close();
      } catch {
        setError("Не удалось сохранить");
      }
    });
  }

  function onDelete(id: string) {
    if (!confirm("Удалить цитату?")) return;
    startTransition(async () => {
      await deleteQuote(id);
    });
  }

  return (
    <div>
      <AdminPageHeader
        title="Цитаты"
        description="Высказывания для блока на главной."
        action={
          <Button type="button" onClick={() => setCreating(true)}>
            Добавить
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {quotes.map((q) => (
          <div key={q.id} className="card-surface p-5">
            <p className="text-white">«{q.text}»</p>
            <p className="mt-3 text-xs text-ink-muted">
              {q.context || "Без контекста"} · порядок {q.sortOrder}
            </p>
            <div className="mt-4 flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => setEditing(q)}
              >
                Изменить
              </Button>
              <Button
                type="button"
                size="sm"
                variant="danger"
                onClick={() => onDelete(q.id)}
                disabled={pending}
              >
                Удалить
              </Button>
            </div>
          </div>
        ))}
        {quotes.length === 0 && (
          <p className="text-ink-muted">Пока нет цитат</p>
        )}
      </div>

      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-lg rounded-2xl border border-ink-border bg-ink-card p-6"
          >
            <h2 className="font-display text-xl text-white">
              {editing ? "Редактировать" : "Новая цитата"}
            </h2>
            <div className="mt-4 space-y-4">
              <Field label="Текст" name="text">
                <TextTextarea name="text" required defaultValue={editing?.text} />
              </Field>
              <Field label="Контекст" name="context">
                <TextInput name="context" defaultValue={editing?.context} />
              </Field>
              <Field label="Порядок" name="sortOrder">
                <TextInput
                  name="sortOrder"
                  type="number"
                  defaultValue={editing?.sortOrder ?? quotes.length}
                />
              </Field>
            </div>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            <div className="mt-6 flex gap-3">
              <Button type="submit" disabled={pending}>
                Сохранить
              </Button>
              <Button type="button" variant="ghost" onClick={close}>
                Отмена
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
