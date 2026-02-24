/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('tariffs', (table) => {
        table.increments('id').primary();
        table.string('box_id').notNullable();
        table.string('warehouse_id').notNullable();
        table.decimal('coefficient', 10, 2).notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.date('record_date').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.unique(['box_id', 'warehouse_id', 'record_date']);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('tariffs');
}