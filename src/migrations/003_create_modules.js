exports.up = function (knex) {
    return knex.schema.createTable("modules", function (table) {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.text("description").notNullable();
        table.string("unique_name").notNullable().unique();
        table.integer("position").defaultTo(1);
        table.boolean("active").defaultTo(true);
        table.integer("product_id").unsigned().notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("modules");
};
