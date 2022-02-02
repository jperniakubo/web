<template>
  <div>
    <v-tabs
      v-model="tab"
      centered
      style="width: 30em"
      color="#00a3a1"
      class="mx-auto"
    >
      <v-tab v-for="floor in floors" :key="floor.id">
        {{ floor.floor }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="floor in floors" :key="floor.id">
        <Floor :floor="floor"></Floor>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Floor from "./Floor.vue";
export default {
  components: { Floor },
  data() {
    return {
      floors: [],
      tab: null,
      buildingId: this.$store.getters.getBuilding.id,
    };
  },
  // props: {
  //   buildingId: {
  //     type: Number,
  //   },
  // },
  watch: {
    "$store.getters.getBuilding.id": function (value) {
      this.buildingId = value;
      if (value != null) this.getFloorsByBuilding();
    },
  },
  mounted() {
    if (this.buildingId != null) this.getFloorsByBuilding();
  },
  methods: {
    getFloorsByBuilding() {
      this.$store
        .dispatch("getFloorsByBuilding")
        .then((res) => {
          if (res.data.success) {
            this.floors = [];
            res.data.body.forEach((element) => {
              this.floors.push(element);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>