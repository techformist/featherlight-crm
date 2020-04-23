const { Service } = require('feathers-objection');

exports.Contacts = class Contacts extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
