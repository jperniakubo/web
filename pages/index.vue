<template>
  <div></div>
</template>

<script>
export default {
  layout: "login",
  middleware: ["noAuth","isAuth"],
  // mounted() {
  //   this.$router.push("/login");
  // },
};
</script>
