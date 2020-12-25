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
      let thisOrder = this.orderData.order.products
      thisOrder.forEach(function (value) {
        result += value.price * value.quantity;
      })
      return result
    },
    createPDF () {
      let pdfName = "Facture" + JSON.stringify(this.orderData.order.id);
      let doc = new jsPDF();

      this.orderData.order.products.forEach( element => {
        console.log("text", element)
        this.pdfData.push([element.name, element.quantity, element.Exploitation.name, element.price])

      })

      doc.text("MielPéi", 10, 20);
      doc.setFontSize(12).text("Commande #" + JSON.stringify(this.orderData.order.id), 12, 30);
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
    generatePDF() {
 /*     const vm = this;
      const columns = [
        {title: "Quantity", dataKey: "quantity"},
        {title: "UnitPrice", dataKey: "unitprice"},
        {title: "Disc%", dataKey: "disk"},
        {title: "Vat%", dataKey: "vat"},
        {title: "ExclTotal", dataKey: "excltotal"},
        {title: "InclTotal", dataKey: "incltotal"}
      ];
      const doc = new jsPDF("p", "pt");
      // text is placed using x, y coordinates
      doc.setFont("times").setFontSize(22).text(420, 40, "TAX INVOICE");
      doc.setFont("times").setFontSize(10).text(400, 70, "NUMBER:");
      doc.setFont("times").setFontSize(10).text(490, 70, "123456789");
      doc.setFont("times").setFontSize(10).text(385, 85, "REFERENCE:");
      doc.setFont("times").setFontSize(10).text(490, 85, "123456789");
      doc.setFont("times").setFontSize(10).text(416, 100, "DATE:");
      doc.setFont("times").setFontSize(10).text(490, 100, "123456789");
      doc.setFont("times").setFontSize(10).text(392, 115, "DUE DATE:");
      doc.setFont("times").setFontSize(10).text(490, 115, "123456789");
      doc.setFont("times").setFontSize(10).text(390, 130, "SALES REP:");
      doc.setFont("times").setFontSize(10).text(490, 130, "123456789");
      doc
          .setFont("times")
          .setFontSize(10)
          .text(330, 145, "OVERALL DISCOUNT %:");
      doc.setFont("times").setFontSize(10).text(490, 145, "123456789");
      doc.setFont("times").setFontSize(10).text(412, 160, "PAGES:");
      doc.setFont("times").setFontSize(10).text(490, 160, "123456789");
      doc.setFont("times").setFontSize(11).text(50, 230, "FROM:");
      doc.setFont("times").setFontSize(11).text(300, 230, "TO:");
      doc.setFont("times").setFontSize(18).text(50, 250, "COMPANY Inc.");
      doc.setFont("times").setFontSize(18).text(300, 250, "COMPANY Inc.");
      doc.setFont("times").setFontSize(11).text(50, 280, "VAT NO:");
      doc.setFont("times").setFontSize(11).text(300, 280, "CUSTOMER VAT NO:");
      doc
          .setFont("times")
          .setFontSize(10)
          .text(50, 290, "1355 Market Street, Suite 900");
      doc
          .setFont("times")
          .setFontSize(10)
          .text(300, 290, "1355 Market Street, Suite 900");
      doc
          .setFont("times")
          .setFontSize(10)
          .text(50, 300, "San Francisco, CA 94103");
      doc
          .setFont("times")
          .setFontSize(10)
          .text(300, 300, "San Francisco, CA 94103");
      doc.setFont("times").setFontSize(10).text(50, 310, "P: (123) 456-7890");
      doc.setFont("times").setFontSize(10).text(300, 310, "P: (123) 456-7890");

      //doc.autoTable(columns, vm.items, {margin: {top: 350}});

      doc.setLineWidth(2);
      doc.line(560, 725, 40, 725);

      doc.save(`${this.heading}.pdf`);*/
    }


  },
  computed: {
    isLogged() {
      return this.$store.getters.getUserToken
    }
  },

}
</script>