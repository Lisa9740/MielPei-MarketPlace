<template>
  <div>
  <v-container v-if="isLogged">

    <h1 class="pa-7">Mes Commandes</h1>
    <router-link
        to="/order/history"
    >
    Historique de mes commandes
    </router-link>
    <template>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step
              :complete="e1 > 1"
              color="#e3b248"
              step="1"
          >
            Mon Panier
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
              :complete="e1 > 2"
              color="#e3b248"
              step="2"
          >
            Adresse de livraison
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step  :complete="e1 > 3" color="#e3b248" step="3">
            Confirmation
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step color="#e3b248" step="4">
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
            <v-btn @click="createPDF"> Génerer pdf de votre facture</v-btn>
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
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'


export default {
  components: {Login, CartCheckout, StepThree, StepTwo},
  data: () => ({
    e1: 1,
    heading: "Facture",
    orderData: [],
    pdfData: [],
    valid: true,
    user: JSON.parse(userConfig.getUser()),
    url: ""
  }),
  methods: {
    update(e1) {
      this.e1 = e1;
    },
    getFinalOrderData(orderData) {
      this.orderData = orderData;
    },
    getTotalPrice() {
      let result = null;
      let thisOrder = this.orderData.order
      thisOrder.forEach(function (value) {
        result += value.products.product.price * value.products.product.quantity;
      })
      return result
    },
    createPDF () {
      let pdfName = "Facture" + this.orderData.order[0].reference;
      let doc = new jsPDF();

      this.orderData.order.forEach( element => {

        this.pdfData.push([element.products.product.name, element.products.product.quantity, element.products.product.Exploitation.name, element.products.product.price])

      })

      doc.text("MielPéi", 10, 20);
      doc.setFontSize(12).text("Commande #" + this.orderData.order[0].reference, 12, 30);
      doc.setFontSize(10).text("Adresse de livraison", 15, 40);
      doc.setFontSize(10).text(this.orderData.livraison.name, 15, 45)
      doc.setFontSize(10).text(this.orderData.livraison.adresse, 15, 50)
      autoTable( doc, {
        headStyles: { fillColor: [27, 48, 67] },
        margin: { top: 60 },
        head: [['Produit', 'Quantité', 'Exploitation', 'Price']],
        body: this.pdfData,
      })
      doc.setFontSize(12).text('TOTAL: ' + this.getTotalPrice() + " euros", 160, 120)
      //doc.addImage(img, 'png', 15, 40, 180, 160);
      doc.save(pdfName + '.pdf');
    },


  },
  computed: {
    isLogged() {
      return this.$store.getters.getUserToken
    }
  },

}
</script>