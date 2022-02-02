<template>
  <div
    :class="
      data.position != null
        ? value.id == data.id
          ? 'select-item-active-with-position'
          : 'select-item-with-position'
        : value.id == data.id
        ? 'select-item-active'
        : 'select-item'
    "
    v-on:click="clickSelect()"
  >
    <div>
      <p class="titleSelectComponent">{{ data.name }}</p>
      <p class="subTitleSelectComponent">{{ data.position }}</p>
    </div>
    <img
      :src="value.id == data.id ? '/ic_check.svg' : '/ic_check2.svg'"
      width="20em"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    mutation: {
      type: String,
      required: true,
    },
  },
  methods: {
    clickSelect() {
      if (this.mutation != "")
        this.$store.commit(this.mutation, {
          name: this.data.name,
          id: this.data.id,
        });
      else
      this.$emit("input", {
        name: this.data.name,
        id: this.data.id,
      });
    },
  },
};
</script>

<style lang="scss">
.select-item {
  border-radius: 1em;
  padding: 0.5em;
  padding-left: 2em;
  padding-right: 2em;
  border: 2px solid #bcc7d5;
  margin-block-end: 1em;
  display: flex;
  justify-content: space-between;
  p {
    color: #00338d;
    font-family: sfProDisplaySemiBold;
    padding: 0;
    margin: 0;
  }
}
.select-item-with-position {
  border-radius: 1em;
  padding: 0.5em;
  padding-left: 2em;
  padding-right: 2em;
  border: 2px solid #bcc7d5;
  margin-block-end: 1em;
  display: flex;
  justify-content: space-between;
  .subTitleSelectComponent {
    color: #3a4151;
    font-size: 0.8em;
    font-family: sfProDisplayRegular;
    padding: 0;
    margin: 0;
  }
  .titleSelectComponent {
    color: #023789;
    font-size: 1em;
    font-family: sfProDisplayMedium;
    padding: 0;
    margin: 0;
  }
}
.select-item-active {
  border-radius: 1em;
  padding: 0.5em;
  padding-left: 2em;
  padding-right: 2em;
  border: 2px solid #00a3a1;
  margin-block-end: 1em;
  display: flex;
  justify-content: space-between;
  p {
    color: #00a3a1;
    font-family: sfProDisplaySemiBold;
    padding: 0;
    margin: 0;
  }
}
.select-item-active-with-position {
  border-radius: 1em;
  padding: 0.5em;
  padding-left: 2em;
  padding-right: 2em;
  border: 2px solid #00a3a1;
  margin-block-end: 1em;
  display: flex;
  justify-content: space-between;
  .subTitleSelectComponent {
    color: #3a4151;
    font-size: 0.8em;
    font-family: sfProDisplaySemiBold;
    padding: 0;
    margin: 0;
  }
  .titleSelectComponent {
    color: #00a3a1;
    font-size: 1em;
    font-family: sfProDisplayMedium;
    padding: 0;
    margin: 0;
  }
}
</style>
