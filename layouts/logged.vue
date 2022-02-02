<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      permanent
      width="12rem"
    >
      <v-row>
        <v-col class="text-center">
          <p class="loggedTxtUserName univers55Bold">
            {{ $store.getters.getUser.fullName }}
          </p>
          <p class="loggedTxtUserPosition sfProDisplayRegular">
            {{ $store.getters.getUser.position }}
          </p>
          <p class="loggedTxtUserEmail sfProDisplayRegular">
            {{ $store.getters.getUser.email }}
          </p>
        </v-col>
      </v-row>
      <v-list>
        <v-list-item
          color="#00338D"
          class="itemsMenu"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
        >
          <v-list-item-icon>
            <img
              :src="
                '/' + $route.name.split('-')[0] === item.to
                  ? item.icon
                  : item.iconOff
              "
              alt=""
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="#00338D" @click="changeDialog()" class="itemsMenu">
          <v-list-item-icon>
            <img :src="dialog ? logout.icon : logout.iconOff" alt="" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="logout.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      class="appBarLogged"
      :clipped-left="clipped"
      fixed
      height="90"
      app
    >
      <img class="imgLogoLayout" src="/ic_logo.png" alt="kpmg" />
      <v-spacer />
      <v-menu
        v-model="menuNotification"
        :close-on-content-click="false"
        offset-y
        left
      >
        <template v-slot:activator="{ on }">
          <v-avatar size="60" v-on="on" class="avatarNotifications">
            <v-img
              src="/ic_notification.svg"
              class="imgBtnNotifications"
            ></v-img>
          </v-avatar>
        </template>
        <div
          style="min-height: 200px; max-height: 350px; background-color: #ffff"
        >
          <p class="txtTitleNotifications px-5 pt-1 pb-5">Notificaciones</p>
          <div class="mx-3" style="border-bottom: 2px dashed #001d38"></div>
          <!-- <v-divider ></v-divider> -->
          <div class="divNotificationsScrollable">
            <div
              v-for="notification in $store.getters.getListNofication"
              :key="notification.notifReservationId"
              class="listNotification px-2 my-2"
              @click="
                () => {
                  menuNotification = false;
                  $router.push(
                    '/home/notification/' + notification.notifReservationId
                  );
                }
              "
            >
              <v-avatar color="#745AF3" size="10" class="mt-5 mx-5">
                <span class="white--text headline"></span>
              </v-avatar>
              <div class="notification mr-10">
                <p class="notificationTitle">
                  {{ notification.reservation.dateReservation }}/{{
                    notification.reservation.startReservation
                  }}
                  - {{ notification.reservation.endReservation }}
                </p>
                <p class="notificationSubtitle">{{ notification.message }}</p>
              </div>
              <img src="/ic_arrowd_next.svg" />
            </div>
          </div>
        </div>
      </v-menu>
      <img class="imgLogoHeader" src="/ic_logo_kpmg_header.svg" alt="KPMG" />
    </v-app-bar>
    <v-main class="mainAllViews">
      <img src="/ic_banner2x.png" class="imgHeadContent" alt="KPMG" />
      <div class="backgroundContainer">
        <nuxt />
      </div>
    </v-main>
    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card class="rounded-xl" height="20em">
        <div class="text-center" style="background-color: #f4f6fc">
          <img src="/ic_exit2.svg" class="mt-5" width="120em" />
        </div>
        <v-divider></v-divider>
        <div class="text-center my-10">
          <p class="dialogTitle px-10">
            ¿Est&aacute;s seguro de cerrar sesi&oacute;n?
          </p>
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
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      userName: "C&eacute;sar Soto",
      userPosition: "ASOCIADO",
      userEmail: "csoto@kubo.co",
      menuNotification: false,
      clipped: true,
      drawer: false,
      fixed: false,
      logout: {
        icon: "/ic_sign_off.svg",
        iconOff: "/ic_sign_off2.svg",
        title: "Cerrar sesion",
        to: "/logout",
      },
      items: [
        {
          icon: "/ic_home.svg",
          iconOff: "/ic_home-1.svg",
          title: "Home",
          to: "/home",
        },
        {
          icon: "/ic_profile2.svg",
          iconOff: "/ic_profile.svg",
          title: "Perfil",
          to: "/profile",
        },
        {
          icon: "/ic_reservation2.svg",
          iconOff: "/ic_reservation.svg",
          title: "Reservas",
          to: "/reservations",
        },
        {
          icon: "/ic_information2.svg",
          iconOff: "/ic_information.svg",
          title: "Centro de ayuda",
          to: "/helpCenter",
        },
      ],
      miniVariant: false,
      right: true,
      title: "Vuetify.js",
    };
  },
  created() {
    this.$store.dispatch("listNotificationReservationByUid");

    // console.log(this.$store.getters["userTransactions/getOrigin"]);
    let user = JSON.parse(localStorage.getItem("user"));
    // this.userPosition = localStorage.getItem("profile-position");
    // this.userName = localStorage.getItem("profile-fullName");
    // this.userEmail = localStorage.getItem("profile-email");
    this.$store.commit("setUser", user);
    // this.$store.commit("setLeaderReserve", {
    //   id: user.uid,
    //   name: user.fullName,
    // });
  },
  mounted() {},
  methods: {
    changeDialog() {
      this.dialog = !this.dialog;
    },
  },
  middleware: "isAuth",
};
</script>
<style lang="scss">
.v-dialog {
  box-shadow: none;
}
.v-btn {
  font-family: sfProDisplayMedium;
  text-transform: initial;
  letter-spacing: 1px;
  font-size: 0.85em;
}
.backgroundContainer {
  height: 73%;
}
.listNotification {
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: rgb(243, 240, 240);
    cursor: pointer;
  }
}
.notification {
  .notificationTitle {
    color: #001d38;
    font-family: sfProDisplaySemiBold;
    margin: 0;
    padding: 0;
  }
  .notificationSubtitle {
    color: #3a4151;
    margin: 0;
    padding: 0;
  }
}
</style>
