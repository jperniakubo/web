<template>
  <div style="height: 25em" class="mx-5">
    <v-card class="centerHelpCenter">
      <img
        src="/ic_back.svg"
        class="backButton"
        @click="$router.go(-1)"
        alt="to back"
      />
      <h1 class="TitleCenterHelp ml">{{ question.question }}</h1>

      <p class="ml-2 mt-10" style="width: 25em">
        {{ question.answer }}
      </p>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "logged",
  data() {
    return {
      question: {},
    };
  },
  mounted() {
    this.question = JSON.parse(localStorage.getItem("questionInfo"));
  },
  middleware: [],
  methods: {},
  computed: {},
};
</script>
