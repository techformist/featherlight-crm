// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require("objection");

class users extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["password", "email"],

      properties: {
        email: { type: ["string", "null"] },
        password: "string",
        name: { type: "string", maxLength: 100 },
        role_cd: { type: "string", maxLength: 50 },
        status_cd: { type: "string", maxLength: 50 },
        start_date: { type: "date" },
        end_date: { type: "date" },
      },
    };
  }

  $beforeInsert() {
    this.created_at = this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get("knex");

  db.schema
    .hasTable("users")
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable("users", (table) => {
            table.increments("id");

            table.string("email").unique();
            table.string("password");
            table.string("name");

            table.timestamp("created_at");
            table.timestamp("updated_at");
          })
          .then(() => console.log("Created users table")) // eslint-disable-line no-console
          .catch((e) => console.error("Error creating users table", e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error("Error creating users table", e)); // eslint-disable-line no-console

  return users;
};
