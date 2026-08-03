"use client";

import { FormEvent, useState, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  AdminPageHeader,
  Field,
  TextInput,
} from "@/components/admin/FormFields";
import { createPhoto, deletePhoto, updatePhoto } from "@/lib/actions";

interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  sortOrder: number;
}

export function GalleryAdmin({ photos }: { photos: PhotoItem[] }) {
  const [editing, setEditing] = useState<PhotoItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  function openCreate() {
    setUrl("");
    setCreating(true);
  }

  function openEdit(item: PhotoItem) {
    setUrl(item.url);
    setEditing(item);
  }

  function close() {
    setEditing(null);
    setCreating(false);
    setError("");
    setUrl("");
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("url", url);
    if (!url) {
      setError("Загрузите изображение");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        if (editing) await updatePhoto(editing.id, formData);
        else await createPhoto(formData);
        close();
      } catch {
        setError("Не удалось сохранить");
      }
    });
  }

  function onDelete(id: string) {
    if (!confirm("Удалить фото?")) return;
    startTransition(async () => {
      await deletePhoto(id);
    });
  }

  return (
    <div>
      <AdminPageHeader
        title="Галерея"
        description="Фотографии для публичной галереи."
        action={
          <Button type="button" onClick={openCreate}>
            Добавить
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => (
          <div key={photo.id} className="card-surface overflow-hidden !p-0">
            <div className="relative aspect-[4/3]">
              <Image
                src={photo.url}
                alt={photo.caption || "Фото"}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <p className="truncate text-sm text-white">
                {photo.caption || "Без подписи"}
              </p>
              <div className="mt-2 flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => openEdit(photo)}
                >
                  Изменить
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(photo.id)}
                  disabled={pending}
                >
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-lg rounded-2xl border border-ink-border bg-ink-card p-6"
          >
            <h2 className="font-display text-xl text-white">
              {editing ? "Редактировать" : "Новое фото"}
            </h2>
            <div className="mt-4 space-y-4">
              <ImageUploader label="Фото" value={url} onChange={setUrl} />
              <Field label="Подпись" name="caption">
                <TextInput name="caption" defaultValue={editing?.caption} />
              </Field>
              <Field label="Порядок" name="sortOrder">
                <TextInput
                  name="sortOrder"
                  type="number"
                  defaultValue={editing?.sortOrder ?? photos.length}
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
