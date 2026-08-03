# SLVSAREVV — персональный сайт артиста и писателя

Официальный сайт **SLVSAREVV** / **Юрия Антоновича Слюсарева**: биография, цитаты, пресса, фотогалерея, музыкальные синглы и админ-панель для самостоятельного редактирования контента.

## Стек

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + SQLite
- NextAuth (Credentials) — один админ-аккаунт
- Framer Motion, Zod

## Быстрый старт

```bash
npm install
cp .env.example .env
```

Сгенерируйте хеш пароля и пропишите его в `.env`:

```bash
node -e "require('bcryptjs').hash('ваш-пароль', 10).then(console.log)"
```

Пример `.env` для локальной разработки уже может быть создан. По умолчанию:

- Email: `admin@slvsarevv.ru`
- Пароль: `admin123`

Затем:

```bash
npx prisma migrate dev
npm run db:seed
npm run dev
```

Откройте:

- Сайт: http://localhost:3000
- Админка: http://localhost:3000/admin/login

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Локальная разработка |
| `npm run build` | Продакшен-сборка |
| `npm start` | Запуск собранного приложения |
| `npm run db:seed` | Заполнить плейсхолдер-контентом |
| `npm run db:migrate` | Применить миграции |
| `npm run db:reset` | Сбросить БД и заново накатить seed |

## Админ-панель

Разделы:

1. **Настройки** — hero, текст «О себе», email, соцсети
2. **Биография** — таймлайн
3. **Цитаты**
4. **Пресса** — публикации со страницами `/press/[slug]`
5. **Галерея** — фото с лайтбоксом
6. **Музыка** — синглы и ссылки на Яндекс Музыку / Spotify / Apple Music / VK

Изображения загружаются в `public/uploads/`.

## Деплой

Проект готов к запуску на любом Node.js-хостинге с постоянным диском:

- VPS / Docker
- Railway
- Render
- любой сервер с `npm run build && npm start`

Перед деплоем обязательно смените `NEXTAUTH_SECRET`, `ADMIN_EMAIL` и `ADMIN_PASSWORD_HASH`, а также укажите корректный `NEXTAUTH_URL`.

### Быстрый деплой на Vercel (бесплатно)

1. Откройте [vercel.com/new](https://vercel.com/new) и импортируйте репозиторий `net-i-creator/avtor-site`.
2. Добавьте переменные окружения:

```
DATABASE_URL=file:/tmp/dev.db
NEXTAUTH_URL=https://ваш-проект.vercel.app
NEXTAUTH_SECRET=длинная-случайная-строка
ADMIN_EMAIL=admin@slvsarevv.ru
ADMIN_PASSWORD_HASH=$2b$10$VadcPwlwvWQSUksC16v9mulAgRDInaOPCyUJYDyrvE0stB5EMMFtG
```

3. Deploy. Публичный сайт с seed-контентом откроется сразу.  
   На serverless правки из админки могут не сохраняться между cold start — для постоянной админки лучше VPS / Render / Railway.

### Serverless (Vercel и аналоги)

Файловая SQLite и локальные загрузки **не** подходят для serverless-инстансов без доработок. Точечные замены без смены бизнес-логики:

1. **БД** — [Turso](https://turso.tech) (libSQL) вместо `file:./dev.db`
2. **Файлы** — Vercel Blob / S3 / Cloudflare R2 вместо `public/uploads`

Логика в `src/lib/prisma.ts` и `src/lib/storage.ts` специально вынесена в отдельные модули, чтобы эти свопы были локальными.

## Структура

```
prisma/          — схема и seed
public/          — статика, placeholders, uploads
src/app/         — страницы сайта и админки
src/components/  — UI и секции
src/lib/         — prisma, auth, actions, validators
```

## Лицензия

Контент и бренд принадлежат владельцу сайта. Код проекта создан для заказчика.
