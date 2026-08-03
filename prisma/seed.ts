import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroTitle: "SLVSAREVV",
      heroSubtitle: "Юрий Антонович Слюсарев",
      heroTagline: "Артист. Писатель. Голос, который остаётся.",
      aboutText: `Юрий Антонович Слюсарев — артист, выступающий под именем SLVSAREVV, и писатель, чьи тексты балансируют между сценической энергией и литературной точностью.

Его творчество соединяет музыку и слово: синглы звучат как короткие истории, а проза звучит как музыка. В работах — внимание к деталям эпохи, к человеческому голосу и к тишине между строк.

Этот сайт — пространство, где собраны биография, цитаты, публикации, фотографии и музыкальные релизы. Здесь можно познакомиться с обеими сторонами одной личности.`,
      aboutImageUrl: "/placeholders/portrait.svg",
      contactEmail: "press@slvsarevv.ru",
      socialLinks: JSON.stringify({
        telegram: "https://t.me/slvsarevv",
        vk: "https://vk.com/slvsarevv",
        youtube: "https://youtube.com/@slvsarevv",
        yandexMusic: "https://music.yandex.ru",
        spotify: "https://open.spotify.com",
        appleMusic: "https://music.apple.com",
      }),
    },
  });

  await prisma.biographyEntry.deleteMany();
  await prisma.biographyEntry.createMany({
    data: [
      {
        period: "Начало пути",
        title: "Первые тексты и сцена",
        body: "Первые стихи и песни появились ещё в юности. Тогда же сложилось понимание: слово и звук — две стороны одного высказывания. Первые выступления проходили в камерных пространствах, где важнее всего был контакт со слушателем.",
        sortOrder: 0,
      },
      {
        period: "Формирование",
        title: "SLVSAREVV как творческий псевдоним",
        body: "Под именем SLVSAREVV артист вышел к более широкой аудитории. Псевдоним стал знаком собственной интонации: честной, плотной, без лишней декоративности. Параллельно продолжалась литературная работа.",
        sortOrder: 1,
      },
      {
        period: "Музыка",
        title: "Синглы и студийная работа",
        body: "Релизы синглов обозначили новый этап — студийная точность, работа со звуком и визуальным образом. Каждый трек задумывался как законченная миниатюра: от обложки до последней ноты.",
        sortOrder: 2,
      },
      {
        period: "Литература",
        title: "Проза и публицистика",
        body: "Как писатель Юрий Антонович Слюсарев публикует тексты, эссе и заметки, в которых музыкальная чуткость встречается с литературной формой. Темы — память, город, человек на пороге выбора.",
        sortOrder: 3,
      },
      {
        period: "Сегодня",
        title: "Единое творческое пространство",
        body: "Сегодня SLVSAREVV и Юрий Слюсарев — две грани одной фигуры. Концерты, релизы, тексты и публичные выступления складываются в цельный путь, где артист и писатель говорят на одном языке.",
        sortOrder: 4,
      },
    ],
  });

  await prisma.quote.deleteMany();
  await prisma.quote.createMany({
    data: [
      {
        text: "Музыка начинается там, где слова уже сказали всё, что могли.",
        context: "Интервью",
        sortOrder: 0,
      },
      {
        text: "Я пишу так, будто слушаю. И слушаю так, будто пишу.",
        context: "О творческом методе",
        sortOrder: 1,
      },
      {
        text: "Сцена — это честность на громкости. Книга — честность в тишине.",
        context: "Из эссе",
        sortOrder: 2,
      },
      {
        text: "Хороший сингл — как короткая повесть: у неё есть начало, удар и послевкусие.",
        context: "О музыке",
        sortOrder: 3,
      },
      {
        text: "Имя SLVSAREVV — не маска. Это фокус.",
        context: "О псевдониме",
        sortOrder: 4,
      },
      {
        text: "Если текст нельзя произнести вслух — он ещё не готов.",
        context: "О литературе",
        sortOrder: 5,
      },
    ],
  });

  await prisma.pressItem.deleteMany();
  await prisma.pressItem.createMany({
    data: [
      {
        title: "SLVSAREVV: между студией и страницей",
        excerpt:
          "Портрет артиста и писателя, который отказывается выбирать между музыкой и литературой — и делает оба направления частью одного высказывания.",
        body: `Юрий Антонович Слюсарев известен аудитории под именем SLVSAREVV. В новом материале — о том, как складывается его двойная идентичность и почему она не противоречит, а усиливает друг друга.

«Мне не нужно переключаться, — говорит он. — Это один поток. Музыка даёт ритм тексту, текст даёт смысл музыке».

В материале — о ранних выступлениях, первых синглах и литературных публикациях, а также о том, как артист выстраивает общение со слушателями и читателями.`,
        coverImageUrl: "/placeholders/press-1.svg",
        sourceName: "Культурный обзор",
        sourceUrl: "#",
        category: "GENERAL",
        publishedAt: new Date("2025-11-12"),
        slug: "mezhdu-studiej-i-stranicej",
        sortOrder: 0,
      },
      {
        title: "Новый сингл: волна, которая не отпускает",
        excerpt:
          "Рецензия на свежий релиз SLVSAREVV — о звуке, атмосфере и том, почему трек звучит как короткое кино.",
        body: `Свежий сингл SLVSAREVV продолжает линию атмосферных релизов, где важны не только хук и продакшн, но и ощущение пространства.

Критики отмечают плотный вокал, аккуратную работу с динамикой и визуальный ряд, выдержанный в фирменной чёрно-оранжевой эстетике.

«Это не просто трек для плейлиста. Это сцена в миниатюре», — говорится в рецензии.`,
        coverImageUrl: "/placeholders/press-2.svg",
        sourceName: "Музыкальный дневник",
        sourceUrl: "#",
        category: "MUSIC",
        publishedAt: new Date("2026-02-03"),
        slug: "novyj-singl-volna",
        sortOrder: 1,
      },
      {
        title: "Писатель на сцене: слово как инструмент",
        excerpt:
          "О литературной стороне творчества Юрия Антоновича Слюсарева — эссе, проза и публичные чтения.",
        body: `Помимо музыкальной карьеры Юрий Антонович Слюсарев системно развивает литературную линию. Его тексты отличает сжатость, ритмичность и внимание к устной природе слова.

В публикации разбираются ключевые мотивы: память, городской ландшафт, человек на пороге выбора. Отдельно — о практике публичных чтений, где писатель и артист встречаются на одной площадке.`,
        coverImageUrl: "/placeholders/press-3.svg",
        sourceName: "Литературная среда",
        sourceUrl: "#",
        category: "LITERATURE",
        publishedAt: new Date("2025-09-20"),
        slug: "pisatel-na-scene",
        sortOrder: 2,
      },
      {
        title: "Пресс-релиз: новый творческий сезон",
        excerpt:
          "Официальный анонс ближайших релизов, публикаций и публичных выступлений SLVSAREVV / Юрия Слюсарева.",
        body: `В новом сезоне SLVSAREVV готовит серию синглов и литературных материалов. Планируются студийные релизы, публикации и встречи с аудиторией.

Пресс-служба отмечает: акцент сезона — на цельности образа. Музыкальные и литературные релизы будут связаны общей визуальной и смысловой линией.

Запросы на интервью и материалы направляйте на press@slvsarevv.ru.`,
        coverImageUrl: "/placeholders/press-4.svg",
        sourceName: "Официальный пресс-релиз",
        sourceUrl: "#",
        category: "GENERAL",
        publishedAt: new Date("2026-01-15"),
        slug: "novyj-tvorcheskij-sezon",
        sortOrder: 3,
      },
    ],
  });

  await prisma.photo.deleteMany();
  await prisma.photo.createMany({
    data: [
      {
        url: "/placeholders/photo-1.svg",
        caption: "Студийная атмосфера",
        sortOrder: 0,
      },
      {
        url: "/placeholders/photo-2.svg",
        caption: "Сцена и свет",
        sortOrder: 1,
      },
      {
        url: "/placeholders/photo-3.svg",
        caption: "Рабочий стол писателя",
        sortOrder: 2,
      },
      {
        url: "/placeholders/photo-4.svg",
        caption: "Волна и ритм",
        sortOrder: 3,
      },
      {
        url: "/placeholders/photo-5.svg",
        caption: "Портрет в тени",
        sortOrder: 4,
      },
      {
        url: "/placeholders/photo-6.svg",
        caption: "После выступления",
        sortOrder: 5,
      },
    ],
  });

  await prisma.single.deleteMany();
  await prisma.single.createMany({
    data: [
      {
        title: "Волна",
        coverImageUrl: "/placeholders/single-1.svg",
        releaseYear: 2026,
        streamingLinks: JSON.stringify({
          yandexMusic: "https://music.yandex.ru",
          spotify: "https://open.spotify.com",
          appleMusic: "https://music.apple.com",
          vk: "https://vk.com/music",
        }),
        sortOrder: 0,
      },
      {
        title: "Тишина между",
        coverImageUrl: "/placeholders/single-2.svg",
        releaseYear: 2025,
        streamingLinks: JSON.stringify({
          yandexMusic: "https://music.yandex.ru",
          spotify: "https://open.spotify.com",
          appleMusic: "https://music.apple.com",
          vk: "https://vk.com/music",
        }),
        sortOrder: 1,
      },
      {
        title: "Чёрный апельсин",
        coverImageUrl: "/placeholders/single-3.svg",
        releaseYear: 2025,
        streamingLinks: JSON.stringify({
          yandexMusic: "https://music.yandex.ru",
          spotify: "https://open.spotify.com",
          appleMusic: "https://music.apple.com",
          vk: "https://vk.com/music",
        }),
        sortOrder: 2,
      },
      {
        title: "Послевкусие",
        coverImageUrl: "/placeholders/single-4.svg",
        releaseYear: 2024,
        streamingLinks: JSON.stringify({
          yandexMusic: "https://music.yandex.ru",
          spotify: "https://open.spotify.com",
          appleMusic: "https://music.apple.com",
          vk: "https://vk.com/music",
        }),
        sortOrder: 3,
      },
    ],
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
