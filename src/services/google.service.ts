import { google } from 'googleapis';
import { getSortedTariffsForToday } from './db.service.js';

export async function exportToSheet(spreadsheetId: string) {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const data = await getSortedTariffsForToday();

  const values = [
    ['Warehouse Name', 'Coefficient', 'Base Price', 'Date'],
    ...data.map(item => [
      item.warehouse_id,
      item.coefficient ?? 0,
      item.price ?? 0,
      item.record_date
    ])
  ];

  await sheets.spreadsheets.values.clear({ spreadsheetId, range: 'stocks_coefs!A1:Z1000' });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'stocks_coefs!A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values }
  });

  console.log(`Google Sheets updated: ${data.length} clean rows written to ${spreadsheetId}.`);
}
