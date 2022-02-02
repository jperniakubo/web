<template>
  <div style="height: 25em" class="mx-5">
    <v-card class="centerHelpCenter">
      <img
        src="/ic_back.svg"
        class="backButton"
        @click="$router.go(-1)"
        alt="to back"
      />
      <h1 class="TitleCenterHelp ml-10">Contáctate con nosotros</h1>
      <p class="contactSubtitle">
        ¡Contáctanos para resolver tu duda!
        <!-- ¡Elige la opci&oacute;n que creas m&aacute;s correcta para resolver tu duda! -->
      </p>
      <v-card
        light
        elevation="3"
        class="itemsCenterHelp rounded-lg"
        style="margin-left: 2em; margin-right: 1.5em; height: 4em"
        max-width="20em"
      >
        <v-row>
          <v-col cols="12" sm="9">
            <p>Atenci&oacute;n telef&oacute;nica</p>
            <h2 class="subtitleContact">Linea de atenci&oacute;n</h2>
            <h2 class="subtitleContact" style="margin-top: -0.3em">
              3186787976
            </h2>
          </v-col>
          <v-col cols="12" sm="2">
            <img src="/ic_next-verde.svg" style="cursor: pointer" />
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "logged",
};
</script>

<style>
</style>
