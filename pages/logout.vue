<template>
  <div></div>
</template>

<script>
export default {
  layout: "logged",
  directives: {},
  data() {
    return {};
  },
  components: {},
  mounted() {
    localStorage.clear();
    this.$nuxt.$cookiz.removeAll();
    // localStorage.removeItem("boAdminId");
    // localStorage.removeItem("email");
    // localStorage.removeItem("fullName");
    // localStorage.removeItem("position");
    // localStorage.removeItem("phoneNumber");
    // localStorage.removeItem("profileImage");
    // localStorage.removeItem("currentRole");
    // localStorage.removeItem("uid");
    // localStorage.removeItem("needle");
    // localStorage.removeItem("firstPageNumber");
    // localStorage.removeItem("filterOrigin");
    // localStorage.removeItem("editAdminId");
    // localStorage.removeItem("exchangeDate");
    // localStorage.removeItem("firstLogin");
    // var self = this;
    // self.$store.commit("userTransactions/setOrigin", "/login");
    window.location = "/login";
  },
  created() {},
  methods: {},
};
</script>
<style>
</style>
