exports.up = function (knex) {
  return knex.schema.table("contacts", (table) => {
    table.json("address");
  });
};

exports.down = function (knex) {
  return knex.schema.table("contacts", function (table) {
    table.dropColumn("address");
  });
};
