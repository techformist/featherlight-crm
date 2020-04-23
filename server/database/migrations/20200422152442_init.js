exports.up = function (knex) {
  return knex.schema.createTable("contacts", (table) => {
    table.increments("id");
    table.timestamp("created_at");
    table.timestamp("updated_at");
    table.string("first_name", 50);
    table.string("last_name", 50);
    table.string("title", 25);
    table.string("email", 100);
    table.string("phone", 25);
    table.string("status_cd").defaultTo("active");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("contacts");
};
