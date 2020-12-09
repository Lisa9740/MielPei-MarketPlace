<template>
  <div class="checkout-box">
    <ul class="checkout-list">
      <transition-group name="fade">
        <li v-for="(product, index) in getCart" :key="index" class="checkout-product">
<!--          <img :src="product.image" alt="" class="product-image">-->
          <span >{{ product.name }}</span>
          <span > {{ product.price }},00 €</span>
          <button class="product-remove" @click="remove(index)">X</button>
        </li>
      </transition-group>
    </ul>

    <div v-if="!hasProduct()" class="text-center">
      <span>Oups, il n'y a pas encore de produit...</span>

    </div>
    <h3 class="total" v-if="hasProduct()">
      Total: {{ totalPrice() }}, 00 €
    </h3>
    <router-link
      to="/order"
      >
    <v-btn
        v-if="hasProduct()"
    >
    Commander
  </v-btn>
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "CartCheckout",
  computed: {
    ...mapGetters([
            'getCart'
    ]),
  },
  methods: {
    ...mapActions([
      'removeProduct',
    ]),
    hasProduct() {
      return this.getCart.length > 0;
    },
    totalPrice() {
      return this.getCart.reduce((current, next) =>
          current + next.price, 0);
    },
    remove(index) {
      this.removeProduct(index);
    },
  },

};
</script>

<style scoped>
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
  grid-template-columns: 1fr 3fr 2fr .5fr;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
  border-radius: 5px;
  list-style: none;
  box-sizing: border-box;
  padding: .8em;
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
  width: 20px;
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