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
          <h1 class="TitleTerms ml-5">T&eacute;rminos y condiciones</h1>
        </v-col>
      </v-row>

      <p class="termsText">
        Usted est&aacute; autorizado para usar este sistema inform&aacute;tico para asuntos
        del negocio. Todas las actividades son monitoreadas de acuerdo a la
        regulaci&oacute;n vigente. Usted deber&aacute; mantener en estricta confidencialidad
        su contrase&ntilde;a para el acceso a esta aplicaci&oacute;n y ser&aacute; responsable por
        todas las operaciones que se hagan con su cuenta de usuario. Usted se
        obliga a no alterar, ni remover, ni divulgar los datos confidenciales,
        datos personales o informaci&oacute;n de clientes que son recopilados,
        procesados o almacenados en este sistema.
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
            $store.commit('login/setTermsAndConditions', true);
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
  methods: {},
  computed: {},
};
</script>
