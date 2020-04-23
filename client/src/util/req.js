import axios from "axios";
import store from "../store/index";

export default async (reqType, reqURL, data) => {
  store.set("loading", true);
  store.commit("alert/setAlertMsg", "");

  const options = {
    headers: {
      Authorization: `Bearer ${store.state.authentication.token}`
    }
  };

  try {
    switch (reqType) {
      case "post":
        return await axios.post(
          store.state.baseURL + "/" + reqURL,
          data,
          options
        );

      case "patch":
        return await axios.patch(
          store.state.baseURL + "/" + reqURL,
          data,
          options
        );

      case "get":
        return await axios.get(store.state.baseURL + "/" + reqURL, options);
    }
  } catch (e) {
    const msgPrefix = ["post", "patch"].includes(reqType)
      ? `Error saving data. `
      : `Error fetching details. `;

    const err =
      (e["response"] &&
        e["response"]["data"] &&
        (e["response"]["data"]["error"] || e["response"]["data"])) ||
      "";

    let errMsg = err["message"] ? err["message"] : err;
    if (
      err &&
      err["message"] &&
      err["message"].includes("E_JWT_TOKEN_EXPIRED")
    ) {
      errMsg = "Your session has expired. Re-login to continue.";
      store.commit("authentication/logout");
    }

    store.commit("alert/setAlertMsg", `${msgPrefix} ${errMsg}`);

    // stop further processing in caller!
  } finally {
    store.set("loading", false);
  }
};
