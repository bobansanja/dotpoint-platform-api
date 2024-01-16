exports.up = function (knex) {
    return knex.schema.createTable("module_resources", function (table) {
        table.increments("id").primary();
        table.integer("module_id").unsigned().notNullable();
        table.integer("resource_id").unsigned().notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("module_resource");
};
