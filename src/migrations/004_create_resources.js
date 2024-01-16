exports.up = function (knex) {
    return knex.schema.createTable("resources", function (table) {
        table.increments("id").primary();
        table.string("original_name").notNullable();
        table.string("name").notNullable().unique();
        table.string("path").notNullable();
        table.enum("file_type", ["VIDEO", "IMAGE", "PDF"]).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("resources");
};
