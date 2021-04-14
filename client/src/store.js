import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import tokenConfig from "@/utils/tokenConfig";
import userConfig from "@/utils/userConfig";
import {APIService} from "./service/service.js"

Vue.use(Vuex);

let cart = window.localStorage.getItem('cart');

let api = new APIService();

export default new Vuex.Store({
    state: {
        isLogged: tokenConfig.getToken(),
        user: JSON.parse(userConfig.getUser()),
        exploitations: [],
        userData: [],
        products: [],
        cart: cart ? JSON.parse(cart) : [],
        cartProducts: [],
        currentProduct: {},
        showModal: false,
        showPopupCart: false,
    },

    getters: {
        getCart: state => state.cart,
        getUserToken: state => state.isLogged,
        getProducts: state => state.products,
        getProductsInCart: state => state.cartProducts,
        getCurrentProduct: state => state.currentProduct,
        getShowModal: state => state.showModal,
    },

    mutations: {
        SAVE_CART: (state) => {
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        SET_PRODUCT: (state, product) => {
            state.products.push(product);
        },
        SET_EXPLOITATION: (state, exploitations) => {
          state.exploitations.push(exploitations)
        },
        ADD_PRODUCT_TO_CART: (state, product) => {
            if (state.cart.includes(product)){
                let index = state.cart.indexOf(product);
                product.quantity = product.quantity + 1
                state.cart[index] = product;
            }else{
                state.cart.push(product);
            }
        },
        SET_PRODUCT_CART_QUANTITY: (state, product) => {
            if (state.cart.includes(product)){
                let index = state.cart.indexOf(product);
                product.quantity = product.quantity + 1
                state.cart[index] = product;
            }
        },
        UNSET_PRODUCT_CART_QUANTITY: (state, product) => {
            if (state.cart.includes(product)){
                let index = state.cart.indexOf(product);
                product.quantity = product.quantity - 1
                state.cart[index] = product;

                if (product.quantity === 0){
                    state.cart.splice(index, 1);
                }
            }
        },
        REMOVE_PRODUCT: (state, index) => {
            state.cart.splice(index, 1);
        },
        CURRENT_PRODUCT: (state, product) => {
            state.currentProduct = product;
        },
        SHOW_MODAL: (state) => {
            state.showModal = !state.showModal;
        },
    },

    actions: {
        getExploitations: ({commit}) => {
            axios.get('http://31.220.54.89:4000/api/exploitations')
                .then(response => {
                    commit('SET_EXPLOITATION', response)

                })

        },
        getProducts: ({commit}) => {
            api.getApiProducts().then(response => {
                        commit('SET_PRODUCT', response.data)

                    })

        },
        addProductToCart: (context, product) => {
            context.commit('ADD_PRODUCT_TO_CART', product);
            context.commit('SAVE_CART');
        },
        setProductQuantityInCart: (context, product) => {
            context.commit('SET_PRODUCT_CART_QUANTITY', product);
            context.commit('SAVE_CART');
        },
        unsetProductQuantityInCart: (context, product) => {
            context.commit('UNSET_PRODUCT_CART_QUANTITY', product);
            context.commit('SAVE_CART');
        },
        removeProduct: (context, index) => {
            context.commit('REMOVE_PRODUCT', index);
            context.commit('SAVE_CART');
        },
        currentProduct: (context, product) => {
            context.commit('CURRENT_PRODUCT', product);
        },
        showOrHiddenModal: (context) => {
            context.commit('SHOW_MODAL');
        },
        showOrHiddenPopupCart: (context) => {
            context.commit('SHOW_POPUP_CART');
        },
    },
});