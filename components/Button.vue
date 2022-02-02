<template>
  <div
    class="rounded-lg buttonContainer"
    @click="
      () => {
        $store.commit('setSelectFavorite', false);
        click();
      }
    "
  >
    <div class="d-flex justify-space-be">
      <div class="ImgContent">
        <img :src="img" />
      </div>
      <div class="textContent">
        <p :class="value != '' ? 'labelWithValue' : 'label'">
          {{ label }}
        </p>
        <p v-if="value != ''" class="value" v-html="value"></p>
      </div>
      <div>
        <img src="/ic_arrowd_next.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      required: true,
    },
    label: {
      required: true,
      type: String,
    },
    value: {
      type: String,
      required: true,
    },
    click: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.label {
  color: #00a3a1;
  font-family: sfProDisplayMedium;
  font-size: 1rem;
  margin-top: 0.5em;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
.labelWithValue {
  color: #3a4151;
  margin-top: 0.2em;
  font-family: sfProDisplayMedium;
  font-size: 0.85rem;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
.value {
  color: #00a3a1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: -1.7em;
  font-family: sfProDisplayRegular;
  font-size: 0.8rem;
}
.textContent {
  width: 70%;
  margin-left: 0.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ImgContent {
  width: 3.2rem;
  height: 3.2rem;
  margin-top: -0.45rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.buttonContainer {
  margin-bottom: 1em;
  border: 1px solid #bcc7d5;
  max-width: 15rem;
  max-height: 2.3rem;
  box-shadow: 6px 6px 12px #93a7be30;
  overflow: hidden;
}
</style>
