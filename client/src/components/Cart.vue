<template>
  <div class="checkout-box">
    <h3 class="mb-6">Mon panier</h3>
    <div class="checkout-list">
      <transition-group name="fade">
        <div v-for="(product, index) in getCart" :key="index">
          <v-list-item>
            <v-list-item-content>
          <span class="text-left">{{ product.name }} </span> <br>

          <v-span class="d-inline-block">
            {{ product.price }},00 €
            <v-icon
                class="ml-8"
                slot="prepend"
                color="red"
                @click.native="unsetProductQuantityInCart(product)"
            >
              mdi-minus
            </v-icon>

            {{ product.quantity }}

            <v-icon
                slot="append"
                color="green"
                @click.native="setProductQuantityInCart(product)"
            >
              mdi-plus  res.status(200).send(data);
            </v-icon>
          </v-span>

            </v-list-item-content>
            <button class="product-remove" @click="remove(index)">X</button>
          </v-list-item>

          <v-divider></v-divider>
        </div>

      </transition-group>
    </div>

    <div v-if="!hasProduct()" class="text-center">
      <span>Oups, il n'y a pas encore de produit...</span>

    </div>
    <strong class="text-right mt-4" v-if="hasProduct()">
      Total: {{ totalPrice() }}, 00 €
    </strong>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import userConfig from "@/utils/userConfig";

export default {
  name: "CartCheckout",
  props: ['e1'],
  data: () => ({
    user: JSON.parse(userConfig.getUser()),
    quantity: "",
    product: "",
  }),
  computed: {
    ...mapGetters([
      'getCart'
    ]),
  },
  methods: {
    ...mapActions([
      'removeProduct',
      'setProductQuantityInCart',
      'unsetProductQuantityInCart',

    ]),
    nextStep() {
      let etape = this.e1;
      etape++;
      this.$emit("change-step", etape)
    },
    hasProduct() {
      return this.getCart.length > 0;
    },
    totalPrice() {
      return this.getCart.reduce((current, next) =>
          current + next.price * next.quantity, 0);
    },
    remove(index) {
      this.removeProduct(index);
    },
  },

};
</script>

<style scoped>
.text--yellow {
  color: white !important;
}
.checkout-box {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  box-sizing: border-box;
  padding: 1em;
}
.checkout-list {
  padding: 0;
}
.checkout-product {
  display: grid;
  grid-template-columns: 5fr .5fr;
  background-color: #fff;
  border-radius: 5px;
  list-style: none;
  box-sizing: border-box;
  padding: .5em;
  margin: 1em 0;
}
.checkout-product * {
  place-self: center;
}
.product-image {
  grid-column: 1/2;
  width: 50%;
}
.product-name {
  box-sizing: border-box;
}
.product-price {
  font-size: 1em;
  font-weight: bold;
}
.product-remove {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 0;
  background-color: #E0E0E0;
  color: #fff;
  cursor: pointer;
}
.total {
  font-size: 1.5em;
  font-weight: bold;
  align-self: flex-end;
}
.checkout-message {
  font-size: 1.5em;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}
</style>