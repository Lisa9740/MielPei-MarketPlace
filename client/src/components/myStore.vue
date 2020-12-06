

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-row>
      <v-col v-for='product in products[0]' :key='product.id'>
        <v-card>
          <v-img
              height="140"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
        <h3>{{product.price}}</h3>
          <h3>{{product.description}}</h3>
          <CartButton
              :cartIcon="true"
              @click.native="addProductToCart(product)"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CartButton from "./CartButton";

export default {
  name: 'myStore',
  data () {
    return {
      msg: 'Welcome to my Vuex Store'
    }
  },
  components: {
    CartButton
  },
  computed: {
    products() {
      return this.$store.state.products
    }
  },
  methods: {
    ...mapActions([
      'addProduct',
      'currentProduct',
    ]),
    addProductToCart(product) {
      this.addProduct(product);
    },
    addCurrentProduct(product) {
      this.currentProduct(product);
    },
  },
  mounted() {
    this.$store.dispatch("getProduct");
  }
}
</script>

