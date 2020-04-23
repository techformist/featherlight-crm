import req from "../util/req";
import store from "../store";

import { make } from "vuex-pathify";
import router from "../router";

const getDefaultState = () => {
  return {
    registerUserName: null,
    registerUserId: null,

    registerEmail: null,
    registerPass: null,
    registerError: null,
    registerDetails: {},
    validUserIdStatus: false,
    user: {},
    maxViewMode: "person",

    token: null,
    refreshToken: null
  };
};

const state = getDefaultState();

export default {
  name: "authentication",
  namespaced: true,
  state: state,

  actions: {
    logout({ commit }) {
      try {
        store.set("alert/alert", {});
        store.set("pref/leftDrawOpen", false);

        commit("resetState");
        router.push("/login");
      } catch (e) {
        //blah
      }
    },

    async login({ state }) {
      try {
        const { data } = await req("post", "v0/auth/login", {
          userid: state.registerUserId,
          password: state.registerPass
        });

        if (data) {
          store.set("authentication/token", data["token"]);
          store.set("authentication/refreshToken", data["refreshToken"]);
          store.set("pref/leftDrawOpen", true);
          store.set("authentication/user", data["user"]);
          router.push("/dashboard");
        }
      } catch (e) {
        // nothing here
      }
    },

    async register({ state }) {
      try {
        // Note that we are storing registerUserId in email as well.
        // You could use this field to separate out email and userid
        // email: state.registerDetails["registerEmail"],
        const { data } = await req("post", "v0/auth/register", {
          username: state.registerDetails["registerUserName"],
          userid: state.registerDetails["registerUserId"],
          email: state.registerDetails["registerUserId"],
          password: state.registerPass
        });

        if (data) {
          store.set("alert/alert", {
            type: "info",
            message:
              "You are registered! Check your email to confirm id. If you provided an existing org/company, contact your administrator to approve your access."
          });
          store.commit("snackbar/setSnack", {
            message: "Successfully registered. Check your email to verify.",
            color: "success",
            timeout: 15000
          });
          router.push("/login");
        }
      } catch (e) {
        // nothing here
      }
    },

    async updateProfile({ state }, profile) {
      try {
        if (!state.user || !state.user["id"]) {
          store.commit(
            "alert/setAlertMsg",
            "Could not find logged-in user details. Re-login and retry."
          );
          console.error(
            "Error updating profile. User or User Id do not exist. "
          );
        } else {
          const { data } = await req("post", "v0/update-profile/", profile);

          store.set("authentication/user", data);
        }
      } catch (e) {
        console.error(e);
      }
    },

    async updateOrgProfile({ state }, profile) {
      try {
        if (!state.user || !state.user["id"]) {
          store.commit(
            "alert/setAlertMsg",
            "Could not find logged-in user details. Re-login and retry."
          );
          console.error(
            "Error updating org profile. User or User Id do not exist."
          );
        } else {
          const { data } = await req("post", "v0/update-org-profile/", profile);

          store.set("authentication/userOrg", data);
        }
      } catch (e) {
        console.error(e);
      }
    },

    async getProfile({ state }) {
      const { data } = await req("get", "v0/get-profile/", state.user);
      store.set("authentication/user", data);
    },

    async checkUserIdValid({ state }) {
      try {
        store.set("authentication/validUserIdStatus", null);
        if (state.registerDetails["registerUserId"]) {
          const { data } = await req("post", "v0/auth/check-valid-user", {
            userid: state.registerDetails["registerUserId"]
          });

          const result = (data && data.valid) || false;

          store.set("authentication/validUserIdStatus", result);
        }
      } catch (e) {
        // nothing here
      }
    },

    async verifyEmailToken({ commit }, token) {
      try {
        store.commit("alert/setAlertMsg", "");

        const { data } = await req("post", "v0/auth/verify-token", {
          token: token
        });

        if (data) {
          store.set("alert/alert", {
            type: "info",
            message:
              "Token verified. Login if you are the first user in your org! Else, you need to get your company administrator to approve your access."
          });
          commit(
            "snackbar/setSnack",
            {
              message: "Successfully verified token. ",
              color: "success",
              timeout: 10000
            },
            { root: true }
          );

          router.push("/login");
        } else {
          store.commit(
            "alert/setAlertMsg",
            "Error verifying token. Retry, or contact us for assistance."
          );

          console.error("Error verifying token. ");
        }
      } catch (e) {
        // nothing here
      }
    },

    async resetPasswordInitiate({ commit, state }, redirect) {
      try {
        if (!redirect) redirect = true;

        if (!state["registerUserId"]) {
          commit(
            "alert/setAlertMsg",
            "User id is blank. Provide user id to reset password.",
            { root: true }
          );

          throw "Email cannot be blank.";
        }

        const { data } = await req("post", "v0/auth/forgot-password", {
          userid: state.registerUserId
        });

        if (data) {
          store.set("snackbar/snack", {
            message:
              "We have sent a request to confirm password reset. Check your email.",
            color: "info",
            timeout: 10000
          });

          if (!redirect) router.push("/reset-password");
        } else {
          store.commit(
            "alert/setAlertMsg",
            "Error requesting password reset. Verify your id / password, or contact us for assistance."
          );
        }
      } catch (e) {
        // nothing here
      }
    },

    async resetPassword({ state }) {
      try {
        const { data } = await req("post", "v0/auth/reset-password", {
          token: state.token,
          password: state.registerPass
        });

        if (data) {
          store.set("authentication/token", data.jwt);
          store.set("authentication/user", data.user);
          store.set("snackbar/snack", {
            message: "Your password has been changed.",
            color: "success"
          });
        }
        store.set("authentication/registerPass", "");
      } catch (e) {
        // nothing here
      }
    },

    async changePassword(input) {
      try {
        store.set("authentication/token", data.jwt);
        store.set("alert/alert", { message: "" });

        const { data } = await req("post", "v0/auth/update-password", {
          old_password: input.oldPass,
          new_password: input.newPass
        });

        if (data) {
          store.set("authentication/token", data.token);
          store.set("snackbar/snack", {
            message: "Your password has been changed.",
            color: "success"
          });
        } else {
          store.set(
            "alert/setAlertMsg",
            "Error resetting password. Contact us for assistance."
          );
        }
        store.set("authentication/registerPass", "");
      } catch (e) {
        // nothing here
      }
    },

    async regenerateToken({ state }) {
      try {
        if (Date.now() - state.tokenDate > 172800000) {
          const { data } = await req("post", "v0/regenerate-token/", {
            token: state.token,
            refreshToken: state.refreshToken
          });

          if (data) {
            if (state.token == data.token)
              console.info("No new tokens available.");
            else {
              console.info("Token refreshed.");
              store.set("authentication/tokenDate", Date.now());
            }
            store.set("authentication/token", data.token);
            store.set("authentication/refreshToken", data.refreshToken);
          }
        }
      } catch (e) {
        // nothing here
      }
    }
  },

  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    isOrgAdmin(state) {
      return !!state.token && !!state.user && state.user.role_cd == "Org Admin";
    },
    isSuperAdmin(state) {
      return state.user.role_cd == "Super Admin";
    },

    registerEmail(state) {
      return state.registerEmail;
    }
  },
  mutations: {
    ...make.mutations(state),

    setToken(state, token) {
      state.token = token;
    },
    setRegisterDetails(state, registerDetails) {
      state.registerDetails = registerDetails;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterUserId(state, userId) {
      state.registerUserId = userId;
    },
    setRegisterUserName(state, userName) {
      state.registerUserName = userName;
    },
    setRegisterPass(state, pass) {
      state.registerPass = pass;
    },
    setRegisterOrgId(state, orgId) {
      state.registerOrgId = orgId;
    },
    setValidUserIdStatus(state, status) {
      state.validUserIdStatus = status;
    },
    setUser(state, user) {
      state.user = user;
    },

    setUserOrg(state, org) {
      state.user["org"] = org;
    },

    resetState(state) {
      Object.assign(state, getDefaultState());
    }
  }
};
