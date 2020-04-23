const { Service } = require("feathers-objection");

exports.Activities = class Activities extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }
};
