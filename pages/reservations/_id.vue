<template>
  <div class="divContainerViews mx-6 px-15 pb-16 mb-2">
    <v-row>
      <v-col cols="15" sm="6">
        <v-row>
          <img
            src="/ic_back.svg"
            class="backButton"
            @click="$router.go(-1)"
            alt="to back"
          />
          <v-col cols="10" sm="9">
            <v-card-title class="titleDetailReservation">
              {{ reservation.officeInfo.officeTypeInfo.name }}
            </v-card-title>
            <p class="subtitleDetailReservation">
              {{
                reservation.officeInfo.buildingInfo.name +
                " - " +
                reservation.officeInfo.floorBuildingInfo.floor
              }}
            </p>
          </v-col>
        </v-row>
        <div class="ml-15">
          <v-row>
            <v-col cols="10" sm="9">
              <p id="maintitleDetailReservation">Fecha y Hora de reserva</p>
            </v-col>
          </v-row>
          <v-row>
            <div
              style="
                height: auto;
                width: 15.5rem;
                box-shadow: 6px 6px 19px #93a7be30;
                border: 1px solid #bcc7d5;
              "
              class="rounded-lg"
            >
              <v-row style="margin-left: 1em">
                <v-col cols="10" sm="9">
                  <span id="SubtitleDateDetailReservation">
                    {{ formatDate(date) }}
                  </span>
                  <p style="padding: 0.5em" id="SubtitlePlaceDetailReservation">
                    {{ reservation.officeInfo.name }} -
                    {{ reservation.officeInfo.officeTypeInfo.name }}
                  </p>
                </v-col>
              </v-row>
              <div id="timeReservationCard" class="mt-n5">
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
                  <v-col cols="10" sm="9" class="px-1">
                    <div class="divitionBlack pb-3 pt-1" style="display: flex">
                      <p>{{ checkIn }}</p>
                      <img
                        src="/more.svg"
                        width="25em"
                        class="mt-2 moreTimeReservation"
                        style="cursor: pointer"
                        v-if="reservation.checkInIsDone == false"
                        @click="editDialog = true"
                      />
                    </div>
                    <div class="pt-3" style="display: flex">
                      <p>{{ checkOut }}</p>
                      <img
                        src="/more.svg"
                        width="25em"
                        class="mt-1 moreTimeReservation"
                        style="cursor: pointer"
                        v-if="reservation.checkInIsDone == false"
                        @click="editDialog = true"
                      />
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-row>

          <v-row>
            <v-col cols="10" sm="9">
              <p id="maintitleDetailReservation">Reserva</p>
            </v-col>
          </v-row>
          <div
            style="
              margin-bottom: 1em;
              border: 1px solid #bcc7d5;
              max-width: 15em;
              overflow: hidden;
            "
            class="rounded-lg ml-n2"
          >
            <v-row no-gutters>
              <div
                v-bind:class="
                  !reservation.checkInIsDone
                    ? 'borderCardLeader'
                    : 'borderCardLeaderCheckOut'
                "
              ></div>
              <div
                v-bind:class="
                  !reservation.checkInIsDone
                    ? 'reserveUser'
                    : 'reserveUserCheckOut'
                "
              >
                <h1>{{ leaderReservation.name }}</h1>
                <h2>Reservado para</h2>
              </div>
              <img
                src="/more.svg"
                width="15em"
                class="ml-auto mr-3"
                v-if="reservation.checkInIsDone == false"
                style="cursor: pointer"
                @click="overlay = true"
              />
            </v-row>
          </div>

          <v-row v-if="reservation.checkInIsDone == false">
            <v-col cols="10" sm="9">
              <v-row>
                <p id="maintitleDetailReservation">Como llegar</p>
                <v-col cols="2" sm="2">
                  <v-btn
                    class="buttonDestination"
                    rounded
                    color="#00A3A1"
                    align="right"
                    justify="space-around"
                    elevation="2"
                    @click="goToGoogleMap()"
                    >Ir</v-btn
                  >
                </v-col>
              </v-row>
              <v-row
                v-for="direction in reservation.officeInfo
                  .officeArrivalDirection"
                :key="direction.arrivalsDirId"
              >
                <v-col cols="8" sm="8">
                  <div class="destination-reservationPlaces">
                    <div class="gray-square rounded-sm mt-1"></div>
                    <span class="text">{{ direction.arrivalDescription }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <p
            id="maintitleDetailReservation"
            v-if="reservation.checkInIsDone == false"
          >
            Calendario
          </p>
          <div style="width: 100%" v-if="reservation.checkInIsDone == false">
            <p style="width: 20em">
              Recuerda agregar al calendario para que tus reservas se guarden
              autom&aacute;ticamente en tu telefono.
            </p>
            <div>
              <v-btn
                class="pr-10"
                rounded
                large
                color="#00A3A1"
                align="center"
                dark
                justify="space-around"
                elevation="2"
                @click="dowloadIcs()"
              >
                <img
                  src="/ic_calendar-2.svg"
                  alt=""
                  width="35em"
                  class="mr-5"
                />Reserva
              </v-btn>
            </div>
          </div>
          <div
            v-if="reservation.checkInIsDone == false"
            class="my-10 text-center d-flex"
            style="width: 80%"
          >
            <v-btn
              color="#BC204B"
              large
              elevation="1"
              dark
              class="rounded-lg mr-2 pr-10"
              @click="cancelReservationDialog = true"
            >
              <img src="/ic_cancel-2.svg" alt="" width="35em" class="mr-5" />
              Cancelar
            </v-btn>
            <v-btn
              color="#005EB8"
              large
              elevation="1"
              dark
              class="rounded-lg pr-10"
              @click="updateReservation()"
            >
              <img src="/ic_edit-2.svg" alt="" width="35em" class="mr-5" />
              Guardar
            </v-btn>
          </div>
          <!-- <div
            v-if="reservation.checkInIsDone == true"
            class="mt-16"
            style="width: 100%"
          >
            <v-btn
              color="#00A3A1"
              large
              elevation="1"
              dark
              class="rounded-lg px-16"
              @click="cancelReservationDialog = true"
            >
              Aceptar
            </v-btn>
          </div> -->
        </div>
      </v-col>

      <v-col cols="15" sm="3">
        <div style="width: 100%; display: flex" class="mt-10 mb-5">
          <v-spacer></v-spacer>
          <v-btn
            color="#1BA3A1"
            elevation="1"
            @click="doCheckIn()"
            light
            dark
            rounded
            v-if="reservation.checkInIsDone == false"
          >
            Check in
            <img class="ml-5 mr-n2" src="/ic_arrow-2.svg" alt="" srcset="" />
          </v-btn>
          <v-btn
            color="#BC204B"
            elevation="1"
            @click="doCheckOut()"
            light
            dark
            rounded
            v-if="
              reservation.checkOutIsDone == false &&
              reservation.checkInIsDone == true
            "
          >
            Check out
            <img
              class="ml-5 mr-n2"
              src="/ic_arrow-2-red.svg"
              style="transform: rotate(-180deg)"
              alt=""
              srcset=""
            />
          </v-btn>
        </div>
        <div>
          <h1
            style="color: #001d38; font-weight: 700; font-size: 1em"
            class="mb-5"
          >
            Espacio reservado
          </h1>
        </div>
        <div class="ReservationReserveResumen">
          <img
            class="rounded-xl"
            :src="
              reservation.officeInfo.officeImages.length > 0
                ? reservation.officeInfo.officeImages[0].imgOffice
                : '' | DeleteUrl
            "
          />
          <!-- <img
            class="rounded-xl"
            src="https://transferencia.tec.mx/wp-content/uploads/2020/09/home-office.jpeg"
          /> -->
          <div class="ReservationCard rounded-xl px-7">
            <h4>{{ reservation.officeInfo.floorBuildingInfo.floor }}</h4>
            <h2>{{ reservation.officeInfo.buildingInfo.name }}</h2>
            <h1>{{ leaderReservation.name }}</h1>
          </div>
        </div>
      </v-col>
    </v-row>
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
                ? listUser.filter((user) =>
                    user.name.toLowerCase().includes(searchLeader.toLowerCase())
                  )
                : listUser"
              :key="user.id"
              :data="user"
              v-model="leaderReservation"
              mutation=""
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
    <v-dialog v-model="cancelReservationDialog" persistent max-width="300">
      <v-card class="rounded-xl" height="20em">
        <div class="text-center" style="background-color: #f4f6fc">
          <img src="/ic_soon.svg" class="mt-5" width="120em" />
        </div>
        <v-divider></v-divider>
        <div class="text-center my-5">
          <h1 class="dialogTitle px-10">Cancelar</h1>
          <p class="mx-5 my-5" style="color: #3a4151">
            ¿Estás seguro de cancelar la reserva?
          </p>
        </div>

        <div class="text-center">
          <v-btn
            color="#BC204B"
            class="rounded-lg"
            style="
              font-size: 1em;
              font-family: sfProDisplayRegular;
              letter-spacing: -0.01em;
              border-radius: 12px;
            "
            large
            @click="cancelReservationDialog = false"
            dark
            >Cancelar
          </v-btn>
          <v-btn
            color="#005EB8"
            class="rounded-lg"
            style="
              font-size: 1em;
              font-family: sfProDisplayRegular;
              letter-spacing: -0.01em;
              border-radius: 12px;
            "
            large
            @click="cancelReservation()"
            dark
            >Aceptar
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="successDialog" persistent max-width="300">
      <v-card class="rounded-xl" height="20em">
        <div class="text-center" style="background-color: #f4f6fc">
          <img src="/ic_soon.svg" class="mt-5" width="120em" />
        </div>
        <v-divider></v-divider>
        <div class="text-center my-5">
          <h1 class="dialogTitle px-10">Reserva cancelada</h1>
          <p class="mx-15 my-5" style="color: #3a4151">
            ¡Su reserva ha sido cancelada con &eacute;xito!
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
            @click="$router.push('/reservations')"
            dark
            >Aceptar
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" persistent max-width="400">
      <v-stepper
        v-model="timePicker"
        style="background-color: transparent !important"
        class="elevation-0"
      >
        <v-stepper-items>
          <v-stepper-content step="2" style="margin: 0; padding: 0">
            <div class="titleTime">
              <v-icon color="rgb(2, 55, 137)">av_timer</v-icon>
              <p style="margin-top: 1em; color: rgb(2, 55, 137)">Hora inicio</p>
            </div>
            <div style="background-color: white" class="rounded-xl">
              <v-time-picker
                class="rounded-xl"
                ampm-in-title
                format="24hr"
                style="display: block"
                v-model="checkIn"
                :max="checkOut"
                :min="minHour"
                header-color="#023789"
              ></v-time-picker>
              <div
                class="mt-n10"
                style="
                  width: 100%;
                  display: flex;
                  justify-content: space-around;
                "
              >
                <v-btn
                  text
                  style="
                    margin: 2em;
                    color: #023789;
                    font-size: 1.2em;
                    font-family: sfProDisplaySemiBold;
                  "
                  @click="
                    () => {
                      timePicker = 1;
                    }
                  "
                >
                  Atras
                </v-btn>
                <v-btn
                  text
                  style="
                    margin: 2em;
                    color: #023789;
                    font-size: 1.2em;
                    font-family: sfProDisplaySemiBold;
                  "
                  @click="
                    () => {
                      if (checkIn != '') timePicker = 3;
                    }
                  "
                >
                  Siguiente
                </v-btn>
              </div>
            </div>
          </v-stepper-content>
          <v-stepper-content step="3" style="margin: 0; padding: 0">
            <div class="titleTime">
              <v-icon color="rgb(2, 55, 137)">av_timer</v-icon>
              <p style="margin-top: 1em; color: rgb(2, 55, 137)">
                Hora Finalizaci&oacute;n
              </p>
            </div>
            <div style="background-color: white" class="rounded-xl">
              <v-time-picker
                class="rounded-xl"
                ampm-in-title
                format="24hr"
                style="display: block"
                v-model="checkOut"
                :min="checkIn"
                header-color="#023789"
              ></v-time-picker>
              <div
                class="mt-n10"
                style="
                  width: 100%;
                  display: flex;
                  justify-content: space-around;
                "
              >
                <v-btn
                  text
                  style="
                    margin: 2em;
                    color: #023789;
                    font-size: 1.2em;
                    font-family: sfProDisplaySemiBold;
                  "
                  @click="timePicker = 2"
                  >Atras</v-btn
                >
                <v-btn
                  text
                  style="
                    margin: 2em;
                    color: #023789;
                    font-size: 1.2em;
                    font-family: sfProDisplaySemiBold;
                  "
                  @click="
                    () => {
                      if (checkOut != '') editDialog = false;
                    }
                  "
                  >Aceptar</v-btn
                >
              </div>
            </div>
          </v-stepper-content>
          <v-stepper-content step="1">
            <div class="titleTime">
              <v-icon color="rgb(2, 55, 137)">av_timer</v-icon>
              <p style="margin-top: 1em; color: rgb(2, 55, 137)">
                Fecha De reserva
              </p>
            </div>
            <div
              style="background-color: white"
              class="rounded-xl text-center pt-6"
            >
              <vc-date-picker
                v-model="date"
                :locale="{ masks: { weekdays: 'WW' } }"
                :min-date="new Date()"
                :model-config="modelConfig"
                class="mb-5"
              ></vc-date-picker>
              <div
                class="mt-n10"
                style="
                  width: 100%;
                  display: flex;
                  justify-content: space-around;
                "
              >
                <v-btn
                  text
                  style="
                    margin: 2em;
                    color: #023789;
                    font-size: 1.2em;
                    font-family: sfProDisplaySemiBold;
                  "
                  @click="editDialog = false"
                  >Cerrar</v-btn
                >
                <v-btn
                  text
                  style="
                    margin: 2em;
                    color: #023789;
                    font-size: 1.2em;
                    font-family: sfProDisplaySemiBold;
                  "
                  @click="
                    () => {
                      if (date != '') timePicker = 2;
                    }
                  "
                  >siguiente</v-btn
                >
              </div>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: "logged",
  data() {
    return {
      listUser: [],
      searchLeader: "",
      overlay: false,
      cancelReservationDialog: false,
      editDialog: false,
      successDialog: false,
      timePicker: 1,
      checkIn: "",
      checkOut: "",
      date: "",
      minHour: "",
      interval: null,
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
      reservationDate: "",
      reservation: {
        checkInIsDone: false,
        officeInfo: {
          floorBuildingInfo: {
            floor: "",
          },
          buildingInfo: { name: "" },
          officeTypeInfo: {
            id: 0,
          },
          officeTypeId: 0,
          officeImages: [{ imgOffice: "" }],
        },
      },
      leaderReservation: {},
    };
  },
  // destroyed() {
  //   clearInterval(this.interval);
  // },
  mounted() {
    // this.interval = setInterval(this.getAllReservations, 6000 * 5);
    this.getTime();
    if (
      this.$store.getters["reservations/getReservationById"](
        this.$route.params.id
      ) == undefined
    )
      this.getAllReservations();
    else {
      let reservation = this.$store.getters["reservations/getReservationById"](
        this.$route.params.id
      );
      this.leaderReservation = {
        id: reservation.leadReservationInfo.uid,
        name: reservation.leadReservationInfo.fullName,
      };
      this.reservation = reservation;
      this.checkIn = reservation.startTime;
      this.checkOut = reservation.endTime;
      this.date = reservation.date;
      this.getListUsers();
    }
  },
  watch: {
    date: function (value) {
      let date = new Date();
      let formatDate =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        "-" +
        date.getDate();
      if (value == formatDate) {
        let minutes = date.getMinutes() + parseInt(this.$store.getters.getTime);
        date.setMinutes(minutes);
        this.minHour = date.getHours() + ":" + date.getMinutes();
      } else this.minHour = "";
    },
  },
  methods: {
    getTime() {
      this.$store.dispatch("getTime").catch((err) => {
        console.log(err);
      });
    },
    getAllReservations() {
      this.$store
        .dispatch("reservations/getAllReservations", "")
        .then((res) => {
          let reservation = res.body.find(
            (reservation) => reservation.id == this.$route.params.id
          );
          this.leaderReservation = {
            id: reservation.leadReservationInfo.uid,
            name: reservation.leadReservationInfo.fullName,
          };
          this.checkIn = reservation.startTime;
          this.checkOut = reservation.endTime;
          this.date = reservation.date;
          this.reservation = reservation;
          this.getListUsers();
          if (!res.success)
            this.$breadstick.notify(
              ({ onClose }) => {
                return (
                  <div class="toastCustom" onClick={onClose}>
                    <div>
                      <img src="/ic_alert.png" class="mr-15" width="50em" />
                    </div>
                    <div>
                      <h1>¡Algo sali&oacute; mal! </h1>
                      <p>Error Al cargar tus Reservas</p>
                    </div>
                  </div>
                );
              },
              {
                position: "bottom-right",
                duration: 3000,
              }
            );
        });
    },
    formatDate(date) {
      let newDate = new Date(date);
      let dateFormat = newDate
        .toLocaleDateString("es-ES", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .split(" ");
      return (
        dateFormat[2] +
        " " +
        (parseInt(dateFormat[0]) + 1) +
        ", " +
        dateFormat[4]
      );
    },
    getListUsers() {
      this.$store
        .dispatch("getListUsers", this.reservation.officeInfo.officeTypeId, {
          root: true,
        })
        .then((res) => {
          if (res.data.success) {
            this.listUser = [];
            res.data.body.forEach((element) => {
              this.listUser.push({
                id: element.uid,
                name: element.fullName,
                position: element.position,
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async cancelReservation() {
      let res = await this.$store.dispatch(
        "reservations/cancelReservation",
        this.reservation.id
      );
      if (res.success) {
        this.cancelReservationDialog = false;
        this.successDialog = true;
      }
    },
    doCheckIn() {
      // this.$router.push("/reservations/checkin/" + this.reservation.id);
      if (this.reservation.isAllowedCheckIn)
        this.$router.push("/reservations/checkin/" + this.reservation.id);
      else
        this.$breadstick.notify(
          ({ onClose }) => {
            return (
              <div class="toastCustom" style="width:70%" onClick={onClose}>
                <v-row>
                  <v-col cols="6" sm="4">
                    <img src="/ic_alert.png" width="50em" />
                  </v-col>
                  <v-col cols="6" sm="8">
                    <h1>¡Algo sali&oacute; mal! </h1>
                    <p>Aun NO puedes Hacer check In</p>
                  </v-col>
                </v-row>
              </div>
            );
          },
          {
            position: "bottom-right",
            duration: 3000,
          }
        );
    },
    doCheckOut() {
      // this.$router.push("/reservations/checkout/" + this.reservation.id);

      if (this.reservation.isAllowedCheckOut)
        this.$router.push("/reservations/checkout/" + this.reservation.id);
      else
        this.$breadstick.notify(
          ({ onClose }) => {
            return (
              <div class="toastCustom" style="width:70%" onClick={onClose}>
                <v-row>
                  <v-col cols="6" sm="4">
                    <img src="/ic_alert.png" width="50em" />
                  </v-col>
                  <v-col cols="6" sm="8">
                    <h1>¡Algo sali&oacute; mal! </h1>
                    <p>Aun NO puedes Hacer check Out</p>
                  </v-col>
                </v-row>
              </div>
            );
          },
          {
            position: "bottom-right",
            duration: 3000,
          }
        );
    },
    async updateReservation() {
      let res = await this.$store.dispatch("reservations/updateReservation", {
        reservationId: this.reservation.id,
        date: this.date,
        startTime: this.checkIn,
        endTime: this.checkOut,
        leadReservationUid: this.leaderReservation.id,
        officeId: this.reservation.officeInfo.id,
      });
      this.getAllReservations();
      if (res.success) {
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
                    <p> {res.message}</p>
                  </v-col>
                </v-row>
              </div>
            );
          },
          {
            position: "bottom-right",
            duration: 3000,
          }
        );
      } else
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
            duration: 3000,
          }
        );
    },
    goToGoogleMap() {
      let coordinates =
        this.reservation.officeInfo.buildingInfo.lat +
        "," +
        this.reservation.officeInfo.buildingInfo.long;
      console.log(coordinates);
      window.open("https://maps.google.com/?q=" + coordinates);
    },
    dowloadIcs() {
      this.$ics.removeAllEvents();
      console.log(this.reservation.startTime);

      let startTime = ""
      if(this.reservation.startTime && this.reservation.startTime.length < 5){
        startTime = `0${this.reservation.startTime}`
      }
      this.$ics.addEvent(
        "es",
        "Reserva de " + this.reservation.officeInfo.officeTypeInfo.name,
        `${this.reservation.officeInfo.name}  ${this.reservation.officeInfo.buildingInfo.description}  ${this.reservation.officeInfo.floorBuildingInfo.floor}  ${this.reservation.officeInfo.description}`,
        this.reservation.officeInfo.buildingInfo.address,
        this.reservation.date + " " + startTime,
        this.reservation.date + " " + this.reservation.endTime,
        "http://www.kpmg.com/co",
        {
          name: "KPMG One Key",
          email: "",
        },
        null
      );
      this.$ics.download(
        "Reservacion " +
          this.reservation.officeInfo.name +
          " " +
          this.reservation.date
      );
    },
  },
};
</script>
<style lang="scss">
.ReservationReserveResumen {
  img {
    width: 20.5rem;
    height: 8em;
    object-fit: cover;
  }
  .ReservationCard {
    background-color: #ffffff;
    position: relative;
    top: -3em;
    left: 2.5%;
    width: 20rem;
    height: auto;
    border: 1px solid #bcc7d5;
    box-shadow: 6px 6px 19px #93a7be30;
    padding: 1em;
    h4 {
      margin: 0;
      padding-top: 0.1em;
      color: #005eb8;
      font-size: 0.95em;
      font-family: sfProDisplaySemiBold;
    }
    h2 {
      margin: 0;
      color: #001d38;
      font-size: 0.95em;
      font-family: sfProDisplaySemiBold;
    }
    h1 {
      margin: 0;
      color: #3a4151;
      font-size: 1em;
      font-family: sfProDisplayBold;
      font-weight: bold;
    }
  }
}

%reserveStyle {
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
.reserveUser {
  @extend %reserveStyle;
}
.reserveUserCheckOut {
  @extend %reserveStyle;
  h1 {
    color: #00a3a1;
  }
}
%borderCardLeaderStyle {
  width: 5%;
}
.borderCardLeader {
  @extend %borderCardLeaderStyle;
  background-color: #005eb8;
}
.borderCardLeaderCheckOut {
  @extend %borderCardLeaderStyle;
  background-color: #00a3a1;
}
</style>
