// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require("objection");

class contacts extends Model {
  static get tableName() {
    return "contacts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["last_name"],

      properties: {
        first_name: { type: "string", maxLength: 50 },
        last_name: { type: "string", maxLength: 50 },
        title: { type: "string", maxLength: 25 },
        email: { type: "string", maxLength: 100 },
        phone: { type: "string", maxLength: 25 },
        status_cd: {
          type: "string",
          enum: ["active", "inactive"],
          default: "active",
        },
        address: {
          type: "object",
          properties: {
            street_address_1: { type: "string", maxLength: 255 },
            city: { type: "string", maxLength: 100 },
            country: { type: "string", maxLength: 100 },
            postal_code: { type: "string", maxLength: 25 },
          },
        },
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

module.exports = function () {
  return contacts;
};
