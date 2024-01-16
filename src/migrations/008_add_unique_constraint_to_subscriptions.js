exports.up = function (knex) {
    return knex.schema.alterTable("subscriptions", function (table) {
        // Add a unique constraint for user_id and product_id combination
        table.unique(["user_id", "product_id"]);
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("subscriptions", function (table) {
        // Drop the unique constraint
        table.dropUnique(["user_id", "product_id"]);
    });
};
