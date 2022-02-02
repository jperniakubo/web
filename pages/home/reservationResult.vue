<template>
  <div class="divContainerViews px-16 mx-5 py-5">
    <div style="width: 60%">
      <div>
        <h1 class="titleReservation">Fecha y hora de reserva</h1>
        <div class="rounded-lg px-5 py-2 mt-3 cardReservationDateTime">
          <h1>{{ $store.getters.getSuccesReservation.date }}</h1>
          <p>
            {{ $store.getters.getSuccesReservation.officeInfo.name }} -
            {{
              $store.getters.getSuccesReservation.officeInfo.officeTypeInfo.name
            }}
          </p>
          <v-row>
            <v-col cols="10" sm="1">
              <v-icon size="1em" color="#00A3A1">fiber_manual_record</v-icon>
              <img
                src="/ic_dash_line.svg"
                width="5em"
                style="margin-left: 0.4em; margin-top: -0.2em"
              />
              <v-icon size="1em" color="#005EB8" class="mt-n4"
                >fiber_manual_record</v-icon
              >
            </v-col>
            <v-col cols="10" sm="9">
              <h4 class="timeFont pb-3 pt-1">
                {{ $store.getters.getSuccesReservation.startTime }}
              </h4>
              <v-divider></v-divider>
              <h4 class="timeFont pt-4">
                {{ $store.getters.getSuccesReservation.endTime }}
              </h4>
            </v-col>
          </v-row>
        </div>
      </div>
      <div>
        <h1 class="titleReservation">Espacio reservado</h1>
        <div class="spaceReserveResumen">
          <img
            class="rounded-xl"
            :src="
              $store.getters.getSuccesReservation.officeInfo.officeImages
                .length > 0
                ? $store.getters.getSuccesReservation.officeInfo.officeImages[0]
                    .image
                : '' | DeleteUrl
            "
          />
          <div class="card rounded-xl px-7">
            <h4>
              {{
                $store.getters.getSuccesReservation.officeInfo.floorBuildingInfo
                  .floor
              }}
            </h4>
            <h2>
              {{
                $store.getters.getSuccesReservation.officeInfo.buildingInfo.name
              }}
            </h2>
            <h2>Reservado para</h2>
            <h1>
              {{
                $store.getters.getSuccesReservation.leadReservationInfo.fullName
              }}
            </h1>
          </div>
        </div>
      </div>
      <div class="my-5 mt-n3" style="width: 35%; margin-left: 2.5%">
        <v-btn
          color="#00A3A1"
          class="px-16 rounded-lg"
          style="text-transform: initial; font-family: sfProDisplayMedium"
          dark
          @click="$router.push('/home')"
        >
          Aceptar
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "logged",
};
</script>

<style lang="scss" >
.titleReservation {
  color: #001d38;
  font-size: 1.5em;
  font-family: sfProDisplaySemiBold;
}
.cardReservationDateTime {
  width: 40%;
  height: auto;
  border: 1px solid #bcc7d5;
  box-shadow: 6px 6px 19px #93a7be30;
  h1 {
    margin: 0;
    color: #3a4151;
    font-size: 1em;
    font-family: sfProDisplayMedium;
  }
  p {
    margin: 0;
    color: #00a3a1;
    font-size: 0.8em;
    font-family: sfProDisplayMedium;
  }
  .row {
    .col-10 {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
}
.spaceReserveResumen {
  img {
    width: 24rem;
    height: 15rem;
    object-fit: cover;
  }
  .card {
    background-color: #ffffff;
    position: relative;
    top: -5em;
    left: 2.5%;
    width: 20rem;
    height: auto;
    border: 1px solid #bcc7d5;
    box-shadow: 6px 6px 19px #93a7be30;
    padding: 1em;
    h4 {
      margin: 0;
      padding-top: 1em;
      color: #001d38;
      font-size: 1em;
      font-family: sfProDisplaySemiBold;
    }
    h2 {
      margin: 0;
      color: #001d38;
      font-size: 1.2em;
      font-family: sfProDisplaySemiBold;
    }
    h1 {
      padding-top: 0.5em;
      margin: 0;
      color: #005eb8;
      font-size: 1.5em;
      font-family: sfProDisplayBold;
      font-weight: bold;
    }
  }
}
.timeFont {
  margin: 0;
  color: #00338d;
  font-size: 1em;
  font-family: sfProDisplaySemiBold;
}
</style>
