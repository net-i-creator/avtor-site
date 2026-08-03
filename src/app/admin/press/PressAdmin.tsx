"use client";

import { FormEvent, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  AdminPageHeader,
  Field,
  TextInput,
  TextSelect,
  TextTextarea,
} from "@/components/admin/FormFields";
import { createPress, deletePress, updatePress } from "@/lib/actions";

interface PressItem {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  coverImageUrl: string;
  sourceName: string;
  sourceUrl: string;
  category: string;
  publishedAt: string;
  slug: string;
  sortOrder: number;
}

export function PressAdmin({ items }: { items: PressItem[] }) {
  const [editing, setEditing] = useState<PressItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [cover, setCover] = useState("");

  function openCreate() {
    setCover("");
    setCreating(true);
  }

  function openEdit(item: PressItem) {
    setCover(item.coverImageUrl);
    setEditing(item);
  }

  function close() {
    setEditing(null);
    setCreating(false);
    setError("");
    setCover("");
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("coverImageUrl", cover);
    setError("");
    startTransition(async () => {
      try {
        if (editing) await updatePress(editing.id, formData);
        else await createPress(formData);
        close();
      } catch {
        setError("Не удалось сохранить. Проверьте уникальность slug.");
      }
    });
  }

  function onDelete(id: string) {
    if (!confirm("Удалить публикацию?")) return;
    startTransition(async () => {
      await deletePress(id);
    });
  }

  const current = editing;

  return (
    <div>
      <AdminPageHeader
        title="Пресса"
        description="Публикации, интервью и пресс-релизы."
        action={
          <Button type="button" onClick={openCreate}>
            Добавить
          </Button>
        }
      />

      <div className="overflow-x-auto rounded-2xl border border-ink-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-ink-soft text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Заголовок</th>
              <th className="px-4 py-3 font-medium">Категория</th>
              <th className="px-4 py-3 font-medium">Дата</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-ink-border">
                <td className="px-4 py-3">{item.title}</td>
                <td className="px-4 py-3 text-ink-muted">{item.category}</td>
                <td className="px-4 py-3 text-ink-muted">
                  {new Date(item.publishedAt).toLocaleDateString("ru-RU")}
                </td>
                <td className="px-4 py-3 text-ink-muted">{item.slug}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => openEdit(item)}
                    >
                      Изменить
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      onClick={() => onDelete(item.id)}
                      disabled={pending}
                    >
                      Удалить
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                  Пока нет публикаций
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
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-ink-border bg-ink-card p-6"
          >
            <h2 className="font-display text-xl text-white">
              {editing ? "Редактировать" : "Новая публикация"}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Заголовок" name="title">
                <TextInput name="title" required defaultValue={current?.title} />
              </Field>
              <Field label="Slug" name="slug" hint="Оставьте пустым — сгенерируется">
                <TextInput name="slug" defaultValue={current?.slug} />
              </Field>
              <Field label="Категория" name="category">
                <TextSelect name="category" defaultValue={current?.category || "GENERAL"}>
                  <option value="GENERAL">Общее</option>
                  <option value="MUSIC">Музыка</option>
                  <option value="LITERATURE">Литература</option>
                </TextSelect>
              </Field>
              <Field label="Дата" name="publishedAt">
                <TextInput
                  name="publishedAt"
                  type="date"
                  defaultValue={
                    current
                      ? new Date(current.publishedAt).toISOString().slice(0, 10)
                      : new Date().toISOString().slice(0, 10)
                  }
                />
              </Field>
              <Field label="Источник" name="sourceName">
                <TextInput name="sourceName" defaultValue={current?.sourceName} />
              </Field>
              <Field label="URL источника" name="sourceUrl">
                <TextInput name="sourceUrl" defaultValue={current?.sourceUrl} />
              </Field>
              <div className="md:col-span-2">
                <Field label="Отрывок" name="excerpt">
                  <TextTextarea
                    name="excerpt"
                    required
                    defaultValue={current?.excerpt}
                  />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Полный текст" name="body">
                  <TextTextarea
                    name="body"
                    className="min-h-[160px]"
                    defaultValue={current?.body}
                  />
                </Field>
              </div>
              <div className="md:col-span-2">
                <ImageUploader
                  label="Обложка"
                  value={cover}
                  onChange={setCover}
                />
              </div>
              <Field label="Порядок" name="sortOrder">
                <TextInput
                  name="sortOrder"
                  type="number"
                  defaultValue={current?.sortOrder ?? items.length}
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
