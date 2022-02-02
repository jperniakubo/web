import axios from "axios";
import api from "../api";

export const state = () => ({
  reservations: []
});
export const getters = {
  getReservations: state => state.reservations,
  getReservationById: state => id =>
    state.reservations.find(reservation => reservation.id == id)
};
export const mutations = {
  setReservations: (state, playload) => (state.reservations = playload)
};

export const actions = {
  getAllReservations: async ({ rootGetters, commit, dispatch }, date) => {
    await dispatch("generateAcsTkn", null, { root: true });
    try {
      let config = {
        headers: { "X-kg-Access-Token": rootGetters.getAcsTkn }
      };
      let body = {
        uid: rootGetters.getUser.uid,
        limit: 100,
        offset: 0,
        filterReservation: 0,
        filterDate: date
      };
      let data = await axios.post(
        process.env.apiUrl + api.listUserReservations,
        body,
        config
      );
      commit("setReservations", data.data.body);
      return data.data;
    } catch (error) {
      console.log(error);
      return err;
    }
  },
  cancelReservation: async ({ rootGetters }, id) => {
    try {
      let config = {
        headers: { "X-kg-Access-Token": rootGetters.getAcsTkn }
      };
      let body = {
        id
      };
      let data = await axios.post(
        process.env.apiUrl + api.cancelReservation,
        body,
        config
      );
      return data.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  updateReservation: async (
    { rootGetters },
    { reservationId, date, startTime, endTime, leadReservationUid, officeId }
  ) => {
    try {
      let config = {
        headers: { "X-kg-Access-Token": rootGetters.getAcsTkn }
      };
      let body = {
        reservationId,
        date,
        startTime,
        endTime,
        leadReservationUid,
        officeId
      };
      console.log(body);
      let data = await axios.post(
        process.env.apiUrl + api.updateReservation,
        body,
        config
      );
      return data.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },
  makeCheckIn: async (
    { rootGetters },
    { officeId, itemsCheckIn, reservationId, comment, image, amountOfPeople }
  ) => {
    try {
      let config = {
        headers: { "X-kg-Access-Token": rootGetters.getAcsTkn }
      };
      let body = new FormData();
      body.append("officeId", officeId);
      body.append("itemsCheckIn", itemsCheckIn);
      body.append("reservationId", reservationId);
      body.append("comment", comment);
      body.append("image", image);
      body.append("amountOfPeople", amountOfPeople);
      console.log(body);
      let data = await axios.post(
        process.env.apiUrl + api.makeCheckIn,
        body,
        config
      );
      return data.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },
  makeCheckOut: async (
    { rootGetters },
    { officeId, itemsCheckOut, reservationId, comment, image, amountOfPeople }
  ) => {
    try {
      let config = {
        headers: { "X-kg-Access-Token": rootGetters.getAcsTkn }
      };
      let body = new FormData();
      body.append("officeId", officeId);
      body.append("itemsCheckOut", itemsCheckOut);
      body.append("reservationId", reservationId);
      body.append("comment", comment);
      body.append("image", image);
      body.append("amountOfPeople", amountOfPeople);
      console.log(body);
      let data = await axios.post(
        process.env.apiUrl + api.makeCheckOut,
        body,
        config
      );
      return data.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
};
