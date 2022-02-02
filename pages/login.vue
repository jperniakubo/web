<template>
  <div>
    <v-card-text>
      <v-img src="/ic_logo_kpmg.svg" class="logoCardLogin mx-auto"></v-img>
      <p class="loginTitle mt-3">¡Bienvenido!</p>
      <p class="loginSubText">Ingresa tus datos para continuar</p>
    </v-card-text>
    <v-form ref="loginForm" class="loginForm" @submit.prevent="login()">
      <label class="labelInputLogin">Correo electr&oacute;nico</label>
      <v-text-field
        placeholder="Correo electrónico"
        class="inputLogin rounded-lg"
        v-model="email"
        :rules="[rules.required, rules.email]"
        outlined
        dense
        flat
        background-color="#F8F8F8"
      >
        <template v-slot:prepend-inner>
          <v-icon size="20 " color="#0091DA">mail</v-icon>
        </template>
      </v-text-field>
      <label class="labelInputLogin">Contrase&ntilde;a</label>
      <v-text-field
        placeholder="Contraseña"
        class="inputLogin rounded-lg"
        v-model="password"
        :rules="[rules.required, rules.min]"
        type="password"
        outlined
        dense
        flat
        background-color="#F8F8F8"
      >
        <template v-slot:prepend-inner>
          <v-icon size="20 " color="#0091DA">lock</v-icon>
        </template>
      </v-text-field>
      <v-row style="margin-top: -1.5em">
        <v-col cols="10" sm="1">
          <v-checkbox
            class="checkBoxLogin"
            color="#00a3a1"
            v-model="privacidad"
            hide-details
            light
          ></v-checkbox>
        </v-col>
        <v-col cols="10" sm="9">
          <p class="textPolitics">
            He le&iacute;do y acepto la
            <strong @click="goTo('/privacyPolicies')">
              pol&iacute;tica de privacidad de datos personales</strong
            >
          </p>
        </v-col>
      </v-row>
      <v-row style="margin-top: -2em">
        <v-col cols="10" sm="1">
          <v-checkbox
            class="checkBoxLogin"
            color="#00a3a1"
            v-model="terminos"
            hide-details
            light
          ></v-checkbox>
        </v-col>
        <v-col cols="10" sm="9">
          <p class="textPolitics">
            He le&iacute;do y acepto los
            <strong @click="goTo('/termsAndConditions')">
              T&eacute;rminos y Condiciones</strong
            >
          </p>
        </v-col>
      </v-row>
      <v-btn color="#00a3a1" class="rounded-lg buttonLogin" type="submit" dark>
        Iniciar
      </v-btn>
    </v-form>
    <p @click="goTo('/centerHelp')" class="loginHelp text-center">
      ¿Necesitas ayuda? Has click aqu&iacute;
    </p>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      rules: {
        required: (value) => !!value || "Campo requerido ",
        min: (v) =>
          v.length >= 8 || "La clave debe tener al menos 8 caracteres",
        email: (v) =>
          /.+@.+\..+/.test(v) || "Debe ingresar un correo v&aacute;lido",
        minCode: (v) =>
          v.length === 4 || "El c&oacute;digo tiene 4 d&iacute;gitos",
        isNumber: (v) => !isNaN(v) || "Valor debe ser n&uacute;mero",
      },
    };
  },
  computed: {
    email: {
      get() {
        return this.$store.state.login.password;
      },
      set(value) {
        this.$store.commit("login/setPassword", value);
      },
    },
    password: {
      get() {
        return this.$store.state.login.email;
      },
      set(value) {
        this.$store.commit("login/setEmail", value);
      },
    },
    privacidad: {
      get() {
        return this.$store.getters["login/getPrivatePolicies"];
      },
      set(value) {
        this.$store.commit("login/setPrivatePolicies", value);
      },
    },
    terminos: {
      get() {
        return this.$store.getters["login/getTermsAndConditions"];
      },
      set(value) {
        this.$store.commit("login/setTermsAndConditions", value);
      },
    },
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    async login() {
      let $toast = this.$breadstick;
      if (
        !this.$refs.loginForm.validate() |
        !this.terminos |
        !this.privacidad
      ) {
        if (!this.terminos | !this.privacidad)
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
                        Debes aceptar las politicas de
                        <br /> privacidad y los terminos y condiciones
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
      try {
        ///login2
        let res = await this.$store.dispatch("login/login2", {
          email: this.email,
          password: this.password,
        });
        console.log(res);
        if (res.data.success) {
          this.$nuxt.$cookiz.set("authToken", res.data.body.authToken, {
            path: "/",
          });
          localStorage.setItem("authToken", res.data.body.authToken);
          delete res.data.body.authToken;
          localStorage.setItem("user", JSON.stringify(res.data.body));
          this.$router.push("/verificationCode");
        } else {
          this.faildLogin(res.data.message);
        }
      } catch (error) {
        this.faildLogin(error);
      }
    },
    faildLogin(error) {
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
                  <p>{error}</p>
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
  },
};
</script>
