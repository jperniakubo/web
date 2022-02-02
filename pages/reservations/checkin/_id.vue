<template>
  <section id="check-in" class="divContainerViews mx-6 px-15 pb-16 mb-2">
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
              Check In
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
      </v-col>
    </v-row>

    <div class="container-check">
      <v-row>
        <v-col>
          <div class="check-header blue1 text-center">
            Check In {{ formatDate(reservation.date) }}/{{
              reservation.startTime + " - " + reservation.endTime
            }}
          </div>
          <div class="check-subheader blue1 text-center">
            {{ reservation.officeInfo.officeTypeInfo.name }}
          </div>
          <div class="check-info blue2 text-center sf-med">
            {{
              reservation.officeInfo.buildingInfo.name +
              " - " +
              reservation.officeInfo.floorBuildingInfo.floor
            }}
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="6">
          <div class="container-80">
            <div class="blue3 headerTitle sf">Descripci&oacute;n</div>
            <div class="mt-2 sf">
              {{ reservation.officeInfo.description }}
            </div>

            <div class="blue3 headerTitle sf title-top">
              Verificaci&oacute;n
            </div>
            <div class="notrequired">Estos campos no son obligatorios</div>

            <v-checkbox
              v-for="(item, index) in reservation.officeInfo.officeItems"
              v-model="item.value"
              label=""
              class="checkbox-checkin"
              :key="index"
            >
              <template v-slot:label>
                <div class="slot-style my-2">
                  <img
                    :src="item.systemItemIcons.imgPng | DeleteUrl"
                    width="40em"
                    height="40em"
                  />
                  <div class="text-checkbox" style="width: 75%">
                    {{ item.officeItemName }}
                  </div>
                  <img
                    v-if="!item.value"
                    class="checkimg"
                    src="/check/check.png"
                  />
                  <img
                    v-if="item.value"
                    class="checkimg"
                    src="/check/check2.png"
                  />
                </div>
              </template>
            </v-checkbox>

            <div class="verification-attr mt-5">
              <div>
                <img class="img-option" src="/check/people.png" />
                <span> Cantidad de personas </span>
              </div>

              <div class="verification-attr-people">
                <div>
                  <img
                    class="pointer lessimg"
                    src="/check/less.png"
                    @click="updatePeople('less')"
                    alt=""
                  />
                </div>
                <div class="showQuantity">
                  {{ peopleQuantity }}
                </div>
                <div>
                  <img
                    class="pointer plusimg"
                    src="/check/plus.png"
                    @click="updatePeople('plus')"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <v-col md="6">
          <img
            :src="reservation.officeInfo.officeImages[0].imgOffice"
            style="height: 350px; width: 100%; object-fit: cover"
          />
          <!-- <div
            :style="
              'background: url(' +
              reservation.officeInfo.officeImages[0].imgOffice +
              ');background-size: 100% 100%;height: 200px;width: 100%;'
            "
          ></div> -->
          <!--<div class="text-right">
            <v-btn class="mt-2 btn-blue1 roboto">Ver plano</v-btn>
          </div>-->

          <div class="blue3 headerTitle sf mt-5">Agregar comentario</div>
          <div class="mt-2">
            <v-textarea
              solo
              v-model="commet"
              name="input-7-4"
              label="Escribir comentario.."
            >
            </v-textarea>
          </div>

          <v-row>
            <v-col
              md="6"
              v-for="(img, index) in imagesPreview"
              class="relative"
              :key="index"
            >
              <img
                src="/check/remove.png"
                @click="removeImage(index)"
                class="remove-image"
                alt="remover imagen"
                title="Haz clic para eliminar la imagen"
              />
              <img
                :src="img | DeleteUrl"
                class="img-fluid img-checkin"
                alt=""
              />
            </v-col>
          </v-row>

          <input
            type="file"
            accept="image/*"
            class="input-file file-hide"
            ref="fileInput"
            @change="loadPreview($event, 'checkin')"
          />
          <div class="btn-action-upload">
            <v-btn
              class="btn-blue2"
              title="Haz clic para cargar una imagen"
              @click="openDialog = true"
            >
              <img class="mr-1" src="/check/image.png" />Imagen
            </v-btn>
            <v-btn
              class="btn-green1"
              @click="makeCheckIn()"
              title="Haz clic para hacer Check In"
            >
              <img class="mr-1" src="/check/checked.png" />Check In
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <dialogcheckin
      @close="openUpload()"
      :openDialog="openDialog"
    ></dialogcheckin>
  </section>
</template>

<script>
import dialogcheckin from "~/components/checkin/dialog.vue";

