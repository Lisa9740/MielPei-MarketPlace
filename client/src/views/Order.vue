<template>
  <div>
  <v-container v-if="isLogged">

    <h1 class="pa-7">Mes Commandes</h1>
    <template>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step
              :complete="e1 > 1"
              step="1"
          >
            Mon Panier
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
              :complete="e1 > 2"
              step="2"
          >
            Adresse de livraison
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step  :complete="e1 > 3" step="3">
            Confirmation
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step  step="4">
            Terminé
          </v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
             <CartCheckout :e1="e1" @change-step="update"/>
          </v-stepper-content>

          <v-stepper-content step="2">
            <StepTwo :e1="e1" @change-step="update" :orderData="orderData" @order-data="getFinalOrderData" />
          </v-stepper-content>

          <v-stepper-content step="3">
            <StepThree :e1="e1" :orderData="orderData"  @change-step="update" />
          </v-stepper-content>

          <v-stepper-content step="4">
            <p> Votre commande à été traité !</p>
            <v-btn> Génerer pdf de votre facture</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </template>
  </v-container>

  <v-container v-if="!isLogged">
    <h1>Mes Commandes</h1>
   <Login/>
  </v-container>
  </div>
</template>

<script>
import Login from './login/Login.vue'
import CartCheckout from "@/components/order/CartCheckout";
import userConfig from "@/utils/userConfig";
import StepTwo from "@/components/order/StepTwo";
import StepThree from "@/components/order/StepThree";


export default {
  components: {Login, CartCheckout, StepThree, StepTwo},
  data: () => ({
    e1: 1,
    orderData: [],
    valid: true,
    user: JSON.parse(userConfig.getUser()),
  }),
  methods: {
    update(e1){
      this.e1 = e1;
    },
    getFinalOrderData(orderData) {
        this.orderData = orderData;
    },
  },
  computed: {
    isLogged() {
      return this.$store.getters.getUserToken
    }
  },
}
</script>