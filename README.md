# Yuri Dmitriev

Сайт бухгалтера и налогового специалиста Юрия Дмитриева для компаний в Германии. Основной фокус — команды 5–50 человек, диапазон клиентов — от 1 до 500.

Продакшен: [keinestressmitfinanzamt.de](https://keinestressmitfinanzamt.de). Репозиторий: [YPereverzev/tax-consulting](https://github.com/YPereverzev/tax-consulting).

Проект сразу закрывает две задачи: клиент может понять практику и оставить заявку, а код уже содержит SEO, доступность, серверный API, защиту формы и отправку почты.

GitHub Pages отдаёт статическую сборку. Форма заявки (`POST /api/consult`, Resend, Turnstile) работает локально через `next dev` / `next start`. На Pages серверных Route Handlers нет — почту для продакшена нужно будет подключить отдельно.

## Стек

- Next.js, React, TypeScript, Tailwind CSS
- React Hook Form, Zod
- Next.js Route Handlers
- Resend
- Cloudflare Turnstile

## Запуск

```bash
cp .env.example .env.local
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000). Откроется `/ru/`; язык можно сменить флагами DE / RU в правом верхнем углу.

В `.env.local` для локальной разработки оставьте тестовые ключи Turnstile: они всегда проходят. Без `RESEND_API_KEY` заявка в development не падает — она пишется в лог сервера.

## Скрипты

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Что уже заложено

- Страницы: главная, услуги, консультация, политика конфиденциальности
- Языки: русский (по умолчанию) и немецкий, аудитория — Германия
- SEO: metadata, sitemap, robots, Open Graph, JSON-LD
- Доступность: `lang` по выбранному языку, skip link, подписи полей, ошибки формы, видимый фокус
- API `POST /api/consult`: same-origin, лимит запросов, honeypot, Turnstile, Zod
- Письмо заявки через Resend
- Security headers и CSP nonce через `src/proxy.ts` в серверном режиме
- Деплой на GitHub Pages из `main`

## Домен

После того как DNS указывает на GitHub Pages:

| Тип | Имя | Значение |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `YPereverzev.github.io` |

## Почта и антиспам

1. Подтвердите домен в [Resend](https://resend.com) и заполните `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONSULT_TO_EMAIL`.
2. Создайте виджет в [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) и замените тестовые ключи.
3. Для продакшена с формой заявки нужен Node-хостинг (например Vercel). GitHub Pages сам письма не отправляет.
