<template>
  <div>
  <v-container v-if="isLogged">
    <h1>Mes Commandes</h1>
    <template>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step
              :complete="e1 > 1"
              step="1"
          >
            Récapitulatif
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
              :complete="e1 > 2"
              step="2"
          >
            Paiement
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            Confirmation
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
             <CartCheckout/>


            <v-btn
                color="primary"
                @click="e1 = 2"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
            ></v-card>

            <v-btn
                color="primary"
                @click="e1 = 3"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
            ></v-card>

            <v-btn
                color="primary"
                @click="e1 = 1"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
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
import CartCheckout from "@/components/CartCheckout";
export default {
  components: {Login, CartCheckout},
  data: () => ({
    e1: 1,
  })
  , computed: {
    isLogged() {
      return this.$store.getters.getUserToken
    }
  }
}
</script>