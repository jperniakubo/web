import Vue from "vue";

import OtpInput from "@bachdgvn/vue-otp-input";
import VCalendar from "v-calendar";
import { BreadstickBakery } from "breadstick";
import ICS from "vue-ics";

Vue.use(ICS);
Vue.component("v-otp-input", OtpInput);
Vue.use(BreadstickBakery);
Vue.use(VCalendar, {
  componentPrefix: "vc"
});
