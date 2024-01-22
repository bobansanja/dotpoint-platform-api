exports.up = function (knex) {
    return knex.schema.createTable("config", function (table) {
        table.increments("id").primary();
        table.string("client_name").defaultTo("Demo");
        table.string("logo_path").defaultTo("");
        table.integer("logo_width").defaultTo(0);
        table.integer("logo_height").defaultTo(0);
        table.string("primary_color").defaultTo("#3f51b5");
        table.string("secondary_color").defaultTo("#03dac6");
        table.string("background_color").defaultTo("#15202b");
        table.string("surface_color").defaultTo("#15202b");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("config");
};
