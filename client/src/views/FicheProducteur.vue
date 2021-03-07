<template>
  <div>

    <v-container>
      <v-card flat class="pa-6">
        <h2 class="text-center"> Bienvenue chez {{ fiche.name }}</h2>
        <v-spacer></v-spacer>

        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            <p class="text-justify">
              {{ fiche.description }}
            </p>
          </v-col>
          <v-col>
            <v-img src="https://placehold.it/20x20" width="500px" height="300px"></v-img>
          </v-col>
        </v-row>


        <v-divider></v-divider>
        <h3 class="mt-4"> Nos produits</h3>
        <v-row v-if="products.length === 0">
          <v-col>
          <p> Nous n'avons pas encore de produits..</p>
          </v-col>
        </v-row>
        <v-row v-if="products.length !== 0">
          <v-col cols="3" v-for='product in products' :key='product.id'>
            <v-card flat>
              <v-img
                  height="140"
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-text>
                <strong>{{ product.price }} </strong> € •
                {{ product.description }}
                <v-row
                    align="center"
                    class="mx-0"
                >
                  <v-rating
                      :value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                  ></v-rating>

                  <div class="grey--text ml-4">
                    4.5 (413)
                  </div>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <CartButton :cartIcon="true" @click.native="addProductToCart(product)"/>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <p class="mt-7">
          Nous retrouver: <br>
          {{ fiche.adresse }}<br>
          {{ fiche.commune }}
        </p>

      </v-card>

    </v-container>
  </div>

</template>

<script>
import CartButton from "@/components/CartButton";
import {mapActions} from "vuex";
import {APIService} from "@/service/service";

let api = new  APIService();
export default {
  props: ['id'],
  data: () => ({
    fiche: [],
    products: [],
  }),
  components: {
    CartButton
  },
  methods: {
    ...mapActions([
      'addProductToCart',
    ]),
    retrieveFicheProducteur() {
      api.getExploitation(this.id)
          .then(response => {
            this.fiche = response.data.fiche
            this.products = response.data.product
            console.log(this.fiche, this.products)
          })
    }
  },
  mounted() {
    this.retrieveFicheProducteur()
  }
}
</script>