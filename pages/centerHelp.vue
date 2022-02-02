<template>
  <div style="padding-right: 1em">
    <img
      src="/ic_back.svg"
      @click="$router.go(-1)"
      class="backButton"
      alt="to back"
    />
    <h1 class="TitleCenterHelp ml-10">Centro de ayuda</h1>
    <v-card
      v-for="item in centerHelpItems"
      light
      elevation="3"
      class="itemsCenterHelp rounded-lg"
      :key="item.text"
    >
      <v-row>
        <v-col cols="11" sm="10">
          <p>{{ item.question.question }}</p>
        </v-col>
        <v-col cols="11" sm="1">
          <img
            src="/ic_next-verde.svg"
            style="cursor: pointer"
            :alt="item.route"
            @click="goTo(item.route, item.question)"
          />
        </v-col>
      </v-row>
    </v-card>
    <div class="text-center">
      <v-btn
        color="#00a3a1"
        class="rounded-lg"
        style="font-size: 0.76em"
        large
        @click="goTo('/contact')"
        dark
        >Contáctate con nosotros
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      acsTkn: "",
      centerHelpItems: [{ question: {} }],
    };
  },
  created() {
    this.$store
      .dispatch("generateAcsTkn")
      .then((res) => {
        this.acsTkn = res.body.accessToken;
        localStorage.setItem("acstkn", res.body.accessToken);
        this.getAllQuestions();
      })
      .catch((err) => {});
  },
  mounted() {
    this.getAllQuestions();
  },
  methods: {
    goTo(route, question) {
      localStorage.setItem("questionInfo", JSON.stringify(question));
      this.$router.push(route);
    },
    getAllQuestions() {
      let body = {
        limit: 10,
        offset: 0,
      };
      this.$store
        .dispatch("getAllQuestions", { acsTkn: this.acsTkn, body })
        .then((res) => {
          this.centerHelpItems = [];
          res.data.body.forEach((element) => {
            this.centerHelpItems.push({
              route: "/detailsQuestions",
              question: element,
            });
          });
        })
        .catch((err) => {});
    },
  },
  computed: {},
};
</script>
