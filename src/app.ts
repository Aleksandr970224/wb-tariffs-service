import 'dotenv/config';
import { migrate, seed } from "#postgres/knex.js";
import { fetchWbTariffs } from './services/wb.service.js';
import { exportToSheet } from './services/google.service.js';
import { saveTariffs, getSpreadsheetIds } from './services/db.service.js'; // Импортируем твои функции

async function mainJob() {
  console.log(`[${new Date().toLocaleString()}] Starting periodic update...`);

  try {
    const tariffs = await fetchWbTariffs();

    if (tariffs && tariffs.length > 0) {
      await saveTariffs(tariffs);

      let sheetIds = await getSpreadsheetIds();

      if (sheetIds.length === 0 && process.env.GOOGLE_SHEET_ID) {
        sheetIds = [process.env.GOOGLE_SHEET_ID];
      }

      for (const id of sheetIds) {
        try {
          await exportToSheet(id);
          console.log(`Google Sheet ${id} updated successfully.`);
        } catch (err: any) {
          console.error(`Error updating sheet ${id}:`, err instanceof Error ? err.message : String(err));
        }
      }
    } else {
      console.log("No tariffs received from WB API.");
    }
  } catch (error) {
    console.error("Job error:", error);
  }
}

async function bootstrap() {
  try {
    console.log("Checking migrations...");
    await migrate.latest();

    console.log("Running seeds...");
    await seed.run();

    await mainJob();

    setInterval(mainJob, 60 * 60 * 1000);

    console.log("Service started. Next update in 1 hour.");
  } catch (error) {
    console.error("Bootstrap error:", error);
    process.exit(1);
  }
}

bootstrap();