export default {
  layout: "logged",
  components: { dialogcheckin },
  data() {
    return {
      openDialog: false,
      peopleQuantity: 0,
      images: [],
      imagesPreview: [],
      commet: "",
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
    };
  },

  mounted() {
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
      this.reservation.officeInfo.officeItems.forEach(
        (item) => (item.value = false)
      );
    }
  },
  methods: {
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
    removeImage(position) {
      this.imagesPreview.splice(position, 1);
      this.images.splice(position, 1);
    },
    openUpload(action) {
      if (action == "true") {
        alert(123);
      }
      this.$refs.fileInput.click();
      this.openDialog = false;
    },
    updatePeople(action) {
      if (action == "plus") {
        if (this.peopleQuantity < this.reservation.officeInfo.maxCapacity)
          this.peopleQuantity++;
      } else {
        if (this.peopleQuantity > 0) this.peopleQuantity--;
      }
    },

    loadPreview(e, content) {
      this.file = e.target.files[0];
      console.log(this.file);
      switch (content) {
        /*almacenamos la imagen*/
        case "checkin":
          this.images.push(this.file);
          break;
      }
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      /*creamos la imagen*/
      this.createImage(files[0], content);
    },
    createImage(file, content) {
      console.log(file);
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
        switch (content) {
          case "checkin":
            this.imagesPreview.push(this.image);
            break;
        }
      };
      reader.readAsDataURL(file);
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
      return dateFormat[2] + " " + (parseInt(dateFormat[0]) + 1);
    },
    async makeCheckIn() {
      let items = [];
      this.reservation.officeInfo.officeItems.forEach((item) => {
        if (item.value == true) items.push(item.officeItemId);
      });
      console.log(this.commet, this.peopleQuantity, this.images, items);
      if (
        this.commet != "" ||
        this.peopleQuantity != 0 ||
        this.images.length != 0
      ) {
        let res = await this.$store.dispatch("reservations/makeCheckIn", {
          officeId: this.reservation.officeInfo.id,
          itemsCheckIn: items,
          reservationId: this.reservation.id,
          comment: this.commet,
          image: this.images,
          amountOfPeople: this.peopleQuantity,
        });
        console.log(res);
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
        await this.$store.dispatch("reservations/getAllReservations", "");
        this.$router.go(-1);
      } else
        this.$breadstick.notify(
          ({ onClose }) => {
            return (
              <div
                class="toastCustom"
                style="display:flex;cursor:pointer;"
                onClick={onClose}
              >
                <div style="margin-right:10px">
                  <img
                    src="/ic_alert.png"
                    style="margin-top:10px"
                    width="50em"
                  />
                </div>
                <div>
                  <h1>¡Algo sali&oacute; mal! </h1>
                  <p>
                    Debes Agregar un comentario,
                    <br /> imagenes y cantidad de personas
                  </p>
                </div>
              </div>
            );
          },
          {
            position: "bottom-right",
            duration: 3000,
          }
        );
    },
  },
};
</script>
<style lang="scss">
.container-80 {
  width: 80% !important;
  .v-input--selection-controls {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
}
.checkbox-checkin {
  width: 100%;
  img.checkimg {
    max-height: 40px !important;
  }
  .v-input--selection-controls__input {
    display: none;
  }
  .text-checkbox {
    color: #333;
  }
  .v-messages {
    display: none !important;
  }
  .v-input__slot {
    margin-bottom: 0 !important;
  }
}
.slot-style {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100% !important;
}
.center-by-flex {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}
.margin-0 {
  margin: 0 !important;
}
.relative {
  position: relative !important;
}
.remove-image {
  position: absolute;
  right: -18px;
  top: -8px;
  width: 50px;
  cursor: pointer;
}
.img-checkin {
  width: 100%;
  border-radius: 15px;
  border: 1px solid #ccc;
}
.file-hide {
  position: relative;
  top: 30px;
  opacity: 0;
}
.btn-action-upload {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.pointer {
  cursor: pointer;
}
img.img-option {
  width: 25px;
  position: relative;
  top: 5px;
}
.verification-attr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    margin-left: 20px;
    position: relative;
    top: 8px;
  }
}
.verification-attr-people {
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 45px;
  }
  .plusimg {
    position: relative;
    top: 13px;
    margin-left: 13px;
  }
  .lessimg {
    position: relative;
    top: 13px;
    margin-right: 13px;
  }
  .showQuantity {
    position: relative;
    top: 10px;
  }
}

.robot {
  font-family: plusimg "Roboto" !important;
}

.btn-blue1 {
  background-color: #0691da !important;
  color: #fff !important;
  border-radius: 15px;
  font-weight: bold;
  padding: 0px 50px !important;
}
.btn-blue2 {
  background-color: #0691da !important;
  color: #fff !important;
  border-radius: 5px;
  font-weight: bold;
  width: 48%;
}
.btn-green1 {
  background-color: #00a3a1 !important;
  color: #fff !important;
  border-radius: 5px;
  font-weight: bold;
  width: 48%;
}
.notrequired {
  position: relative;
  top: -2px;
  font-size: 14px;
  color: #333;
  margin-left: 2px;
  font-weight: bold;
  margin-bottom: 25px;
}
.title-top {
  margin-top: 30px;
}
.text-center {
  text-align: center;
}
.bold {
  font-weight: bold;
}
.check-header {
  font-size: 30px;
  font-weight: bold;
}
.check-subheader {
  font-size: 26px;
  font-weight: bold;
}
.check-info {
  font-size: 20px;
}
.sf {
  font-family: sfProDisplayRegular;
}
.sf-med {
  font-family: "sfProDisplayMedium";
}
.headerTitle {
  font-size: 21px;
  font-family: "sfProDisplayMedium";
}
.blue1 {
  color: #063890;
}
.blue2 {
  color: #65bbe8;
}
.blue3 {
  color: #00338d;
}

.spaceReserveResumen {
  img {
    width: 100%;
    height: 8em;
    object-fit: cover;
  }
  .card {
    background-color: #ffffff;
    position: relative;
    top: -3em;
    left: 2.5%;
    width: 95%;
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
</style>
