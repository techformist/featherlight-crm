exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("role_cd", 50);
    table.string("status_cd", 50);
    table.date("start_date");
    table.date("end_date");
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.dropColumn("role_cd");
    table.dropColumn("status_cd");
    table.dropColumn("start_date");
    table.dropColumn("end_date");
  });
};
