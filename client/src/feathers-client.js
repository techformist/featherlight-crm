import feathers from "@feathersjs/feathers";
import auth from "@feathersjs/authentication-client";
import feathersVuex from "feathers-vuex";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import { iff, discard } from "feathers-hooks-common";

const socket = io("http://localhost:3030", { transports: ["websocket"] });

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))
  .hooks({
    before: {
      all: [
        iff(
          (context) => ["create", "update", "patch"].includes(context.method),
          discard("__id", "__isTemp")
        ),
      ],
    },
  });

export default feathersClient;

// Setting up feathers-vuex
const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  FeathersVuex,
} = feathersVuex(feathersClient, {
  serverAlias: "api", // optional for working with multiple APIs (this is the default value)
  idField: "id", // Must match the id field in your database table/collection
  whitelist: ["$regex", "$options"],
});

export { makeAuthPlugin, makeServicePlugin, BaseModel, models, FeathersVuex };
