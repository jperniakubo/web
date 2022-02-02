<template>
  <div class="divContainerViews mx-4">
    <v-card class="centerHelpCenter">
      <v-card-title>Hola {{ userName }}:</v-card-title>
      <v-card-subtitle class="subtitle">
        Algunas preguntas frecuentes para facilitar tu b&uacute;squeda
      </v-card-subtitle>
      <v-row>
        <v-col v-for="(item, i) in centerHelpItems" :key="i" cols="12" sm="4">
          <v-card light elevation="3" class="itemsCenterHelp rounded-lg">
            <v-row>
              <v-col cols="10" sm="9">
                <p style="font-size: 0.8em">{{ item.question.question }}</p>
              </v-col>
              <v-col cols="10" sm="1">
                <img
                  src="/ic_next-verde.svg"
                  width="25em"
                  class="mt-1"
                  style="cursor: pointer"
                  @click="goTo(item.route, item.question)"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <div class="float-right">
        <v-btn
          color="#00A3A1"
          class="px-16 rounded-lg"
          @click="$router.push('helpCenter/contact')"
          dark
        >
          Contáctate con nosotros
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "logged",
  data() {
    return {
      acsTkn: "",
      centerHelpItems: [{ question: {} }],
      userName: this.$store.state.user.fullName,
    };
  },
  mounted() {
    this.getAllQuestions();
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
              route: "helpCenter/detailQuestion",
              question: element,
            });
          });
        })
        .catch((err) => {});
    },
  },
};
</script>
