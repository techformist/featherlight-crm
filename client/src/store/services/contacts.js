import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from "../../feathers-client";

class Contact extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = "Contact";
  // Define default properties here
  static instanceDefaults() {
    return {
      first_name: "",
      last_name: "",
      status_cd: "active",
      title: "Ms.",
      email: "",
      phone: "",
      address: {},
    };
  }
}
const servicePath = "contacts";
const contactsPlugin = makeServicePlugin({
  Model: Contact,
  service: feathersClient.service(servicePath),
  servicePath,
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
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
});

export default contactsPlugin;
