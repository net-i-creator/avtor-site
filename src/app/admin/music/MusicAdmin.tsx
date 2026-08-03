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
import { createSingle, deleteSingle, updateSingle } from "@/lib/actions";
import { parseJson, type StreamingLinks } from "@/lib/validators";

interface SingleItem {
  id: string;
  title: string;
  coverImageUrl: string;
  releaseYear: number;
  streamingLinks: string;
  sortOrder: number;
}

export function MusicAdmin({ singles }: { singles: SingleItem[] }) {
  const [editing, setEditing] = useState<SingleItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [cover, setCover] = useState("");

  function openCreate() {
    setCover("");
    setCreating(true);
  }

  function openEdit(item: SingleItem) {
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
        if (editing) await updateSingle(editing.id, formData);
        else await createSingle(formData);
        close();
      } catch {
        setError("Не удалось сохранить");
      }
    });
  }

  function onDelete(id: string) {
    if (!confirm("Удалить сингл?")) return;
    startTransition(async () => {
      await deleteSingle(id);
    });
  }

  const links = parseJson<StreamingLinks>(editing?.streamingLinks ?? "{}", {});

  return (
    <div>
      <AdminPageHeader
        title="Музыка"
        description="Синглы и ссылки на стриминговые площадки."
        action={
          <Button type="button" onClick={openCreate}>
            Добавить
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {singles.map((single) => (
          <div key={single.id} className="card-surface overflow-hidden !p-0">
            <div className="relative aspect-square">
              <Image
                src={single.coverImageUrl || "/placeholders/single-1.svg"}
                alt={single.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-flame">{single.releaseYear}</p>
              <h3 className="mt-1 font-display text-lg text-white">
                {single.title}
              </h3>
              <div className="mt-3 flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => openEdit(single)}
                >
                  Изменить
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(single.id)}
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
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-ink-border bg-ink-card p-6"
          >
            <h2 className="font-display text-xl text-white">
              {editing ? "Редактировать" : "Новый сингл"}
            </h2>
            <div className="mt-4 space-y-4">
              <Field label="Название" name="title">
                <TextInput name="title" required defaultValue={editing?.title} />
              </Field>
              <Field label="Год" name="releaseYear">
                <TextInput
                  name="releaseYear"
                  type="number"
                  required
                  defaultValue={editing?.releaseYear ?? new Date().getFullYear()}
                />
              </Field>
              <ImageUploader label="Обложка" value={cover} onChange={setCover} />
              <Field label="Яндекс Музыка" name="yandexMusic">
                <TextInput
                  name="yandexMusic"
                  defaultValue={links.yandexMusic || ""}
                  placeholder="https://"
                />
              </Field>
              <Field label="Spotify" name="spotify">
                <TextInput
                  name="spotify"
                  defaultValue={links.spotify || ""}
                  placeholder="https://"
                />
              </Field>
              <Field label="Apple Music" name="appleMusic">
                <TextInput
                  name="appleMusic"
                  defaultValue={links.appleMusic || ""}
                  placeholder="https://"
                />
              </Field>
              <Field label="VK Музыка" name="vk">
                <TextInput
                  name="vk"
                  defaultValue={links.vk || ""}
                  placeholder="https://"
                />
              </Field>
              <Field label="Порядок" name="sortOrder">
                <TextInput
                  name="sortOrder"
                  type="number"
                  defaultValue={editing?.sortOrder ?? singles.length}
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
