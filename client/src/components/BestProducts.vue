<template>
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
</template>
<script>
import {mapActions} from "vuex";
import CartButton from "@/components/CartButton";

export default {
  name: "BestProducts",

  computed: {
    products() {
      return this.$store.state.products
    },
  },
  components: {
    CartButton,
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
