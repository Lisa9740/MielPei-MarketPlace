<template>
  <div>
  <v-container v-if="isLogged">
    <h1>Mes Commandes</h1>
    <CartCheckout/>
  </v-container>
  <v-container v-if="!isLogged">
    <h1>Mes Commandes</h1>
   <Login/>
  </v-container>
  </div>
</template>

<script>
import CartCheckout from '../components/CartCheckout.vue';

import Login from './login/Login.vue'
export default {
  components: {CartCheckout,Login},
  data: () => ({

  })
  , computed: {
    isLogged() {
      return this.$store.getters.getUserToken    }
  }
}
</script>