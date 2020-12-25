<template>
  <v-container>
    <h2>Mon historique de commande</h2>

    <v-card class="mt-4 pa-5" v-for="order in orders[0].order" :key="order.id">
      <v-card-text>
      <v-row>
        <v-col>
          <div v-if="order.status === 1">
            Non terminé
          </div>
          <div v-if="order.status === 2">
            En cours de traitement
          </div>
          <div v-if="order.status === 3">
            En cours de livraison
          </div>
          <p>Commande #{{ order.id }}</p>
          <p>Crée le {{ order.createdAt}}</p>
        </v-col>
        <v-col>

        </v-col>
        <v-col></v-col>
      </v-row>
      </v-card-text>
    </v-card>

  </v-container>
</template>
<script>
import axios from "axios";
import userConfig from "@/utils/userConfig";

export default {

  data: () => ({
    orders: [],
    user: JSON.parse(userConfig.getUser())
  }),
  methods: {
    retrieveOrderHistory() {
      axios.get('http://127.0.0.1:4000/api/' + this.user.id +'/order/history').then(response => {
            this.orders.push(response.data)
          })
    }
  },
  mounted() {
    this.retrieveOrderHistory()
  }
}
</script>