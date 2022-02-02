<template>
  <div style="height: 25em">
    <img
      src="/ic_back.svg"
      class="backButton"
      @click="$router.go(-1)"
      alt="to back"
    />
    <h1 class="TitleCenterHelp ml-10">{{ question.question }}</h1>
    <v-card light elevation="3" class="itemsCenterHelp" style="height: 15em">
      <v-card-text>
        {{ question.answer }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      question: {},
    };
  },
  mounted() {
    this.question = JSON.parse(localStorage.getItem("questionInfo"));
  },
  methods: {},
  computed: {},
};
</script>
