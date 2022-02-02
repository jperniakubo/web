<template>
  <div>
    <div class="py-5">
      <h1 class="loginTitle" style="font-size: 1.5em">
        ¡Selecciona un servicio!
      </h1>
      <div class="mx-auto" style="width: 80%">
        <v-row>
          <v-col cols="10" sm="6">
            <div class="stylePapel slide-in-top">
              <div
                light
                elevation="3"
                class="servicesCard rounded-lg"
                style="margin-left: 2em; margin-right: 1.5em"
              >
                <img src="/ic_reserve_space.svg" class="mt-n1" width="70em" />
                <div style="width: 35%; text-align: left">
                  <h1 class="mt-3">Reservar espacio</h1>
                </div>
                <img
                  src="/ic_next-verde.svg"
                  @click="$router.push('/home/reserveSpace')"
                  class="mt-n2"
                  style="cursor: pointer"
                  width="25em"
                />
              </div>
            </div>
          </v-col>
          <v-col cols="10" sm="6">
            <div class="stylePapelDisable slide-in-top">
              <div
                elevation="3"
                class="servicesCard rounded-lg"
                style="margin-left: 2em; margin-right: 1.5em"
              >
                <img src="/ic_space_ideas.svg" class="mt-n1" width="70em" />
                <div style="width: 35%; text-align: left">
                  <h1 class="mt-3">Space Ideas</h1>
                </div>
                <img
                  src="/ic_next-verde.svg"
                  class="mt-n2"
                  width="25em"
                  style="cursor: pointer"
                  @click="soon = true"
                />
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" sm="6">
            <div class="stylePapelDisable slide-in-top">
              <div
                elevation="3"
                class="servicesCard rounded-lg"
                style="margin-left: 2em; margin-right: 1.5em"
              >
                <img src="/ic_car_pool.svg" class="mt-n1" width="70em" />
                <div style="width: 35%; text-align: left">
                  <h1 class="mt-3">Car Pool</h1>
                </div>
                <img
                  src="/ic_next-verde.svg"
                  class="mt-n2"
                  width="25em"
                  style="cursor: pointer"
                  @click="soon = true"
                />
              </div>
            </div>
          </v-col>
          <v-col cols="10" sm="6">
            <div class="stylePapelDisable slide-in-top">
              <div
                elevation="3"
                class="servicesCard foldtl rounded-lg"
                style="margin-left: 2em; margin-right: 1.5em"
              >
                <img src="/ic_business_card.svg" class="mt-n1" width="70em" />
                <div style="width: 35%; text-align: left">
                  <h1 class="mt-3">Business Card</h1>
                </div>
                <img
                  src="/ic_next-verde.svg"
                  class="mt-n2"
                  width="25em"
                  style="cursor: pointer"
                  @click="soon = true"
                />
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-dialog v-model="soon" persistent max-width="300">
      <v-card class="rounded-xl" height="20em">
        <div class="text-center" style="background-color: #f4f6fc">
          <img src="/ic_soon.svg" class="mt-5" width="120em" />
        </div>
        <v-divider></v-divider>
        <div class="text-center my-5">
          <h1 class="dialogTitle px-10">Pr&oacute;ximamente</h1>
          <p class="mx-5 my-5" style="color: #3a4151">
            Conocer&aacute;s la experiencia
            <strong>Space ideas, Car pool, Business card.</strong>
          </p>
        </div>

        <div class="text-center">
          <v-btn
            color="#00A3A1"
            class="rounded-lg px-16"
            style="
              font-size: 1em;
              font-family: sfProDisplayRegular;
              letter-spacing: -0.01em;
              border-radius: 12px;
            "
            large
            @click="soon = false"
            dark
            >Aceptar
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      soon: false,
    };
  },
  layout: "logged",
  mounted() {},
};
</script>

<style lang="scss">
.servicesCard {
  position: relative;
  overflow: hidden;
  padding-left: 2em;
  padding-top: 0.8em;
  margin-bottom: 1em;
  margin-left: 1em;
  height: 6.5em;
  display: flex;
  background-color: #ffffff;
  justify-content: space-around;
  box-shadow: 0px 8px 12px #00000014;
  h1 {
    margin: 0;
    padding-top: 0.9em;
    color: #454545;
    font-size: 1.2em;
  }
}
.stylePapel {
  width: 100%;
  position: relative;
}
%stylePapel:after {
  content: "";
  position: absolute;
  top: 0;
  right: 24px;
  border-width: 0 20px 20px 0;
  border-style: solid;
  border-bottom-left-radius: 7px 7px;
  border-color: #fff #f4f6fc #00a3a1 #000; /* color borde y pestaña */
}
.stylePapel:after {
  @extend %stylePapel;
}
.stylePapelDisable {
  position: relative;
}
.stylePapelDisable:after {
  @extend %stylePapel;
  border-color: #fff #f4f6fc #a0abbe #000;
}
</style>
