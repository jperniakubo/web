<template>
  <div class="divContainerViews pl-10 mx-4 mb-3">
    <v-row>
      <v-col cols="12" sm="3" class="pt-10">
        <p class="titleReserve">
          ¿Cu&aacute;ndo ser&aacute; la reuni&oacute;n?
        </p>
        <Button
          label="Fecha"
          img="/ic_date.svg"
          :click="() => (spaceReserve = 1)"
          :value="
            date && date[0] != 'null'
              ? date.map(
                  res =>
                    res +
                    (isAllDay
                      ? ' / ' + 'Todo el d&iacute;a'
                      : checkIn != '' && checkOut != ''
                      ? ' / ' + checkIn + ' - ' + checkOut
                      : '')
                )
              : ''
          "
        >
        </Button>
        <p
          class="titleReserve"
          style="margin-top: 1.5em"
          v-if="
            $store.getters.getDate != '' &&
              $store.getters.getStartTime != '' &&
              $store.getters.getEndTime != '' &&
              spaceReserve > 1 &&
              spaceReserve != 8
          "
        >
          ¿D&oacute;nde ser&iacute;a la reuni&oacute;n?
        </p>
        <Button
          v-if="
            $store.getters.getDate != '' &&
              $store.getters.getStartTime != '' &&
              $store.getters.getEndTime != '' &&
              spaceReserve > 1 &&
              spaceReserve != 8
          "
          label="Ciudad"
          :click="() => (spaceReserve = 2)"
          :value="$store.getters.getCity.name"
          img="/ic_city.svg"
        ></Button>
        <Button
          v-if="spaceReserve > 2 && spaceReserve != 8"
          label="Edificio"
          :click="() => (spaceReserve = 3)"
          :value="$store.getters.getBuilding.name"
          img="/ic_building.svg"
        ></Button>
        <Button
          v-if="spaceReserve > 3 && spaceReserve != 8"
          label="Tipo Oficina"
          :click="() => (spaceReserve = 4)"
          :value="$store.getters.getTypeOffice.name"
          img="/ic_office_type.svg"
        ></Button>
        <p class="titleReserve" style="margin-top: 1.5em">
          Reserva tus favoritos
        </p>
        <Button
          label="Favoritos"
          :click="
            () => {
              spaceReserve = 8;
            }
          "
          :value="''"
          img="/ic_favorite.svg"
        >
        </Button>
      </v-col>
      <v-divider vertical></v-divider>
      <v-stepper v-model="spaceReserve" style="width: 74%" class="elevation-0">
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12" class="text-center" md="5">
                <p class="titleHomeItems">Fechas disponibles</p>
                <vc-date-picker
                  v-if="!user.typePositionsId || user.typePositionsId == 1"
                  style="width: 100%"
                  v-model="date"
                  :attributes="attributesOne"
                  :locale="{ masks: { weekdays: 'WW' } }"
                  :min-date="new Date()"
                ></vc-date-picker>
                <vc-date-picker
                  v-else-if="
                    user.typePositionsId == 2 || user.typePositionsId == 3
                  "
                  style="width: 100%"
                  :attributes="attributes"
                  @dayclick="onDayClick"
                  :available-dates="{ start: new Date(), end: null }"
                  :model-config="modelConfig"
                ></vc-date-picker>
                <div class="text-center">
                  <v-btn
                    v-if="
                      $store.getters.getDate != '' &&
                        $store.getters.getStartTime != '' &&
                        $store.getters.getEndTime != ''
                    "
                    color="#00A3A1"
                    class="px-16 mt-10 rounded-lg"
                    style="
                      text-transform: initial;
                      font-family: sfProDisplayMedium;
                    "
                    dark
                    @click="verifyReservationTime()"
                  >
                    Aceptar
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="5">
                <div style="display: flex">
                  <v-btn
                    rounded
                    :color="isAllDay ? '#00A3A1' : '#BCC7D5'"
                    class="mr-3"
                    style="text-transform: initial"
                    @click="
                      () => {
                        isAllDay = !isAllDay;
                      }
                    "
                    dark
                  >
                    <img
                      v-if="isAllDay"
                      src="/check.svg"
                      width="15em"
                      class="mr-2"
                    />
                    Todo el d&iacute;a
                  </v-btn>
                  <v-dialog
                    class="elevation-0"
                    transition="dialog-bottom-transition"
                    max-width="400"
                    persistent
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        rounded
                        style="
                          text-transform: initial;
                          font-family: sfProDisplayMedium;
                        "
                        :color="isAllDay == false ? '#00A3A1' : '#BCC7D5'"
                        @click="
                          () => {
                            isAllDay = false;
                            timePicker = 1;
                            inprimir();
                          }
                        "
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        <img
                          v-if="isAllDay == false"
                          src="/check.svg"
                          width="15em"
                          class="mr-2"
                        />
                        Hora Inicio/Fin
                      </v-btn>
                    </template>
                    <template v-slot:default="dialog">
                      <v-stepper
                        v-model="timePicker"
                        style="background-color: transparent !important"
                        class="elevation-0"
                      >
                        <v-stepper-items>
                          <v-stepper-content
                            step="1"
                            style="margin: 0; padding: 0"
                          >
                            <div class="titleTime">
                              <v-icon color="rgb(2, 55, 137)">av_timer</v-icon>
                              <p
                                style="margin-top: 1em; color: rgb(2, 55, 137)"
                              >
                                Hora inicio
                              </p>
                            </div>
                            <div
                              style="background-color: white"
                              class="rounded-xl"
                            >
                              <v-time-picker
                                class="rounded-xl"
                                ampm-in-title
                                format="24hr"
                                style="display: block"
                                v-model="checkIn"
                                :min="minHour"
                                :max="checkOut"
                                header-color="#023789"
                                ref="inicio"
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
                                      dialog.value = false;
                                      isAllDay = null;
                                    }
                                  "
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
                                      if ($store.getters.getStartTime != '')
                                        timePicker = 2;
                                    }
                                  "
                                  >Siguiente</v-btn
                                >
                              </div>
                            </div>
                          </v-stepper-content>
                          <v-stepper-content
                            step="2"
                            style="margin: 0; padding: 0"
                          >
                            <div class="titleTime">
                              <v-icon color="rgb(2, 55, 137)">av_timer</v-icon>
                              <p
                                style="margin-top: 1em; color: rgb(2, 55, 137)"
                              >
                                Hora Finalizaci&oacute;n
                              </p>
                            </div>
                            <div
                              style="background-color: white"
                              class="rounded-xl"
                            >
                              <!-- :min="getMinHour(checkIn)" -->
                              <v-time-picker
                                ref="fin"
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
                                  @click="timePicker = 1"
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
                                      if ($store.getters.getEndTime != '')
                                        dialog.value = false;
                                    }
                                  "
                                  >Aceptar</v-btn
                                >
                              </div>
                            </div>
                          </v-stepper-content>
                        </v-stepper-items>
                      </v-stepper>
                    </template>
                  </v-dialog>
                </div>
                <v-card
                  v-if="isAllDay"
                  class="mt-10 rounded-xl px-5 pt-3"
                  style="width: 70%; border: 1px solid #bcc7d5"
                >
                  <p class="titleCardHour">Horario de reserva</p>
                  <p class="subtitleCardHour">
                    <v-icon size="0.5em" color="#00A3A1" class="mr-3"
                      >fiber_manual_record</v-icon
                    >
                    Todo el d&iacute;a
                  </p>
                </v-card>
                <div
                  v-if="isAllDay == false"
                  class="rounded-xl px-4 mt-3"
                  style="width: 50%; max-height: 7em; border: 1px solid #bcc7d5"
                >
                  <!-- <h4 class="titleCardDate">{{ $store.getters.getDate }}</h4> -->
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
                    <v-col cols="10" sm="9">
                      <h4 class="check-in">
                        {{ $store.getters.getStartTime }}
                      </h4>
                      <v-divider></v-divider>
                      <h4 class="check-out">{{ $store.getters.getEndTime }}</h4>
                    </v-col>
                  </v-row>
                </div>
                <div
                  class="px-4 mt-2 grey--text"
                  style="width: 100%; height: 300px; overflow: scroll; "
                >
                  <!-- <h4 class="titleCardDate">{{ $store.getters.getDate }}</h4> -->
                  <v-row>
                    <v-col
                      cols="10"
                      sm="9"
                      v-for="item in $store.getters.getDate"
                      :key="item"
                    >
                      {{ item }}
                      <v-divider></v-divider>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-stepper-content>
          <v-stepper-content step="2">
            <div style="width: 20em">
              <h1 class="titleCity">Selecciona una ciudad</h1>
              <Select
                v-for="cityItem in citys"
                :key="cityItem.id"
                :data="cityItem"
                v-model="$store.getters.getCity"
                mutation="setCity"
              ></Select>
              <div class="text-center">
                <v-btn
                  v-if="$store.getters.getCity.id != null"
                  color="#00A3A1"
                  class="px-16 rounded-lg"
                  style="
                    text-transform: initial;
                    font-family: sfProDisplayMedium;
                  "
                  dark
                  @click="
                    () => {
                      if ($store.getters.getCity.id != null) spaceReserve = 3;
                    }
                  "
                >
                  Aceptar
                </v-btn>
              </div>
            </div>
          </v-stepper-content>
          <v-stepper-content step="3">
            <div style="width: 20em">
              <h1 class="titleCity">Edificio</h1>
              <v-text-field
                v-model="searchBuilding"
                class="rounded-xl ml-1 searchInput"
                label="Buscar edificio"
                dense
                solo
              >
                <template v-slot:prepend-inner>
                  <img src="/ic_search.svg" width="20em" />
                </template>
              </v-text-field>
              <Select
                v-for="buildingItem in searchBuilding != ''
                  ? buildings.filter(building =>
                      building.name
                        .toLowerCase()
                        .includes(searchBuilding.toLowerCase())
                    )
                  : buildings"
                :key="buildingItem.id"
                :data="buildingItem"
                v-model="$store.getters.getBuilding"
                :mutation="'setBuilding'"
              ></Select>
              <div class="text-center">
                <v-btn
                  v-if="$store.getters.getBuilding.id != null"
                  color="#00A3A1"
                  class="px-16 rounded-lg"
                  style="
                    text-transform: initial;
                    font-family: sfProDisplayMedium;
                  "
                  dark
                  @click="
                    () => {
                      getTypeOffice();
                      spaceReserve = 4;
                    }
                  "
                >
                  Aceptar
                </v-btn>
              </div>
            </div>
          </v-stepper-content>
          <v-stepper-content step="4" style="height: 30em; overflow-y: scroll">
            <div style="width: 20em">
              <h1
                class="mb-2"
                style="font-family: sfProDisplaySemiBold; color: #001d38"
              >
                {{ $store.getters.getBuilding.name }}
              </h1>
              <TypeOffice
                v-for="office in typeOffices"
                :key="office.id"
                v-model="$store.getters.getTypeOffice"
                :clickProps="
                  () => {
                    spaceReserve = 5;
                  }
                "
                :officeInfo="office"
              ></TypeOffice>
            </div>
          </v-stepper-content>
          <v-stepper-content step="5">
            <Floors :buildingId="$store.getters.getBuilding.id"></Floors>
          </v-stepper-content>
          <v-stepper-content step="6">
            <Office></Office>
          </v-stepper-content>
          <v-stepper-content step="7">
            <div class="overflow-y-auto" style="height: 40em">
              <div style="display: flex">
                <img
                  src="/ic_back.svg"
                  class="backButton"
                  @click="spaceReserve = 6"
                  alt="to back"
                />
                <div class="headFloor ml-10">
                  <h1>{{ $store.getters.getTypeOffice.name }}</h1>
                  <h2>
                    {{ $store.getters.getOfficeInfo.buildingInfo.name }} -
                    {{ $store.getters.getOfficeInfo.floorBuildingInfo.floor }}
                  </h2>
                </div>
              </div>
              <div>
                <div class="planeBodyContainer px-5">
                  <h1>Plano del lugar</h1>
                  <h2>{{ $store.getters.getOfficeInfo.name }}</h2>
                  <img
                    :src="
                      $store.getters.getOfficeInfo.officePlains[0].image
                        | DeleteUrl
                    "
                  />
                </div>
                <v-divider></v-divider>
                <div class="officeArrivalDirection px-5">
                  <h1>C&oacute;mo llegar</h1>
                  <div>
                    <div
                      style="display: flex"
                      v-for="direction in $store.getters.getOfficeInfo
                        .officeArrivalDirection"
                      :key="direction.id"
                    >
                      <img src="/ic_select_off.svg" />
                      <p class="pt-4">
                        {{ direction.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-stepper-content>
          <v-stepper-content step="8">
            <Favorites></Favorites>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-row>
  </div>
</template>

<script>
import Favorites from "../../components/Favorites.vue";
export default {
  components: { Favorites },
  layout: "logged",
  data() {
    return {
      minHour: "",
      typeOffices: [],
      days: [],
      user: {},
      searchBuilding: "",
      buildings: [],
      citys: [],
      modal: false,
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD"
      },
      timePicker: 1,
      favoritos: "",
      // isAllDay: null,
      disabledDates: {
        weekdays: [7, 1]
      },
      attributesOne: [
        {
          highlight: {
            contentStyle: {
              color: "white"
            },
            style: {
              backgroundColor: "#00A3A1"
            }
          },
          dates: [new Date()]
        }
      ],
      menu: false
    };
  },
  mounted() {
    console.log("0ddd", this.$store.getters);
    this.user = this.$store.getters.getUser;
    console.log("use", this.user);
    this.getCitys();
    this.getTime();
    this.getTypeOffice();
    if (this.$store.getters.getBuilding.id != null) this.getBuildingsByCity();
  },
  computed: {
    getTimeParser(date) {
      //  const dd = new Date(date);
      console.log("daye", date);
      return date;
    },
    dates() {
      return this.days.map(day => day.date);
    },
    attributes() {
      return this.dates.map(date => ({
        highlight: {
          contentStyle: {
            color: "white"
          },
          style: {
            backgroundColor: "#00A3A1"
          }
        },
        dates: date
      }));
    },
    checkIn: {
      get() {
        return this.$store.getters.getStartTime;
      },
      set(value) {
        this.$store.commit("setStartTime", value);
      }
    },
    checkOut: {
      get() {
        return this.$store.getters.getEndTime;
      },
      set(value) {
        this.$store.commit("setEndTime", value);
      }
    },
    date: {
      get() {
        return this.$store.getters.getDate;
      },
      set(value) {
        console.log("eeeee value", value);
        let date = new Date();
        let formatDate =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        if (value == formatDate) {
          let minutes =
            date.getMinutes() + parseInt(this.$store.getters.getTime);
          date.setMinutes(minutes);
          this.minHour =
            date.getHours() +
            ":" +
            (date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes());
        } else this.minHour = "";
        let formatDate2 = "";
        if (value) {
          formatDate2 =
            value.getFullYear() +
            "-" +
            (value.getMonth() + 1 < 10
              ? "0" + (value.getMonth() + 1)
              : value.getMonth() + 1) +
            "-" +
            (value.getDate() < 10 ? "0" + value.getDate() : value.getDate());
        }

        this.$store.commit("setDate", [formatDate2]);
      }
    },
    spaceReserve: {
      get() {
        return this.$store.getters.getSpaceReserve;
      },
      set(value) {
        this.$store.commit("setSpaceReserve", value);
      }
    },
    isAllDay: {
      get() {
        return this.$store.getters.getIsAllDay;
      },
      set(value) {
        this.$store.commit("setIsAllDay", value);
        if (value) {
          this.$store.commit("setStartTime", "8:00");
          this.$store.commit("setEndTime", "18:00");
        } else {
          this.$store.commit("setStartTime", "");
          this.$store.commit("setEndTime", "");
        }
      }
    }
  },
  watch: {
    "$store.getters.getCity": function(newCity) {
      this.$store.commit("setBuilding", {
        name: "",
        id: null
      });
      this.getBuildingsByCity();
    }
  },
  methods: {
    onDayClick(day) {
      let getDate = [];
      var Xmas95 = new Date();
      var weekday = Xmas95.getDate();
      var month = Xmas95.getMonth();
      var year = Xmas95.getFullYear();
      if (day.year < year) return;
      if (day.year >= year && day.month < month + 1) return;
      if (day.year >= year && day.month == month + 1 && day.day < weekday)
        return;
      const idx = this.days.findIndex(d => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      } else {
        this.days.push({
          id: day.id,
          date: day.date
        });
      }
      if (this.days.length) {
        this.days.map(res => {
          getDate.push(res.id);
        });
      }
      this.$store.commit("setDate", getDate);
    },
    inprimir() {
      if (this.$refs.inicio) this.$refs.inicio.selectingHour = true;
      if (this.$refs.fin) this.$refs.fin.selectingHour = true;
    },
    getMinHour(hour) {
      let date = new Date("2020-01-01 " + hour);
      date.setTime(date.getTime() + 60 * 60 * 1000);
      return (
        date.getHours() +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
      );
    },
    goTo(route) {
      this.$router.push(route);
    },
    getCitys() {
      let body = {
        limit: 10,
        offset: 0
      };
      this.$store
        .dispatch("getCitys", {
          body
        })
        .then(res => {
          if (res.data.success) {
            console.log(res.data.body);
            res.data.body.forEach(element => {
              this.citys.push(element);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTime() {
      this.$store.dispatch("getTime").catch(err => {
        console.log(err);
      });
    },
    getBuildingsByCity() {
      this.$store
        .dispatch("getBuildingsByCity")
        .then(res => {
          if (res.data.success) {
            this.buildings = [];
            res.data.body.forEach(element => {
              this.buildings.push(element);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTypeOffice() {
      let position = JSON.parse(localStorage.getItem("user")).position;
      let body = {
        position,
        limit: 10,
        offset: 0
      };
      this.$store
        .dispatch("getTypeOffice", {
          body
        })
        .then(res => {
          if (res.data.success) {
            this.typeOffices = [];
            res.data.body.forEach(element => {
              this.typeOffices.push(element);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    verifyReservationTime() {
      this.$store.dispatch("verifyReservationTime").then(res => {
        console.log("res", res);
        if (res.data.success) {
          if (res.data.body.available) {
            if (this.$store.getters.getSelectFavorite) this.spaceReserve = 6;
            else this.spaceReserve = 2;
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
                        <p>{res.data.message}</p>
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
        }
      });
    }
  }
};
</script>
<style lang="scss">
.v-dialog {
  box-shadow: none;
}
.planeBodyContainer {
  margin-top: 3em;
  img {
    width: 80%;
  }
  h1 {
    color: #00338d;
    font-family: sfProDisplayBold;
    font-weight: bold;
  }
  h2 {
    color: #00a3a1;
    font-family: sfProDisplayRegular;
    font-weight: 300;
  }
}
.officeArrivalDirection {
  h1 {
    color: #001d38;
    font-family: sfProDisplaySemiBold;
  }
  p {
    color: #001d38;
    font-family: univers55Regular;
  }
}
</style>
