WB Tariffs Service (Test Task)
Сервис для ежечасного сбора тарифов Wildberries, сохранения их в PostgreSQL и выгрузки в Google Таблицы.

Настройка (перед запуском):
1. Создайте файл .env на основе примера .env.example:
  Укажите ваш WB_API_TOKEN
  Укажите id в GOOGLE_SHEET_ID
  Положите ваш JSON-ключ в config/credentials.json (создайте папку config в корне проекта, если её нет), пример config/credentials.example.json
  Добавьте email сервисного аккаунта в список редакторов ваших Google Таблиц (роль Editor).
  Убедитесь, что в таблицах создан лист с названием stocks_coefs

Быстрый запуск:
docker compose up
  
Команды шаблона
Запуск базы данных:
docker compose up -d --build postgres

Миграции и сиды (локально):
npm run knex:dev migrate:latest
npm run knex:dev seed:run

Режим разработки:
npm run dev

Проверка приложения в Docker:
docker compose up -d --build app


Структура
src/app.ts — Точка входа, миграции и планировщик.
src/services/wb.service.ts — Работа с API Wildberries.
src/services/google.service.ts — Интеграция с Google Sheets.
src/services/db.service.ts — Транзакционная логика работы с БД.



