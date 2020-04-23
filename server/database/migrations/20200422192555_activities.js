exports.up = function (knex) {
  return knex.schema.createTable("activities", (table) => {
    table.increments("id");
    table.timestamp("created_at");
    table.timestamp("updated_at");
    table.integer("contact_id");
    table.integer("user_id");
    table.string("type_cd", 100);
    table.string("status_cd", 100);
    table.string("description", 255);
    table.timestamp("start_date");
    table.timestamp("end_date");
    table.timestamp("due_date");
    table.integer("duration");
    table.text("remarks");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("activities");
};
