const { authenticate } = require("@feathersjs/authentication").hooks;

const isAdmin = (context) => {
  return context.app.settings.appconf.admin_roles.includes(
    context.params.user.role_cd
  );
};

module.exports = {
  before: {
    all: [authenticate("jwt")],

    find: [
      async (context) => {
        const query = {
          $select: [
            "type_cd",
            "status_cd",
            "start_date",
            "end_date",
            "due_date",
            "description",
            "created_at",
            "updated_at",
          ],
          $eager: "contact",
          $sort: { created_at: -1 },
        };

        if (!isAdmin(context)) query["user_id"] = context.params.user.id;

        context.params.query = { ...context.params.query, ...query };
        return context;
      },
    ],
    get: [],
    create: [
      async (context) => {
        // populate user as logged in user by default
        if (!isAdmin(context)) context.data.user_id = context.params.user.id;

        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
