import axios from "axios";
import api from "../api";
export const state = () => ({
  acstkn: "",
  user: {},
  citys: [],
  city: {
    name: "",
    id: null
  },
  buildings: [],
  building: {
    name: "",
    id: null
  },
  typesOffices: [],
  typeOffice: { name: "", id: null },
  office: { name: "", id: null },
  date: "",
  startTime: "",
  endTime: "",
  spaceReserve: 1,
  leaderReserve: {
    id: "",
    name: "",
    position: ""
  },
  officeInfo: {
    name: "",
    buildingInfo: { name: "" },
    floorBuildingInfo: { floor: "" },
    officePlains: [{ image: "" }],
    officeTypeInfo: { name: "" }
  },
  succesReservation: {
    date: "2020-12-14",
    startTime: "15:00",
    endTime: "15:30"
  },
  isAllDay: null,
  isFavorite: false,
  time: "",
  favorites: [],
  selectFavorite: false,
  listNotification: []
});

export const mutations = {
  setAcsTkn: (state, payload) => {
    state.acstkn = payload;
  },
  setCity: (state, payload) => {
    state.city = payload;
  },
  setSpaceReserve: (state, payload) => {
    state.spaceReserve = payload;
  },
  setBuilding: (state, payload) => {
    state.building = payload;
  },
  setTypeOffice: (state, payload) => {
    state.typeOffice = payload;
  },
  setUser: (state, payload) => {
    state.user = payload;
  },
  setDate: (state, payload) => {
    state.date = payload;
  },
  setStartTime: (state, payload) => {
    state.startTime = payload;
  },
  setEndTime: (state, payload) => {
    state.endTime = payload;
  },
  setOffice: (state, payload) => {
    state.office = payload;
  },
  setLeaderReserve: (state, payload) => {
    state.leaderReserve = payload;
  },
  setOfficeInfo: (state, payload) => {
    state.officeInfo = payload;
  },
  setSuccesReservation: (state, payload) => {
    state.succesReservation = payload;
  },
  setTime: (state, payload) => {
    state.time = payload;
  },
  setIsFavorite: (state, payload) => {
    state.isFavorite = payload;
  },
  setIsAllDay: (state, payload) => {
    state.isAllDay = payload;
  },
  setFavorites: (state, payload) => {
    state.favorites = payload;
  },
  setTypesOffices: (state, payload) => {
    state.typesOffices = payload;
  },
  setCitys: (state, payload) => {
    state.citys = payload;
  },
  setBuildings: (state, payload) => {
    state.buildings = payload;
  },
  setSelectFavorite: (state, payload) => {
    state.selectFavorite = payload;
  },
  setListNotification: (state, payload) => {
    state.listNotification = payload;
  }
};

export const getters = {
  getAcsTkn: state => state.acstkn,
  getCity: state => state.city,
  getBuilding: state => state.building,
  getTypeOffice: state => state.typeOffice,
  getUser: state => state.user,
  getStartTime: state => state.startTime,
  getEndTime: state => state.endTime,
  getDate: state => state.date,
  getOffice: state => state.office,
  getSpaceReserve: state => state.spaceReserve,
  getLeaderReserve: state => state.leaderReserve,
  getOfficeInfo: state => state.officeInfo,
  getSuccesReservation: state => state.succesReservation,
  getTime: state => state.time,
  getIsAllDay: state => state.isAllDay,
  getIsFavorite: state => state.isFavorite,
  getFavorites: state => state.favorites,
  getCitys: state => state.citys,
  getSelectFavorite: state => state.selectFavorite,
  getCityById: state => id => state.citys.find(city => city.id == id),
  getBuildingById: state => id =>
    state.buildings.find(building => building.id == id),
  getTypeOfficeById: state => id =>
    state.typesOffices.find(typeOffice => typeOffice.id == id),
  getListNofication: state => state.listNotification,
  getListNoficationById: state => id =>
    state.listNotification.find(
      listNotification => listNotification.notifReservationId == id
    )
};

