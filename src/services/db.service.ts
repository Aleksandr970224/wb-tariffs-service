import knex from '#postgres/knex.js';

export async function saveTariffs(tariffs: any[]) {
  const today = new Date().toISOString().split('T')[0];

  const rows = tariffs.map(t => ({
    box_id: t.box_id,
    warehouse_id: t.warehouse_id,
    coefficient: Number(t.coefficient) || 0,
    price: t.price,
    record_date: today
  }));

  if (rows.length === 0) {
    console.log('No valid tariffs to save.');
    return;
  }

  await knex.transaction(async (trx) => {
    await trx('tariffs').where('record_date', today).del();
    await trx('tariffs').insert(rows);
  });

  console.log(`Saved ${rows.length} clean rows to DB.`);
}

export async function getSortedTariffsForToday() {
  const today = new Date().toISOString().split('T')[0];
  return knex('tariffs')
    .where('record_date', today)
    .orderBy('coefficient', 'asc');
}

export async function getSpreadsheetIds(): Promise<string[]> {
  try {
    const rows = await knex('spreadsheets').select('spreadsheet_id');
    return rows.map(r => r.spreadsheet_id);
  } catch (e) {
    console.warn("Table 'spreadsheets' not found. Check migrations.");
    return [];
  }
}
