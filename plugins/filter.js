import Vue from "vue";

Vue.filter("DeleteUrl", value =>
  value.replace(
    "https://www.kpmgexternalservices.com.co:5001",
    "https://boapionekey.co.kworld.kpmg.com:5001"
  )
);
