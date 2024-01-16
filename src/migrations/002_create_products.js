exports.up = function (knex) {
    return knex.schema.createTable("products", function (table) {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.string("unique_name").notNullable().unique();
        table.integer("position").notNullable();
        table.boolean("subscription_required").notNullable();
        table.boolean("active").defaultTo(true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("products");
};
