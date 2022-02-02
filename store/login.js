import api from "../api/index";
import axios from "axios";
import { iv, enc } from "@/utils/encrypt";

export const state = () => ({
  email: "",
  password: "",
  privatePolicies: false,
  termsAndConditions: false
});

export const getters = {
  getPrivatePolicies: state => state.privatePolicies,
  getTermsAndConditions: state => state.termsAndConditions
};
export const mutations = {
  setPrivatePolicies: (state, value) => (state.privatePolicies = value),
  setTermsAndConditions: (state, value) => (state.termsAndConditions = value),
  setEmail: (state, value) => (state.email = value),
  setPassword: (state, value) => (state.password = value)
};

export const actions = {
  async login2({ rootGetters, commit }, form) {
    let config = {
      headers: { "X-kg-Access-Token": rootGetters.getAcsTkn }
    };
    let object = {
      email: form.email,
      password: enc(form.password),
      iv: iv.toString("hex"),
      platformId: 1,
      pushToken: 0,
      version: "1.1"
    };
    let json = await axios
      .post(process.env.apiUrl + api.login2, object, config)
      .catch(error => {
        console.log(error);
        return error.response;
      });

    if (json.data.success) commit("setUser", json.data.body);
    return json;
  }
};
