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
        </v-col>
        <v-col>
          <p>Commande #{{ order.id }}</p>
          <p>Crée le {{ new Date(order.createdAt) | dateFormat('DD.MM.YYYY à h h mm')  }}</p>
          <div v-for="products in order.products" :key="products.id">
            {{ products.name}} - {{products.price}} €
          </div>
        </v-col>
        <v-col></v-col>
      </v-row>
      </v-card-text>
    </v-card>

  </v-container>
</template>
<script>
import userConfig from "@/utils/userConfig";
import {APIService} from "@/service/service";

let api = new APIService();
export default {

  data: () => ({
    orders: [],
    user: JSON.parse(userConfig.getUser())
  }),
  methods: {
    retrieveOrderHistory() {
      api.getUserHistoryOrder(this.user.id).then(response => {
            this.orders.push(response.data)
          })
    }
  },
  mounted() {
    this.retrieveOrderHistory()
  }
}
</script>