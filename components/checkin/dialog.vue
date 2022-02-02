<template>
  <v-row justify="center">
    <v-dialog
      v-model="openDialog"
      persistent
      max-width="290"
    >

      <v-card>
        <v-card-title class="headline">
          <!--Use Google's location service?-->
        </v-card-title>
        <v-card-text>
          <figure class="figure-upload">
            <img src="/check/upimg.png" alt="">
            <figcaption>
              Seleccionar o tomar una foto de la galer&iacute;a que tenga buena luz    
            </figcaption>
          </figure>
          <br/>
          <div class="action-upload">
            <v-btn
              text
              class="btn-upload"
              @click="close()"
            >
              <img src="/check/image.png"> Galeria
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
  props: ["openDialog"],
    data () {
      return {
      }
    },
    methods:{
      close(){
        this.$emit("close","true");
      }
    }
  };
</script>
<style lang="scss">
    .action-upload{
      display: flex;
      justify-content: center;

    }
    .btn-upload{
        display: flex;
        background-color: #0691DA!important;
        color: #fff!important;
        border-radius: 10px;
        width: 140px;
        justify-content: space-around;
    }
  .figure-upload{
    text-align: center;
    img{
      width: 140px;
    }
    figcaption{
      font-family: sfProDisplayMedium;
      color: #00338D !important;
      font-size: 18px !important;
      margin-top: 23px;
    }
  }

  .v-dialog{
    max-width: 350px!important;
    border-radius: 25px!important;
  }
</style>