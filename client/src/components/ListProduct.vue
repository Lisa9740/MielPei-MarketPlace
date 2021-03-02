

<template>
  <v-container>
  <div class="hello">

    <v-row>
      <v-col v-for='product in products[0]' :key='product.id'>
        <v-card flat>
          <v-img
              height="140"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-text>
            <strong>{{ product.price }}  </strong> € •
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
  </div>
  </v-container>
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
      'addProductToCart',
    ]),

    addCurrentProduct(product) {
      this.currentProduct(product);
    },
  },
  mounted() {
    this.$store.dispatch("getProducts");
  }
}
</script>

