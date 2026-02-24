/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    await knex("spreadsheets")
        .insert([{ spreadsheet_id: "1MzOCAFljVdqcK9HJTPAaUBsZM0RNYYsAg8p8hDvhPeo" }])
        .onConflict(["spreadsheet_id"])
        .ignore();
}