export const actions = {
  nuxtServerInit: async ({ dispatch }) => {
    await dispatch("generateAcsTkn");
  },
  generateAcsTkn: async ({ commit }) => {
    let data = await axios
      .get(process.env.apiUrl + api.generateAcsTkn)
      .catch(err => {
        console.log(err);
        return null;
      });
    if (data) {
      commit("setAcsTkn", data.data.body.accessToken);
    }
    return data;
  },
  getTime: async ({ getters, commit, dispatch }) => {
    await dispatch("generateAcsTkn");
    let config = {
      headers: { "X-kg-Access-Token": getters.getAcsTkn }
    };
    let data = await axios
      .get(process.env.apiUrl + api.getTime, config)
      .catch(err => {
        console.log(err);
        return null;
      });
    commit("setTime", data.data.body.time);
    return data;
  },
  login: async ({ getters, commit }, form) => {
    let sha1 = require("sha1");
    let config = {
      headers: { "X-kg-Access-Token": getters.getAcsTkn }
    };
    let object = {
      email: form.email,
      password: sha1(form.password),
      platformId: 1,
      pushToken: 0,
      version: "2.1"
    };
    let json = await axios
      .post(process.env.apiUrl + api.login, object, config)
      .catch(error => {
        return error.response;
      });
    if (json.data.success) commit("setUser", json.data.body);
    // commit("setLeaderReserve", {
    //   id: json.data.body.uid,
    //   name: json.data.body.fullName,
    //   position: json.data.body.position
    // });
    return json;
  },
  getAllQuestions({ getters, dispatch }, data) {
    return new Promise(async (resolve, reject) => {
      await dispatch("generateAcsTkn");
      let config = {
        headers: { "X-kg-Access-Token": getters.getAcsTkn }
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
  },
  getCodeVerification({ getters, dispatch }, form) {
    return new Promise(async (resolve, reject) => {
      await dispatch("generateAcsTkn");
      let config = {
        headers: { "X-kg-Access-Token": getters.getAcsTkn }
      };
      let object = {
        uid: form.uid
      };
      axios
        .post(process.env.apiUrl + api.getCodeVerification, object, config)
        .then(function (json) {
          resolve(json);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  verifyCode({ getters }, form) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { "X-kg-Access-Token": getters.getAcsTkn }
      };
      let object = {
        uid: form.uid,
        code: form.code
      };
      axios
        .post(process.env.apiUrl + api.verifyCode, object, config)
        .then(json => {
          resolve(json);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getCitys({ getters, commit, dispatch }, data) {
    return new Promise(async (resolve, reject) => {
      await dispatch("generateAcsTkn");
      let config = {
        headers: { "X-kg-Access-Token": getters.getAcsTkn }
      };
      axios
        .post(process.env.apiUrl + api.getCity, data.body, config)
        .then(res => {
          commit("setCitys", res.data.body);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getBuildingsByCity({ getters, commit }) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { "X-kg-Access-Token": getters.getAcsTkn }
      };
      let body = {
        cityId: getters.getCity.id,
        limit: 10,
        offset: 0
      };
      axios
        .post(process.env.apiUrl + api.getBuildingsByCity, body, config)
        .then(res => {
          commit("setBuildings", res.data.body);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getTypeOffice({ getters, dispatch, commit }, data) {
    return new Promise(async (resolve, reject) => {
      await dispatch("generateAcsTkn");
      let config = {
        headers: { "X-kg-Access-Token": getters.getAcsTkn }
      };
      axios
        .post(process.env.apiUrl + api.getTypeOffice, data.body, config)
        .then(res => {
          console.log(res);
          commit("setTypesOffices", res.data.body);
          dispatch("getFavoritesOfficesOfUser");
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getFloorsByBuilding({ getters }, data) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { "X-kg-Access-Token": getters.getAcsTkn }
      };
      let body = {
        buildingId: getters.getBuilding.id
      };
      axios
        .post(process.env.apiUrl + api.getFloorsByBuilding, body, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getListOfOfficeByFloor({ getters }, data) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { "x-kg-access-token": getters.getAcsTkn }
      };
      let body = {
        uid: getters.getUser.uid,
        date: getters.getDate,
        startTime: getters.getStartTime,
        endTime: getters.getEndTime,
        cityId: getters.getCity.id,
        buildingId: getters.getBuilding.id,
        officeTypeId: getters.getTypeOffice.id,
        floorBuildingId: data.floorId,
        limit: 500,
        offset: 0
      };
      axios
        .post(process.env.apiUrl + api.getListOfOfficeByFloor, body, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getOfficeInfo({ getters, commit }) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { "x-kg-access-token": getters.getAcsTkn }
      };
      let body = {
        id: getters.getOffice.id
      };
      axios
        .post(process.env.apiUrl + api.getOfficeInfo, body, config)
        .then(res => {
          commit("setOfficeInfo", res.data.body);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getListUsers({ getters }, id) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { "x-kg-access-token": getters.getAcsTkn }
      };
      let body = {
        needle: "",
        officeTypeId: id ?? getters.getTypeOffice.id
      };
      axios
        .post(process.env.apiUrl + api.getListUsers, body, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  reservationOffice({ getters, commit }) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { "x-kg-access-token": getters.getAcsTkn }
      };
      let body = {
        date: getters.getDate,
        startTime: getters.getStartTime,
        endTime: getters.getEndTime,
        uid: getters.getUser.uid,
        leadReservationUid:
          getters.getLeaderReserve.id != ""
            ? getters.getLeaderReserve.id
            : getters.getUser.uid,
        officeId: getters.getOfficeInfo.id
      };
      console.log(body);
      axios
        .post(process.env.apiUrl + api.reservationOffice, body, config)
        .then(res => {
          commit("setSuccesReservation", res.data.body);
          resolve({ success: res.data.success, message: res.data.message, body: res.data.body });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  verifyReservationTime({ getters, commit }) {
    return new Promise((resolve, reject) => {
      let config = {
        headers: { "x-kg-access-token": getters.getAcsTkn }
      };
      let body = {
        date: getters.getDate,
        startTime: getters.getStartTime,
        endTime: getters.getEndTime,
        uid: getters.getUser.uid
      };
      console.log(body);
      axios
        .post(process.env.apiUrl + api.verifyReservationTime, body, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  resetForm({ commit, getters }) {
    commit("setCity", {
      name: "",
      id: null
    });
    commit("setBuilding", {
      name: "",
      id: null
    });
    commit("setTypeOffice", {
      name: "",
      id: null
    });
    commit("setOffice", {
      name: "",
      id: null
    });
    commit("setDate", "");
    commit("setStartTime", "");
    commit("setEndTime", "");
    commit("setLeaderReserve", {
      id: getters.getUser.uid,
      name: getters.getUser.fullName,
      position: getters.getUser.position
    });
    commit("setSpaceReserve", 1);
    commit("setIsAllDay", null);
    commit("setSelectFavorite", false);
  },
  addOfficeToFavorites: async ({ getters, commit, dispatch }, id) => {
    let config = {
      headers: { "x-kg-access-token": getters.getAcsTkn }
    };
    let body = {
      uid: getters.getUser.uid,
      officeId: id
    };
    let data = await axios
      .post(process.env.apiUrl + api.addOfficeToFavorites, body, config)
      .catch(err => {
        console.log(err);
      });
    let favorite = getters.getIsFavorite;
    console.log(data.data, favorite);
    if (data.data.body.success) {
      dispatch("getFavoritesOfficesOfUser");
      commit("setIsFavorite", !favorite);
      return data.data.message;
    }
  },
  getFavoritesOfficesOfUser: async ({ getters, commit, dispatch }) => {
    await dispatch("generateAcsTkn");
    let config = {
      headers: { "x-kg-access-token": getters.getAcsTkn }
    };
    let body = {
      uid: getters.getUser.uid,
      limit: 10,
      offset: 0
    };
    let data = await axios
      .post(process.env.apiUrl + api.getFavoritesOfficesOfUser, body, config)
      .catch(err => {
        console.log(err);
      });
    console.log(data.data.body);
    if (data.data.success) commit("setFavorites", data.data.body);
  },
  selectFavorite: async ({ getters, commit, dispatch }, favorite) => {
    let city = getters.getCityById(favorite.cityId);
    console.log(city);
    commit("setCity", city);
    await dispatch("getBuildingsByCity");
    let building = getters.getBuildingById(favorite.buildingId);
    console.log(building);
    let typeOffice = getters.getTypeOfficeById(favorite.officeTypeId);
    commit("setTypeOffice", typeOffice);
    commit("setBuilding", building);
    commit("setOffice", favorite);
    commit("setSelectFavorite", true);
    commit("setSpaceReserve", 1);
    commit("setIsFavorite", true);
  },
  listNotificationReservationByUid: async ({ getters, commit, dispatch }) => {
    await dispatch("generateAcsTkn");
    try {
      let config = {
        headers: { "x-kg-access-token": getters.getAcsTkn }
      };
      let body = {
        uid: getters.getUser.uid,
        limit: 10,
        offset: 0
      };
      let data = await axios.post(
        process.env.apiUrl + api.listNotificationReservationByUid,
        body,
        config
      );
      commit("setListNotification", data.data.body);
      return data.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },
  async editUser({ getters, commit }, profileImage) {
    let config = {
      headers: { "x-kg-access-token": getters.getAcsTkn }
    };
    let body = new FormData();
    body.append("uid", getters.getUser.uid);
    body.append("profileImage", profileImage);
    console.log(profileImage);
    try {
      let data = await axios.post(
        process.env.apiUrl + api.editUser,
        body,
        config
      );
      console.log(data.data.body);
      commit("setUser", data.data.body);
      return data.data;
    } catch (error) {
      console.log(error);
      console.log(error.response);
      return error;
    }
  }
};
