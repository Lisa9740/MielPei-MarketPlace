<template>

  <div v-if="orderData">
    <h3> Récapitulatif de votre commande #{{ orderData.order.id}}</h3>
    <v-spacer></v-spacer>

    <v-card
        class="mx-auto"
        flat
    >
      <v-container>
        <v-row>
          <v-col v-if="orderData.livraison">
            <v-list>
              <v-subheader>Adresse de livraison</v-subheader>
              <v-list-item>
                {{ orderData.livraison.name }} <br>
                {{ orderData.livraison.adresse }} <br>
                {{ orderData.livraison.commune }} <br>
              </v-list-item>
            </v-list>

          </v-col>
        </v-row>

        <v-divider></v-divider>
        <h4 class="mt-4"> Produit Commandés</h4>
        <v-spacer></v-spacer>
        <div v-if="orderData.order">
          <v-row>
            <v-col class="d-block justify-center">
              <div class="d-block" v-for="(products, index) in orderData.order.products" :key="index">
                <v-row justify="end">
                  <v-col cols="1">
                    <v-img src="https://placehold.it/20x20" width="100px"></v-img>
                  </v-col>
                  <v-col>
                    {{ products.name }} - {{ products.price }} € - <small> quantité : {{ products.quantity }}</small>
                    <v-spacer></v-spacer>
                    {{ products.Exploitation.commune}}
                  </v-col>
                </v-row>
              </div>
              <h3 class="text-right"> Total à payer</h3>
              <v-divider></v-divider>
              <div class="text-right"> {{ getTotalPrice() }}, 00 €</div>
            </v-col>
          </v-row>
        </div>
        <v-btn @click="setOrderPaid">Payer</v-btn>
      </v-container>

    </v-card>
  </div>

</template>

<script src="./stepThree.js"></script>