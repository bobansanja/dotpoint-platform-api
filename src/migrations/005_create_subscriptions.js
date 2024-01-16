exports.up = function (knex) {
    return knex.schema.createTable("subscriptions", function (table) {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable();
        table.integer("product_id").unsigned().notNullable();
        table.date("expiration_date").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("subscriptions");
};
