<template>
  <div>
    <div style="height: 25em">
      <img
        src="/ic_back.svg"
        class="backButton"
        @click="$router.go(-1)"
        alt="to back"
      />
      <v-row class="ml-3">
        <v-col cols="10" sm="1">
          <img src="/ic_temrs.svg" width="40em" alt="" srcset="" />
        </v-col>
        <v-col cols="10" sm="9">
          <h1 class="TitleTerms ml-5">
            Pol&iacute;ticas de privacidad de <br />Datos personales
          </h1>
        </v-col>
      </v-row>

      <p class="termsText">
        Al acceder o usar la p&aacute;gina web del servicio de KPMG en Colombia, usted
        aprueba que ha le&iacute;do, entendido y aceptado la pol&iacute;tica de privacidad en
        la p&aacute;gina web
        <strong @click="redirectTo()">www.kpmg.com/co</strong>
        y en cumplimiento a la ley 1581 de 2012, autoriza la recolecci&oacute;n,
        almacenamiento y uso de los datos con fines de acceso a la aplicaci&oacute;n,
        env&iacute;o de correo electr&oacute;nico, reserva de espacios y notificaciones. Para
        ejercer su derecho a conocer, actualizar y rectificar sus datos
        personales, ser informado sobre el uso que se ha dado a los mismos,
        revocar la autorizaci&oacute;n y/o solicitar la supresi&oacute;n de sus datos, en
        forma gratuita, comun&iacute;quese al correo
        <strong @click="openEmail()">co-fmprivacy@kpmg.com.</strong>
      </p>
    </div>
    <div class="text-center">
      <v-btn
        color="#00a3a1"
        class="rounded-lg"
        style="font-size: 0.7em; padding-left: 5em; padding-right: 5em"
        large
        @click="
          () => {
            $store.commit('login/setPrivatePolicies', true);
            $router.go(-1);
          }
        "
        dark
        >Aceptar
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    redirectTo() {
      window.open("http://www.kpmg.com/co");
    },
    openEmail() {
      location.href = "mailto:" + "co-fmprivacy@kpmg.com";
    },
  },
  computed: {},
};
</script>
