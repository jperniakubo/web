<template>
  <v-app style="background-image: url('/ic_background.png')">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="7"
          md="6"
          class="d-flex justify-center align-center"
        >
          <div class="logoLogin slide-in-top">
            <img src="/ic_logo.png" />
          </div>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center align-center">
          <div
            class="loginCard bounce-in-fwd rounded-xl"
            style="background-color: #ffffff"
          >
            <v-main style="padding: 1.65em">
              <nuxt />
            </v-main>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  middleware: "noAuth",
  data() {
    return {};
  },
  mounted() {
    this.$store
      .dispatch("generateAcsTkn")
      .then((res) => {
        localStorage.setItem("acstkn", res.body.accessToken);
      })
      .catch((err) => {});
  },
};
</script>

