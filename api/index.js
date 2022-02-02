export default {
  // access token
  generateAcsTkn: "kg/generate-access-token",
  getAllQuestions: "helpCenter/getAllQuestions",
  // Auth
  login: "onboarding/login", // login
  login2: "onboarding/login", // login with active directory
  getCodeVerification: "onboarding/getCodeVerification",
  verifyCode: "onboarding/verifyCode",
  getCity: "city",
  getBuildingsByCity: "building/getBuildingsByCity",
  getTypeOffice: "officeType/getAll",
  getFloorsByBuilding: "building/getFloorsByBuilding",
  getListOfOfficeByFloor: "office/getListOfOfficeByFloor",
  getOfficeInfo: "office/getOfficeInfo",
  getListUsers: "user/listUsers",
  reservationOffice: "office/reservationOffice",
  getTime: "systemTimeAvailableRouter/getTime",
  verifyReservationTime: "office/verifyReservationTime",
  addOfficeToFavorites: "office/addOfficeToFavorites",
  getFavoritesOfficesOfUser: "office/getFavoritesOfficesOfUser",
  listUserReservations: "office/listUserReservations",
  cancelReservation: "office/cancelReservation",
  updateReservation: "office/updateReservation",
  makeCheckIn: "checkIn/makeCheckIn",
  makeCheckOut: "checkOut/makeCheckOut",
  listNotificationReservationByUid: "office/listNotificationReservationByUid",
  editUser: "user/editUser"
};
