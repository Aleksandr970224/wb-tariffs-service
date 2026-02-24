# WB Tariffs Service (Test Task)

Сервис для ежечасного сбора тарифов Wildberries, сохранения их в PostgreSQL и выгрузки в Google Таблицы.

## Настройка (перед запуском)

1. **Окружение**: Создайте файл `.env` на основе примера `.env.example`.
   - Укажите ваш `WB_API_TOKEN`.
   - Укажите ID вашей таблицы в `GOOGLE_SHEET_ID`.
2. **Google API**: Положите ваш JSON-ключ в `config/credentials.json` (создайте папку `config` в корне проекта, если её нет). Пример структуры — в `config/credentials.example.json`.
3. **Доступы**: Добавьте email сервисного аккаунта в список редакторов ваших Google Таблиц (роль **Editor**).
4. **Таблица**: Убедитесь, что в таблицах создан лист с названием **`stocks_coefs`**.

## Быстрый запуск
```bash
docker compose up

## Команды шаблона
Запуск базы данных:
```bash
docker compose up -d --build postgres

## Миграции и сиды (локально):
```bash
npm run knex:dev migrate:latest
```bash
npm run knex:dev seed:run

## Режим разработки:
```bash
npm run dev

## Проверка приложения в Docker:
```bash
docker compose up -d --build app


## Структура
src/app.ts — Точка входа, миграции и планировщик.
src/services/wb.service.ts — Работа с API Wildberries.
src/services/google.service.ts — Интеграция с Google Sheets.
src/services/db.service.ts — Транзакционная логика работы с БД.



