<template>
  <div class="divContainerViews mt-n10 mx-5 pb-5 mb-5">
    <div class="HeaderContainerProfile ml-16">
      <img
        :src="urlImageTemporal != '' ? urlImageTemporal : profileImg"
        @click="clickPhoto()"
        class="profileAvatar"
        style="cursor: pointer"
      />
      <v-file-input
        accept="image/*"
        name="image"
        id="image"
        ref="image"
        label=""
        style="display: none"
        v-model="photoEdit"
        @change="putTemporalImageOnView"
      >
      </v-file-input>
      <br />
      <div class="mt-5 ml-10">
        <div>
          <v-btn
            color="#005eb8"
            class="rounded-lg mt-8"
            style="font-size: 0.85em; letter-spacing: 1px"
            large
            @click="updateImage()"
            dark
            ><img src="/ic_edit-2.svg" width="25em" class="mr-2" />
            Actualizar
          </v-btn>
          <v-btn
            color="#EB4E29"
            class="rounded-lg mt-8"
            style="font-size: 0.85em; letter-spacing: 1px"
            large
            @click="changeDialog()"
            dark
            ><img src="/ic_exit.svg" class="mr-2" /> Cerrar sesi&oacute;n
          </v-btn>
        </div>
        <p @click="$router.push('/helpCenter')" class="loginHelp mt-2">
          ¿Necesitas ayuda? Has click
          <strong style="text-decoration: underline">aqu&iacute; </strong>
        </p>
      </div>
    </div>
    <v-divider
      class="mt-16 mx-16"
      style="background-color: #707070; opacity: 0.18"
    ></v-divider>

    <div class="mx-16">
      <h1 class="profileTitle ml-5 my-5">Datos b&aacute;sicos</h1>
      <v-row no-gutters>
        <v-col cols="5" sm="6" v-for="item in itemsProfile" :key="item.title">
          <v-card
            class="mt-2 bounce-in-fwd rounded-lg mx-5 px-2"
            elevation="0"
            style="border: 1px solid #16388431"
            height="6em"
          >
            <v-row>
              <v-col cols="5" sm="2" class="text-center">
                <img
                  :src="item.icon"
                  width="50rem"
                  class="mt-3 rounded-circle"
                  style="background-color: #ebeff6"
                />
              </v-col>
              <v-col cols="5" sm="10">
                <p class="labelProfile">{{ item.title }}</p>
                <p class="contentProfile">{{ item.value }}</p>
                <p class="subtitleProfile">Este campo no es editable</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card class="rounded-xl" height="20em">
        <div class="text-center" style="background-color: #f4f6fc">
          <img src="/ic_exit2.svg" class="mt-5" width="120em" />
        </div>
        <v-divider></v-divider>
        <div class="text-center my-10">
          <p class="dialogTitle px-10">¿Est&aacute;s seguro de cerrar sesi&oacute;n?</p>
        </div>

        <div class="text-center">
          <v-btn
            color="#FD444F"
            class="rounded-lg px-7"
            style="font-size: 0.85em; font-family: sfProDisplayRegular"
            large
            @click="changeDialog()"
            dark
            >Cancelar
          </v-btn>
          <v-btn
            color="#0691DA"
            class="rounded-lg"
            style="font-size: 0.85em; font-family: sfProDisplayRegular"
            large
            @click="$router.push('/logout')"
            dark
            >Cerrar Sesi&oacute;n
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: "logged",
  data() {
    return {
      dialog: false,
      photoEdit: null,
      urlImageTemporal: "",
      itemsProfile: [
        {
          title: "ID Colaborador",
          value: this.$store.getters.getUser.uid,
          icon: "/ic_idcard.svg",
        },
        {
          title: "Cargo",
          value: this.$store.getters.getUser.position,
          icon: "/ic_person.svg",
        },
        {
          title: "Nombre",
          value: this.$store.getters.getUser.fullName,
          icon: "/ic_person.svg",
        },
        {
          title: "Email",
          value: this.$store.getters.getUser.email,
          icon: "/ic_email2.svg",
        },
        {
          title: "Perfil LinkedIn",
          value: this.$store.getters.getUser.linkedinProfile,
          icon: "/ic_email-1.svg",
        },
      ],
    };
  },
  computed: {
    profileImg: {
      get() {
        return this.$store.getters.getUser.profileImage;
      },
    },
  },
  mounted() {
    // if (this.$store.getters.getUser.uid ==null) this.getProfileData();
  },
  methods: {
    changeDialog() {
      this.dialog = !this.dialog;
    },
    getProfileData() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.$store.commit("setUser", user);
    },
    putTemporalImageOnView() {
      this.urlImageTemporal = URL.createObjectURL(this.photoEdit);
    },
    clickPhoto() {
      let el = document.getElementById("image");
      if (el) {
        el.click();
      }
    },
    async updateImage() {
      if (this.photoEdit != null) {
        let res = await this.$store.dispatch("editUser", this.photoEdit);
        localStorage.setItem("user", JSON.stringify(res.body));
        this.photoEdit = null;
        this.urlImageTemporal = "";
        if (res.success) {
          this.$breadstick.notify(
            ({ onClose }) => {
              return (
                <div class="toastCustomSuccess mr-10" onClick={onClose}>
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
        }
      } else {
        this.$breadstick.notify(
          ({ onClose }) => {
            return (
              <div class="toastCustom" onClick={onClose}>
                <v-row>
                  <v-col cols="6" sm="3">
                    <img src="/ic_alert.png" width="50em" />
                  </v-col>
                  <v-col cols="6" sm="9">
                    <h1>¡Algo sali&oacute; mal! </h1>
                    <p>
                      Selecciona una nueva <br />
                      foto de perfil, Da click sobre tu foto actual
                    </p>
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
        return;
      }
    },
  },
};
</script>

<style lang="scss">
.HeaderContainerProfile {
  display: flex;
}
</style>
