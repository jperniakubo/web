<template>
  <div>
    <img
      src="/ic_calendar.svg"
      class="float"
      @click="
        () => {
          $store.dispatch('resetForm');
          $router.push('/home/reserveSpace');
        }
      "
    />
    <div class="mx-16 px-5 pt-10">
      <Button
        label="Filtrar por fecha"
        img="/ic_date.svg"
        :click="() => (ModalReservationDate = true)"
        :value="reservationDate"
      >
      </Button>
      <div
        style="height: 28em; width: 100%"
        class="overflow-y-auto mt-10 pb-10"
        v-if="$store.getters['reservations/getReservations'].length > 0"
      >
        <div
          v-for="(item, i) in $store.getters['reservations/getReservations']"
          :key="item.id"
        >
          <h3
            v-if="i == 0 ? true : validateDate(item, i)"
            class="dateReservation"
          >
            {{ formatDate(item.date) }}
          </h3>
          <div class="rounded-lg cardReservation px-10 my-3">
            <p>{{ item.startTime }} - {{ item.endTime }}</p>
            <div class="typeOffice">
              <p>
                {{ item.officeInfo.officeTypeInfo.name }}
              </p>
              <img
                src="/ic_next-verde.svg"
                width="25em"
                class="mt-1"
                style="cursor: pointer; margin-bottom: 0.7em"
                @click="openDetail(item.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="reservationsEmpty mx-auto"
      v-if="$store.getters['reservations/getReservations'].length < 1"
    >
      <img src="/ic_img_reservation.svg" alt="" />
      <h1>¡Lo sentimos!</h1>
      <p>A&uacute;n no tienes reservas, crea una para ver su resumen</p>
    </div>
    <v-dialog v-model="ModalReservationDate" max-width="300"
      ><vc-date-picker
        v-model="reservationDate"
        :locale="{ masks: { weekdays: 'WW' } }"
        :min-date="new Date()"
        :model-config="modelConfig"
      ></vc-date-picker
    ></v-dialog>
  </div>
</template>

<script>
export default {
  layout: "logged",
  data() {
    return {
      acsTkn: "",
      reservationItems: [{ reservation: {} }],
      ModalReservationDate: false,
      date: "",
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
      reservationDate: "",
      dateReservation: "",
    };
  },
  mounted() {
    this.getAllReservations();
  },
  watch: {
    reservationDate: function (value) {
      this.getAllReservations();
    },
  },
  methods: {
    openDetail(id) {
      this.$router.push(`/reservations/${id}`);
    },
    validateDate(reservation, i) {
      if (
        reservation.date !=
        this.$store.getters["reservations/getReservations"][i < 1 ? i : i - 1]
          .date
      )
        return true;
      else return false;
    },
    formatDate(date) {
      let format = date.split("-");
      let newDate = new Date(
        format[0],
        parseInt(format[1] - 1),
        parseInt(format[2])
      );
      let dateFormat = newDate
        .toLocaleDateString("es-ES", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .split(" ");
      return dateFormat[2] + " " + dateFormat[0] + ", " + dateFormat[4];
    },
    getAllReservations() {
      this.$store
        .dispatch("reservations/getAllReservations", this.reservationDate)
        .then((res) => {
          if (!res)
            this.$breadstick.notify(
              ({ onClose }) => {
                return (
                  <div class="toastCustom" onClick={onClose}>
                    <v-row>
                      <v-col cols="6" sm="3" class="mr-2">
                        <img src="/ic_alert.png" width="50em" />
                      </v-col>
                      <v-col cols="6" sm="9">
                        <h1>¡Algo sali&oacute; mal! </h1>
                        <p>Error Al cargar tus Reservas</p>
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
        });
    },
  },
};
</script>
<style lang="scss">
.typeOffice {
  margin-top: -0.5em;
  display: flex;
  justify-content: space-between;
  p {
    margin-top: auto;
    margin-bottom: auto;
    color: #454f63;
    font-family: univers55Regular;
    font-size: 1.2em;
    font-weight: bold;
  }
}
.cardReservation {
  height: 83px;
  width: 350px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #dedede;
  box-shadow: 0px 4px 16px #7e7e7e0f;
  > p {
    font-family: univers55Regular;
    margin: 0;
    color: #959dad;
    margin-top: 0.9em;
  }
}
.dateReservation {
  color: #005eb8;
  font-family: sfProDisplayBold;
  text-transform: capitalize;
}
.float {
  position: fixed;
  width: 120px;
  height: 120px;
  bottom: 5%;
  right: 5%;
  border-radius: 50px;
  cursor: pointer;
}
.reservationsEmpty {
  width: 18%;
  text-align: center;
  h1 {
    font-size: 1.5em;
    color: #00338d;
    font-family: sfProDisplayBold;
    font-weight: bold;
  }
  p {
    color: #3a4151;
    font-family: sfProDisplayRegular;
  }
}
</style>
