<template>
  <div>
    <div
      class="favoriteEmpty mx-auto"
      v-if="$store.getters.getFavorites.length < 1"
    >
      <img src="/ic_star_favorite.svg" alt="" />
      <h1>Esto est&aacute; vac&iacute;o</h1>
      <p>
        Solo tienes que hacer clic en el s&iacute;mbolo de la estrella, de un espacio y
        aparecer&aacute; aqu&iacute;.
      </p>
    </div>
    <div v-if="$store.getters.getFavorites.length > 0">
      <div class="mr-16 overflow-y-auto" style="height: 30em">
        <h1
          class="mb-10"
          style="color: #454545; font-size: 1em; font-family: univers55Regular"
        >
          Reserva tus favoritos
        </h1>
        <v-row no-gutters>
          <v-col
            cols="5"
            sm="6"
            v-for="favorite in $store.getters.getFavorites"
            :key="favorite.id"
          >
            <div class="favoriteCard">
              <div class="backgroundImgCard">
                <img
                  class="rounded-xl imgOffice"
                  :src="
                    favorite.officeImages.length > 0
                      ? favorite.officeImages[0].image
                      : '' | DeleteUrl
                  "
                  width="10em"
                />
                <img
                  src="/ic_star_on.svg"
                  width="35em"
                  class="buttonFavorite"
                  @click="changeFavorite(favorite.id)"
                />
              </div>
              <div class="card rounded-xl px-7">
                <div>
                  <h1>{{ favorite.name }}</h1>
                  <h1>
                    {{
                      $store.getters.getTypeOfficeById(favorite.officeTypeId)
                        ? $store.getters.getTypeOfficeById(
                            favorite.officeTypeId
                          ).name
                        : ""
                    }}
                  </h1>
                  <h2>{{ favorite.floorName }}</h2>
                  <h3>Oficinas {{ favorite.buildingName }}</h3>
                </div>
                <img
                  src="/ic_next.svg"
                  style="cursor: pointer"
                  @click="clickFavorite(favorite)"
                />
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.$store.dispatch("getFavoritesOfficesOfUser");
  },
  methods: {
    async changeFavorite(id) {
      let res = await this.$store.dispatch("addOfficeToFavorites", id);
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
          duration: 3000,
        }
      );
    },
    clickFavorite(favorite) {
      this.$store.dispatch("selectFavorite", favorite);
    },
  },
};
</script>
<style lang="scss">
.favoriteEmpty {
  width: 20%;
  margin-top: 12%;
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
.favoriteCard {
  .backgroundImgCard {
    .imgOffice {
      width: 90%;
      height: 10em;
      object-fit: cover;
    }
    .buttonFavorite {
      cursor: pointer;
      position: relative;
      top: -6.5em;
      right: 90%;
    }
  }
  .card {
    background-color: #ffffff;
    position: relative;
    top: -2.5em;
    left: 2.5%;
    width: 85%;
    height: auto;
    border: 1px solid #bcc7d5;
    box-shadow: 6px 6px 19px #93a7be30;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    h3 {
      margin: 0;
      color: #3a4151;
      font-size: 1em;
      font-family: sfProDisplaySemiBold;
    }
    h2 {
      margin: 0;
      color: #001d38;
      font-size: 0.9em;
      font-family: sfProDisplaySemiBold;
    }
    h1 {
      padding-top: 0.5em;
      margin: 0;
      color: #005eb8;
      font-size: 1em;
      font-family: sfProDisplaySemiBold;
      font-weight: bold;
    }
  }
}
</style>