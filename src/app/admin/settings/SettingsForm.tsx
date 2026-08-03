"use client";

import { FormEvent, useState, useTransition } from "react";
import { updateSettings } from "@/lib/actions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  Field,
  TextInput,
  TextTextarea,
} from "@/components/admin/FormFields";
import { Button } from "@/components/ui/Button";

interface SettingsFormProps {
  initial: {
    heroTitle: string;
    heroSubtitle: string;
    heroTagline: string;
    aboutText: string;
    aboutImageUrl: string;
    contactEmail: string;
    telegram?: string;
    vk?: string;
    youtube?: string;
    yandexMusic?: string;
    spotify?: string;
    appleMusic?: string;
  };
}

export function SettingsForm({ initial }: SettingsFormProps) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [aboutImageUrl, setAboutImageUrl] = useState(initial.aboutImageUrl);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("aboutImageUrl", aboutImageUrl);
    setMessage("");
    startTransition(async () => {
      try {
        await updateSettings(formData);
        setMessage("Сохранено");
      } catch {
        setMessage("Ошибка сохранения");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
      <div className="card-surface space-y-4 p-6">
        <h2 className="font-display text-lg text-white">Hero</h2>
        <Field label="Заголовок" name="heroTitle">
          <TextInput
            id="heroTitle"
            name="heroTitle"
            defaultValue={initial.heroTitle}
            required
          />
        </Field>
        <Field label="Подзаголовок" name="heroSubtitle">
          <TextInput
            id="heroSubtitle"
            name="heroSubtitle"
            defaultValue={initial.heroSubtitle}
            required
          />
        </Field>
        <Field label="Тэглайн" name="heroTagline">
          <TextInput
            id="heroTagline"
            name="heroTagline"
            defaultValue={initial.heroTagline}
            required
          />
        </Field>
      </div>

      <div className="card-surface space-y-4 p-6">
        <h2 className="font-display text-lg text-white">О себе</h2>
        <Field label="Текст" name="aboutText" hint="Абзацы разделяйте пустой строкой">
          <TextTextarea
            id="aboutText"
            name="aboutText"
            defaultValue={initial.aboutText}
            required
            className="min-h-[200px]"
          />
        </Field>
        <ImageUploader
          label="Портрет"
          value={aboutImageUrl}
          onChange={setAboutImageUrl}
        />
      </div>

      <div className="card-surface space-y-4 p-6">
        <h2 className="font-display text-lg text-white">Контакты и соцсети</h2>
        <Field label="Email" name="contactEmail">
          <TextInput
            id="contactEmail"
            name="contactEmail"
            type="email"
            defaultValue={initial.contactEmail}
            required
          />
        </Field>
        {(
          [
            ["telegram", "Telegram"],
            ["vk", "VK"],
            ["youtube", "YouTube"],
            ["yandexMusic", "Яндекс Музыка"],
            ["spotify", "Spotify"],
            ["appleMusic", "Apple Music"],
          ] as const
        ).map(([name, label]) => (
          <Field key={name} label={label} name={name}>
            <TextInput
              id={name}
              name={name}
              type="url"
              defaultValue={initial[name] || ""}
              placeholder="https://"
            />
          </Field>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? "Сохранение..." : "Сохранить"}
        </Button>
        {message && <span className="text-sm text-flame">{message}</span>}
      </div>
    </form>
  );
}
