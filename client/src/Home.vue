<template>

  <v-container>
    <h1 class="mb-5 mt-5">Bienvenue à MielPéi! {{user}}</h1>
    <v-row>
      <v-col cols="6" class="pa-6">
        <MapExploitation/>
      </v-col>
      <v-col cols="6" class="pa-6">
        <v-card class="pa-5">
          <v-card-text>
            <h2>Nos exploitants fournissent le meilleur miel de l'ile de la réunion</h2>
            <p class="mt-3"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cum dicta doloremque et ipsa
              magnam maxime necessitatibus,
              possimus quis quos repellendus, sint tempore. Beatae commodi obcaecati reiciendis,
              repellendus suscipit velit?</p>
            <v-img src="https://via.placeholder.com/100x100" height="120px"></v-img>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>


    <v-container>
      <h2 class="mt-8"> Meilleurs produits encore en stock</h2>
      <v-divider class="yellow-divider"></v-divider>
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="product in products[0]" :key="product.id">
          <v-card>
            <v-img
                height="140"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-text>
                <strong>{{ product.price }}  </strong> € •
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
    </v-container>
  </v-container>
</template>


<style>
#mapContainer {
  width: 60vw;
  height: 60vh;
  z-index: 3;
}
</style>

<script>
import CartButton from "./components/CartButton";
import {mapActions} from "vuex";
import MapExploitation from "./components/MapExploitation";
import userConfig from "@/utils/userConfig";


export default {
  data: () => ({
    user: userConfig.getUser()
  }),
  components: {
    CartButton,
    MapExploitation
  },
  computed: {
    products() {
      return this.$store.state.products
    },


  },

  methods: {
    ...mapActions([
      'addProductToCart',
      'currentProduct',
    ]),

    addCurrentProduct(product) {
      this.currentProduct(product);
    },

  },
  mounted() {
    this.$store.dispatch("getProducts");


  },
}
</script>