exports.up = function (knex) {
    return knex.schema.alterTable("resources", function (table) {
        table.string("display_name", 128).notNullable().defaultTo(knex.raw('??', ['original_name'])); // Setting default value
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("resources", function (table) {
        table.dropColumn("display_name");
    });
};
