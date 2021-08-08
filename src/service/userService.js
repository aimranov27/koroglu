import axios from "axios";
import endpoint from "../utils/endpoint";

export default {
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      // noinspection JSCheckFunctionSignatures
      axios
        .get(endpoint.currentUser)
        .then((value) => {
          if (value.data != null) {
            return resolve(value.data);
          } else {
            return resolve(null);
          }
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  },
};
