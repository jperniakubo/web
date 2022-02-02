<template>
  <div style="padding-right: 1em">
    <v-img src="/ic_logo_kpmg.svg" class="logoCardLogin mx-auto mt-10"></v-img>
    <p class="loginTitle mt-10">Validaci&oacute;n c&oacute;digo</p>
    <p class="loginSubText" style="font-size: 0.8em">
      D&iacute;gita el c&oacute;digo que parece a <br />
      continuaci&oacute;n para validar tu cuenta.
    </p>
    <div class="text-center">
      <p class="codeNumber">{{ code }}</p>
    </div>
    <v-otp-input
      ref="otpInput"
      input-classes="otp-input mb-10"
      separator=""
      style="display: flex"
      :num-inputs="8"
      :should-auto-focus="true"
      :is-input-num="true"
      @on-complete="handleOnComplete"
    />
    <div class="text-center">
      <v-btn
        color="#00a3a1"
        class="rounded-lg mb-10"
        style="font-size: 0.85em; padding-left: 4em; padding-right: 4em"
        large
        @click="verifyCode()"
        dark
        >Enviar
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: "login",
  middleware: "noAuth",
  data() {
    return {
      code: 0,
      codeInput: null
    };
  },
  created() {},
  mounted() {
    this.$store
      .dispatch("generateAcsTkn")
      .then(res => {
        localStorage.setItem("acstkn", res.body.accessToken);
      })
      .catch(err => {});
    this.getCodeVerification();
    setInterval(this.getCodeVerification, 60000);
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    handleOnComplete(value) {
      this.codeInput = value;
    },
    getCodeVerification() {
      let acstkn = localStorage.getItem("acstkn");
      let uid = JSON.parse(localStorage.getItem("user")).uid;

      this.$store
        .dispatch("getCodeVerification", {
          acstkn,
          uid
        })
        .then(res => {
          if (res.data.success) {
            this.code = res.data.body.code;
          }
        })
        .catch(err => {});
    },
    verifyCode() {
      if (this.codeInput ?? false) {
        let acstkn = localStorage.getItem("acstkn");
        let uid = JSON.parse(localStorage.getItem("user")).uid;
        this.$store
          .dispatch("verifyCode", {
            acstkn,
            uid,
            code: this.codeInput
          })
          .then(res => {
            if (res.data.body) {
              this.$nuxt.$cookiz.set("verifyCode", true, {
                path: "/"
              });
              this.$router.push("/home");
            }
          })
          .catch(err => {
            this.$breadstick.notify(
              ({ onClose }) => {
                return (
                  <div
                    class="toastCustom"
                    style="display: flex"
                    onClick={onClose}
                  >
                    <img src="/ic_alert.png" width="50em" />
                    <div style="margin-left: 1em">
                      <h1>¡Algo sali&oacute; mal! </h1>
                      <p>Codigo Incorrecto</p>
                    </div>
                  </div>
                );
              },
              {
                position: "bottom-right",
                duration: 3000
              }
            );
          });
      } else
        this.$breadstick.notify(
          ({ onClose }) => {
            return (
              <div class="toastCustom" style="display: flex" onClick={onClose}>
                <img src="/ic_alert.png" width="50em" />
                <div style="margin-left: 1em">
                  <h1>¡Algo sali&oacute; mal! </h1>
                  <p>Debes Ingresar el Codigo</p>
                </div>
              </div>
            );
          },
          {
            position: "bottom-right",
            duration: 3000
          }
        );
    }
  }
};
</script>
<style>
.otp-input {
  width: 40px;
  height: 1.2em;
  padding: 5px;
  margin: 0 5px;
  font-size: 2em;
  border-radius: 4px;
  font-family: sfProDisplayBold;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
