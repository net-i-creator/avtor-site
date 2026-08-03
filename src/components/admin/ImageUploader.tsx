"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface ImageUploaderProps {
  name?: string;
  value?: string;
  onChange?: (url: string) => void;
  label?: string;
}

export function ImageUploader({
  name = "imageUrl",
  value = "",
  onChange,
  label = "Изображение",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка загрузки");
      setPreview(data.url);
      onChange?.(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function clear() {
    setPreview("");
    onChange?.("");
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm text-ink-muted">{label}</label>
      <input type="hidden" name={name} value={preview} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="relative h-36 w-36 overflow-hidden rounded-xl border border-ink-border bg-ink">
          {preview ? (
            <Image src={preview} alt="Превью" fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-ink-muted">
              Нет файла
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={handleFile}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? "Загрузка..." : "Загрузить"}
          </Button>
          {preview && (
            <Button type="button" variant="ghost" size="sm" onClick={clear}>
              Удалить
            </Button>
          )}
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
}
