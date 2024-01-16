exports.up = function (knex) {
    return knex.schema.createTable("users", function (table) {
        table.increments("id").primary();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.enum("type", ["ADMIN", "USER"]).defaultTo("USER");
        table.boolean("active").defaultTo(true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
