<template>
  <div class="infoContainer overflow-y-auto" style="height: 28em">
    <div style="display: flex">
      <div class="headerInfo text-center" style="width: 100%">
        <h1>{{ officeInfo.officeTypeInfo.name }}</h1>
        <h2>
          {{ officeInfo.buildingInfo.name }} -
          {{ officeInfo.floorBuildingInfo.floor }}
        </h2>
      </div>
      <img
        :src="$store.getters.getIsFavorite ? '/ic_star_on.svg' : '/ic_star.svg'"
        width="35em"
        style="float: right; cursor: pointer"
        @click="changeFavorite(officeInfo.id)"
      />
    </div>
    <div class="bodyInfo">
      <v-row>
        <v-col cols="10" sm="5">
          <div class="ItemInfo">
            <h1>Descripci&oacute;n</h1>
            <p>
              {{ officeInfo.description }}
            </p>
          </div>
          <div class="ItemInfo">
            <h1>General</h1>
            <v-row>
              <v-col cols="12" sm="4">
                <div class="general text-center">
                  <div class="generalItems rounded-lg text-center">
                    <img src="/ic_people.svg" alt="" srcset="" />
                  </div>
                  <h1 class="mt-2">{{ officeInfo.maxCapacity }} max</h1>
                  <h2>Personas</h2>
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="general text-center">
                  <div class="generalItems rounded-lg text-center">
                    <img src="/ic_blueprint.svg" alt="" srcset="" />
                  </div>
                  <v-btn
                    color="#00A3A1"
                    class="rounded-xl mt-4 px-8"
                    style="font-size: 0.83em"
                    dark
                    @click="$store.commit('setSpaceReserve', 7)"
                  >
                    Plano
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="general text-center">
                  <div class="generalItems rounded-lg">
                    <img src="/ic_location.svg" alt="" srcset="" />
                  </div>
                  <v-btn
                    color="#00A3A1"
                    class="rounded-xl mt-4 px-"
                    style="font-size: 0.85em"
                    dark
                    @click="goToGoogleMap()"
                  >
                    Ir
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="ItemInfo">
            <h1>Reporta estado del espacio</h1>
            <v-row class="  ">
              <v-col cols="12" sm="4">
                <div class="general text-center">
                  <div class="generalItems rounded-lg text-center">
                    <img src="/ic_check_in.svg" alt="" srcset="" />
                  </div>
                  <h1 class="mt-2">{{ officeInfo.durationCheckIn }}</h1>
                  <h3>Check-in</h3>
                </div>
              </v-col>
              <v-col cols="12" sm="3">
                <div class="general text-center">
                  <div class="generalItems rounded-lg text-center">
                    <img src="/ic_check_out.svg" alt="" srcset="" />
                  </div>
                  <h1 class="mt-2">{{ officeInfo.durationCheckOut }}</h1>
                  <h3>Check-out</h3>
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="ItemInfo">
            <h1 class="mt-2" style="color: #001d38; font-size: 1.2em">
              Fecha y hora de reserva
            </h1>
            <div
              class="rounded-xl px-4 mt-3"
              style="width: 10rem; max-height: 7em; border: 1px solid #bcc7d5"
            >
              <v-row>
                <v-col cols="10" sm="1">
                  <v-icon size="0.5em" color="#00A3A1"
                    >fiber_manual_record</v-icon
                  >
                  <img
                    src="/ic_dash_line.svg"
                    width="4em"
                    style="margin-left: 0.1em; margin-top: -0.2em"
                  />
                  <v-icon size="0.5em" color="#005EB8" class="mt-n4"
                    >fiber_manual_record</v-icon
                  >
                </v-col>
                <v-col cols="10" sm="9" class="check-ent">
                  <h4 class="check-in">{{ $store.getters.getStartTime }}</h4>
                  <v-divider></v-divider>
                  <h4 class="check-out">{{ $store.getters.getEndTime }}</h4>
                  <div class="span-Date" cols="12">
                    <span
                      v-for="item in $store.getters.getDate"
                      :key="{ item }"
                    >
                      {{ item }}
                    </span>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>

          <v-row no-gutters class="mt-10">
            <v-btn
              color="#FD444F"
              class="px-10 rounded-lg mr-5 mb-3"
              style="text-transform: initial; font-family: sfProDisplayMedium"
              dark
              width="10rem"
              @click="
                () => {
                  $store.commit('setSelectFavorite', false);
                  $store.commit('setSpaceReserve', 5);
                }
              "
            >
              Cancelar
            </v-btn>
            <v-btn
              color="#00A3A1"
              class="px-8 rounded-lg"
              style="text-transform: initial; font-family: sfProDisplayMedium"
              dark
              width="10rem"
              @click="reservationOffice()"
            >
              Hacer reserva
            </v-btn>
          </v-row>
        </v-col>
        <v-col cols="10" sm="6">
          <div class="containerOfficeImg">
            <img
              :src="
                officeInfo.officeImages.length > 0
                  ? officeInfo.officeImages[0].image
                  : '' | DeleteUrl
              "
              class="rounded-xl"
            />
          </div>
          <div class="ItemInfo mt-14">
            <h1>Elementos disponibles</h1>
            <div>
              <v-row class="mt-3">
                <v-col
                  v-for="item in officeInfo.officeItems"
                  :key="item.id"
                  cols="10"
                  md="3"
                >
                  <div class="general text-center">
                    <div class="generalItems rounded-lg text-center">
                      <img
                        :src="item.systemItemIcons.imgPng | DeleteUrl"
                        width="30em"
                      />
                    </div>
                    <!-- <h1 class="mt-2">{{ officeInfo.maxCapacity }} max</h1> -->
                    <h2 style="font-size: 0.85em">{{ item.name }}</h2>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="ItemInfo">
            <h1 style="color: #001d38; font-size: 1.2em">Reservado para:</h1>
            <div
              style="
                margin-bottom: 1em;
                border: 1px solid #bcc7d5;
                max-width: 15em;
                max-height: 2.5em;
              "
              @click="overlay = true"
              class="rounded-lg mt-3"
            >
              <div style="display: flex; justify-content: space-between">
                <div style="max-width: 8em; min-width: 5em; margin-left: 0.5em">
                  <p style="margin-top: -0.5em; padding-left: 1em">
                    {{
                      $store.getters.getLeaderReserve.name != ""
                        ? $store.getters.getLeaderReserve.name
                        : "Seleccionar"
                    }}
                  </p>
                </div>
                <div>
                  <img src="/ic_arrowd_next.svg" />
                </div>
              </div>
            </div>
            <div
              elevation="0"
              style="
                margin-bottom: 1em;
                border: 1px solid #bcc7d5;
                max-width: 15em;
                overflow: hidden;
              "
              class="rounded-lg"
            >
              <v-row no-gutters>
                <div style="width: 5%; background-color: #005eb8"></div>
                <div class="reserveUser">
                  <h2>Reservado por</h2>
                  <h1>{{ $store.getters.getUser.fullName }}</h1>
                </div>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="overlay" persistent scrollable max-width="35em">
      <v-card class="rounded-xl">
        <div
          class="px-10 py-4"
          style="display: flex; justify-content: space-between"
        >
          <h1 style="font-size: 1em" class="my-auto">Seleccionar</h1>
          <img
            src="/ic_closed.svg"
            @click="overlay = false"
            width="35em"
            style="cursor: pointer"
          />
        </div>
        <v-divider class="mx-5"></v-divider>
        <div class="px-10 py-4">
          <v-text-field
            v-model="searchLeader"
            class="rounded-xl ml-7"
            style="font-size: 0.85em"
            label="Buscar Usuario"
            dense
            flat
            solo
          >
            <template v-slot:prepend>
              <img src="/ic_search.svg" width="20em" />
            </template>
          </v-text-field>
          <div class="overflow-y-auto px-7" style="height: 18em">
            <Select
              v-for="user in searchLeader != ''
                ? listUser.filter(user =>
                    user.name.toLowerCase().includes(searchLeader.toLowerCase())
                  )
                : listUser"
              :key="user.id"
              :data="user"
              v-model="$store.getters.getLeaderReserve"
              :mutation="'setLeaderReserve'"
            ></Select>
          </div>
          <div class="text-center mt-5">
            <v-btn
              color="#00A3A1"
              class="px-16 rounded-lg"
              style="text-transform: initial; font-family: sfProDisplayMedium"
              dark
              @click="overlay = false"
            >
              Aceptar
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="reserveDialog" persistent max-width="20em">
      <v-card class="rounded-xl pb-1">
        <div class="text-center py-5" style="background-color: #f4f6fc">
          <img src="/ic_excellent.svg" width="125em" />
        </div>
        <div class="excellentDialog">
          <h1>{{ success ? "Excelente" : "¡Error!" }}</h1>
          <p class="mx-auto">
            {{
              success
                ? "Ahora tienes una nueva reserva, puedes verificar tu correo."
                : "Se est&aacute;n presentando algunos inconvenientes con la red"
            }}
          </p>
        </div>
        <div class="text-center my-5">
          <v-btn
            color="#00A3A1"
            class="px-16 rounded-lg"
            style="text-transform: initial; font-family: sfProDisplayMedium"
            dark
            @click="
              success ? succesReservartionDialog() : (reserveDialog = false)
            "
          >
            Aceptar
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="loading" persistent width="100">
      <div style="width: 100%; height: 10em">
        <v-progress-circular
          color="#FFFFFF"
          indeterminate
          size="64"
        ></v-progress-circular>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchLeader: "",
      overlay: false,
      reserveDialog: false,
      loading: false,
      listUser: [],
      officeInfo: {
        name: "",
        buildingInfo: { name: "" },
        floorBuildingInfo: { floor: "" },
        maxCapacity: 0,
        officeImages: [{ image: "" }],
        officeTypeInfo: { name: "" }
      },
      success: false
    };
  },
  watch: {
    "$store.getters.getOffice.id": function() {
      this.getOfficeInfo();
    },
    "$store.getters.getTypeOffice": function() {
      this.getListUsers();
    }
  },
  mounted() {
    if (this.$store.getters.getOfficeInfo.name != "") this.getOfficeInfo();
    // this.getListUsers();
    console.log(this.$store.getters.getSuccesReservation);
  },
  methods: {
    getOfficeInfo() {
      this.$store
        .dispatch("getOfficeInfo")
        .then(res => {
          if (res.data.success) {
            this.officeInfo = res.data.body;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getListUsers() {
      this.$store
        .dispatch("getListUsers")
        .then(res => {
          if (res.data.success) {
            this.listUser = [];
            res.data.body.forEach(element => {
              this.listUser.push({
                id: element.uid,
                name: element.fullName,
                position: element.position
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    reservationOffice() {
      this.loading = true;
      this.$store.dispatch("reservationOffice").then(res => {
        console.log("res", res);
        if (res.body && res.body.code && res.body.code === 401) {
          this.loading = false;
          this.$breadstick.notify(
            ({ onClose }) => {
              return (
                <div class="toastCustom" style="width:70%" onClick={onClose}>
                  <v-row>
                    <v-col cols="6" sm="3">
                      <img src="/ic_alert.png" width="50em" />
                    </v-col>
                    <v-col cols="6" sm="8">
                      <h1>¡Algo sali&oacute; mal! </h1>
                      <p>{res.message}</p>
                    </v-col>
                  </v-row>
                </div>
              );
            },
            {
              position: "bottom-right",
              duration: 3000
            }
          );
        } else {
          this.loading = false;
          this.reserveDialog = true;
          this.success = res.success;
        }
      });
    },
    succesReservartionDialog() {
      this.$store.dispatch("resetForm");
      this.$router.push("/home/reservationResult");
    },
    async changeFavorite(id) {
      let res = await this.$store.dispatch("addOfficeToFavorites", id);
      this.getOfficeInfo();
      this.$breadstick.notify(
        ({ onClose }) => {
          return (
            <div class="toastCustomSuccess mr-10">
              <v-row>
                <v-col cols="6" sm="3">
                  <img src="/ic_success.svg" width="50em" />
                </v-col>
                <v-col cols="6" sm="9">
                  <h1>¡Excelente! </h1>
                  <p> {res}</p>
                </v-col>
              </v-row>
            </div>
          );
        },
        {
          position: "bottom-right",
          duration: 3000
        }
      );
    },
    goToGoogleMap() {
      let coordinates =
        this.officeInfo.buildingInfo.lat +
        "," +
        this.officeInfo.buildingInfo.long;
      console.log(coordinates);
      window.open("https://maps.google.com/?q=" + coordinates);
    }
  }
};
</script>
<style lang="scss">
.infoContainer {
  margin-left: -3em;
}
.bodyInfo {
  padding-left: 10%;
}
.headerInfo {
  h1 {
    color: #00338d;
    font-family: sfProDisplayBold;
    font-weight: bold;
  }
  h2 {
    margin-top: -0.5em;
    color: #0691da;
    font-family: sfProDisplayRegular;
  }
}
.ItemInfo {
  padding-top: 1em;
  h1 {
    color: #454545;
    font-display: sfProDisplayMedium;
    font-size: 1.5em;
  }
  p {
    padding-top: 1em;
    color: #656565;
    font-family: univers55Regular;
    font-size: 0.9em;
  }
}
.generalItems {
  background-color: #f4f6fc;
  margin-left: auto;
  margin-right: auto;
  width: 4em;
  height: 3.5em;
  img {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
}
.general {
  h1 {
    color: #656565;
    font-size: 1em;
    font-family: univers55Regular;
  }
  h2 {
    font-size: 1em;
    color: #005eb8;
    font-family: univers55Regular;
  }
  h3 {
    font-size: 0.95em;
    color: #00338d;
    font-family: univers55Regular;
  }

  .v-btn {
    max-width: 5em;
    font-size: 0.65em;
  }
}
.titleCardDate {
  margin-top: 0.7em;
  margin-bottom: -1em;
  color: #3a4151;
  font-family: sfProDisplayMedium;
  font-size: 0.9em;
  font-weight: normal;
}
.check-out {
  padding-top: 1em;
  color: #00338d;
  font-family: sfProDisplaySemiBold;
  font-size: 0.8em;
  font-weight: normal;
}
.check-in {
  padding-top: 0.3em;
  padding-bottom: 1em;
  color: #00338d;
  font-family: sfProDisplaySemiBold;
  font-size: 0.8em;
  font-weight: normal;
}
.containerOfficeImg {
  img {
    height: 17em;
    width: 100%;
    object-fit: cover;
  }
}
.planButton {
  span {
    font-size: 0.8em;
    font-family: univers55Regular;
    font-weight: bold;
    text-transform: initial;
  }
}
.reserveUser {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 1em;
  h1 {
    margin-bottom: -0.5em;
    color: #005eb8;
    font-size: 1em;
    font-family: sfProDisplayBold;
    font-weight: bold;
  }
  h2 {
    font-family: sfProDisplayRegular;
    font-size: 0.8em;
    color: #3a4151;
  }
}
.excellentDialog {
  text-align: center;
  h1 {
    color: #00338d;
    font-size: 1.7em;
    font-family: sfProDisplayBold;
    font-weight: bold;
  }
  p {
    max-width: 75%;
    color: #3a4151;
    font-size: 0.8em;
  }
}
.check-ent {
  position: relative;
}
.span-Date {
  max-height: 600px;
  min-width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10%;
  left: 140%;
  overflow-y: scroll;
  @media (max-width: 1082px) {
    display: none;
  }
}
</style>
