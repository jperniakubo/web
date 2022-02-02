<template>
  <div class="oficce-card" @click="clickSelect()">
    <img :src="officeInfo.image" class="img-card rounded-xl" />
    <img src="/ic_next.svg" class="nextButton" />
    <h1 class="titleOffice">{{ officeInfo.name }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    officeInfo: {
      type: Object,
      required: true,
    },
    clickProps: {
      type: Function,
    },
  },
  methods: {
    clickSelect() {
      this.clickProps();
      this.$store.commit("setTypeOffice", {
        name: this.officeInfo.name,
        id: this.officeInfo.id,
      });
    },
  },
};
</script>

<style>
.img-card {
  object-fit: cover;
  width: 345px;
  height: 128px;
}
.nextButton {
  position: relative;
  top: -5em;
  left: 18em;
}
.titleOffice {
  margin: 0;
  padding: 0;
  font-size: 1em;
  margin-top: -2em;
  color: #005eb8;
  font-family: sfProDisplaySemiBold;
}
</style>
