// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require("objection");

class activities extends Model {
  static get tableName() {
    return "activities";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["type_cd", "status_cd"],

      properties: {
        text: { type: "string" },
        description: { type: "string", maxLength: 255 },

        type_cd: {
          type: "string",
          enum: ["Task", "Call", "Meeting"],
          default: "Task",
        },
        status_cd: {
          type: "string",
          enum: ["Created", "Planned", "In Progress", "Closed", "Cancelled"],
          default: "Created",
        },
        start_date: { type: "timestamp" },
        end_date: { type: "timestamp" },
        due_date: { type: "timestamp" },
        duration: { type: "integer" },
        contact_id: { type: "integer" },
        user_id: { type: "integer" },
        remarks: { type: "text" },
      },
    };
  }

  static get relationMappings() {
    const User = require("./users.model");
    const Contact = require("./contacts.model");

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "activities.user_id",
          to: "users.id",
        },
      },
      contact: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contact,
        join: {
          from: "activities.contact_id",
          to: "contacts.id",
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
  return activities;
};
