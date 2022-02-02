<template>
  <div
    class="divContainerViews mx-5 px-8 py-5"
    style="background: #fff; height: 100%"
  >
    <div style="width: 60%">
      <div class="notificationHeader">
        <h1>{{ notification.notifCreatedAt }}</h1>
        <h2>{{ notification.message }}</h2>
      </div>
      <div class="notificationCardDate px-5 pt-3 my-5">
        <h1>{{ notification.reservation.dateReservation }}</h1>
        <h2>{{ notification.office.name }}</h2>
        <div class="notificationStartTime mt-n2">
          <v-icon size="1em" color="#00A3A1">fiber_manual_record</v-icon>
          <p class="mt-3 ml-5">
            {{ notification.reservation.startReservation }}
          </p>
        </div>
      </div>
      <h1
        style="font-size: 0.95em; color: #023789; font-family: sfProDisplayBold"
      >
        Lider
      </h1>
      <div class="notificationCardUsers my-5 px-5 py-7">
        <div class="userReservation">
          <img :src="notification.user.profileImage | DeleteUrl" alt="" />
          <div class="ml-3 mt-3">
            <h1>{{ notification.user.fullName }}</h1>
            <h2>{{ notification.user.position }}</h2>
          </div>
        </div>
        <div style="display: flex" class="my-4">
          <img src="/ic_dash_line.svg" class="ml-7" />
          <h1
            class="ml-5 mt-2"
            style="
              color: #959dad;
              font-size: 0.87em;
              text-transform: capitalize;
              font-family: univers55Regular;
            "
          >
            Asignado
          </h1>
        </div>
        <div class="userReservation">
          <img :src="notification.userLead.profileImage | DeleteUrl" alt="" />
          <div class="ml-3 mt-3">
            <h1>{{ notification.userLead.fullName }}</h1>
            <h2>{{ notification.userLead.position }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "logged",
  data() {
    return {
      notification: {
        notifCreatedAt: "",
        office: {
          name: "",
        },
        reservation: {
          dateReservation: "",
        },
        user: {
          profileImage: "",
          fullName: "",
          position: "",
        },
        userLead: {
          profileImage: "",
          fullName: "",
          position: "",
        },
      },
    };
  },
  mounted() {
    this.notification = this.$store.getters.getListNoficationById(
      this.$route.params.id
    );
    console.log(this.notification);
  },
};
</script>

<style lang="scss" >
.notificationHeader {
  h1 {
    color: #959dad;
    font-size: 0.87em;
    text-transform: capitalize;
    font-family: univers55Regular;
  }
  h2 {
    font-size: 0.9em;
    color: #454f63;
    font-family: sfProDisplayBold;
  }
}
.notificationCardDate {
  border: 1px solid #dedede;
  border-radius: 12px;
  width: 400px;
  h1 {
    color: #454f63;
    font-family: sfProDisplayMedium;
    font-size: 0.88em;
  }
  h2 {
    color: #00a3a1;
    font-family: sfProDisplayMedium;
    font-size: 0.88em;
  }
}
.notificationStartTime {
  display: flex;
  p {
    color: #00338d;
    font-family: sfProDisplaySemiBold;
    font-size: 1em;
  }
}
.notificationCardUsers {
  border: 1px solid #dedede;
  border-radius: 12px;
  width: 400px;
  .userReservation {
    display: flex;
    img {
      width: 60px;
      height: 60px;
      border-radius: 10em;
      object-fit: cover;
    }
    h1 {
      color: #00a3a1;
      font-family: sfProDisplayMedium;
      font-size: 0.88em;
    }
    h2 {
      color: #454545;
      font-family: sfProDisplayMedium;
      font-size: 0.88em;
    }
  }
}
</style>
