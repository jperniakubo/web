import axios from "axios";
import api from "../api";

export const state = () => ({});

export const mutations = {};

export const actions = {
  getAllQuestions(vuexContext, data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      let config = {
        headers: { "x-kg-access-token": data.acsTkn }
      };

      axios
        .post(process.env.apiUrl + api.getAllQuestions, data.body, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
