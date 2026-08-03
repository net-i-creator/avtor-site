"use client";

import { FormEvent, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import {
  AdminPageHeader,
  Field,
  TextInput,
  TextTextarea,
} from "@/components/admin/FormFields";
import {
  createBiography,
  deleteBiography,
  updateBiography,
} from "@/lib/actions";

interface Entry {
  id: string;
  period: string;
  title: string;
  body: string;
  sortOrder: number;
}

export function BiographyAdmin({ entries }: { entries: Entry[] }) {
  const [editing, setEditing] = useState<Entry | null>(null);
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
        if (editing) {
          await updateBiography(editing.id, formData);
        } else {
          await createBiography(formData);
        }
        close();
      } catch {
        setError("Не удалось сохранить");
      }
    });
  }

  function onDelete(id: string) {
    if (!confirm("Удалить запись?")) return;
    startTransition(async () => {
      await deleteBiography(id);
    });
  }

  return (
    <div>
      <AdminPageHeader
        title="Биография"
        description="Таймлайн жизненного и творческого пути."
        action={
          <Button type="button" onClick={() => setCreating(true)}>
            Добавить
          </Button>
        }
      />

      <div className="overflow-x-auto rounded-2xl border border-ink-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-ink-soft text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Порядок</th>
              <th className="px-4 py-3 font-medium">Период</th>
              <th className="px-4 py-3 font-medium">Заголовок</th>
              <th className="px-4 py-3 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-t border-ink-border">
                <td className="px-4 py-3 text-ink-muted">{entry.sortOrder}</td>
                <td className="px-4 py-3">{entry.period}</td>
                <td className="px-4 py-3">{entry.title}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => setEditing(entry)}
                    >
                      Изменить
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      onClick={() => onDelete(entry.id)}
                      disabled={pending}
                    >
                      Удалить
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-muted">
                  Пока нет записей
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={onSubmit}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-ink-border bg-ink-card p-6"
          >
            <h2 className="font-display text-xl text-white">
              {editing ? "Редактировать" : "Новая запись"}
            </h2>
            <div className="mt-4 space-y-4">
              <Field label="Период" name="period">
                <TextInput
                  name="period"
                  required
                  defaultValue={editing?.period}
                />
              </Field>
              <Field label="Заголовок" name="title">
                <TextInput name="title" required defaultValue={editing?.title} />
              </Field>
              <Field label="Текст" name="body">
                <TextTextarea name="body" required defaultValue={editing?.body} />
              </Field>
              <Field label="Порядок" name="sortOrder">
                <TextInput
                  name="sortOrder"
                  type="number"
                  defaultValue={editing?.sortOrder ?? entries.length}
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
