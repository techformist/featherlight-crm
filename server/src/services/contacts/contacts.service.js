// Initializes the `contacts` service on path `/contacts`
const { Contacts } = require('./contacts.class');
const createModel = require('../../models/contacts.model');
const hooks = require('./contacts.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/contacts', new Contacts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('contacts');

  service.hooks(hooks);
};
