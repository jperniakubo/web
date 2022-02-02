<template>
  <div>
    <div class="headFloor mt-5 text-center">
      <h1>{{ $store.getters.getBuilding.name }}</h1>
      <h2>Resultados ({{ offices.length }})</h2>
    </div>
    <div class="officeContainer mt-10 pb-5">
      <v-row>
        <v-col cols="12" md="6" v-for="office in offices" :key="office.id">
          <div
            class="mt-10"
            style="position: relative; width: 90%"
            @click="clickOffice(office)"
          >
            <div class="cardOffice mx-5 rounded-lg px-5">
              <h1>{{ office.name }}</h1>
              <h2>
                M&aacute;ximo {{ office.maxCapacity }}
                {{ office.maxCapacity > 1 ? "personas" : "persona" }}
              </h2>
            </div>
            <div class="d-flex justify-center">
              <div class="img-container">
                <img
                  :src="office.officeImages[0].image | DeleteUrl"
                  style="border-radius: 10px"
                />
                <div class="availableTag">
                  <h1>{{ office.isAvailable ? "Disponible" : "Reservada" }}</h1>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offices: [],
    };
  },
  props: {
    floor: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.getListOfOffice();
  },
  watch: {
    "$store.getters.getIsFavorite": function () {
      this.getListOfOffice();
    },
  },
  methods: {
    clickOffice(office) {
      this.$store.commit("setSpaceReserve", 6);
      this.$store.commit("setOffice", office);
      this.$store.commit("setIsFavorite", office.isFavorite);
    },
    getListOfOffice() {
      this.offices = [];
      this.$store
        .dispatch("getListOfOfficeByFloor", { floorId: this.floor.id })
        .then((res) => {
          console.log(res.data.body);
          res.data.body.forEach((office) => this.offices.push(office));
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang="scss">
.img-container {
  position: absolute;
  z-index: 2;
  top: -2em;
  width: 90%;
  margin-left: 12%;
  img {
    width: 100%;
    height: 7em;
    object-fit: cover;
  }
}
.availableTag {
  width: 4em;
  position: relative;
  padding-right: 0.5em;
  top: -6.8em;
  background-color: #0adb66;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  h1 {
    font-size: 0.7em;
    font-family: sfProDisplayMedium;
    color: #ffffff;
  }
}
.officeContainer {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
.cardOffice {
  width: 100%;
  padding-top: 6em;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
  box-shadow: 0px 3px 6px #00000029;
  h1 {
    color: #005eb8;
    font-family: sfProDisplaySemiBold;
    padding: 0;
    font-size: 1em;
  }
  h2 {
    color: #3a4151;
    font-size: 0.8em;
  }
}
.headFloor {
  h1 {
    font-family: sfProDisplaySemiBold;
    font-size: 1.2em;
  }
  h2 {
    font-family: sfProDisplaySemiBold;
    font-size: 0.8em;
    color: #9ba8bb;
  }
}
</style>
