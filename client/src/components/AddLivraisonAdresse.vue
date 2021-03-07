<template>
  <v-form ref="addressForm" v-model="valid" lazy-validation>
    <h3 class="text-center">Veuillez définir une adresse pour la livraison de votre commande </h3>
    <v-row>
      <v-col cols="12">
        <v-text-field color="#1b3043" v-model="name" :rules="[rules.required]" label="Nom de l'adresse" maxlength="60" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field color="#1b3043" v-model="adresse" :rules="[rules.required]" label="Adresse" maxlength="60" required></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field color="#1b3043" v-model="codePostal" :rules="[rules.required]" label="Code postal" maxlength="60" required></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field color="#1b3043" v-model="commune" :rules="[rules.required]" label="Commune" maxlength="60" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field color="#1b3043" v-model="telephone" :rules="[rules.required]" label="Numero de téléphone" maxlength="60" required></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex ma-5" cols="12" sm="3" xsm="12">
        <v-btn x-large block :disabled="!valid" color="#1b3043" class="text--white" @click="validate">Ajouter</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import Axios from "axios";
import userConfig from "@/utils/userConfig";
import {APIService} from "@/service/service";

let api = new APIService();
export default {
  props: ['isAdding'],
  data: () => ({
    valid: true,
    livraisonData: [],
    name: "",
    adresse: "",
    commune: "",
    telephone: "",
    codePostal: "",
    user: JSON.parse(userConfig.getUser()),
    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    }
  }),
  methods : {
    backToSelectedAdresse() {
      let isAdding = this.isAdding;
      isAdding = false
      this.$emit("change-state", isAdding)

    },
    async validate() {
      let isReady = this.$refs.addressForm.validate();
      let dataSend = {
        name: this.name,
        adresse: this.adresse,
        commune: this.commune,
        codePostal: this.codePostal,
        userId: this.user.id,
        telephone: this.telephone,
      }
      if (isReady) {

        const connectInfo = await api.createDeliveryAddress(dataSend);
        console.log(connectInfo);
        this.$emit('add', connectInfo.data)
        this.backToSelectedAdresse()
        this.flashMessage.success({
          message: connectInfo.data.message,
          time: 5000,
        });

      }
    },
  },

}
</script>