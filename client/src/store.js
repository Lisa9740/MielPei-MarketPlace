import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import tokenConfig from "@/utils/tokenConfig";
import userConfig from "@/utils/userConfig";

Vue.use(Vuex);

let cart = window.localStorage.getItem('cart');
export default new Vuex.Store({

    state: {
        isLogged: tokenConfig.getToken(),
        user: userConfig.getUserId(),
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
        getUser: state => state.userData,
        getUserToken: state => state.isLogged,
        getProducts: state => state.products,
        getProductsInCart: state => state.cartProducts,
        getCurrentProduct: state => state.currentProduct,
        getShowModal: state => state.showModal,
        getPopupCart: state => state.showPopupCart,
    },

    mutations: {
        SAVE_CART: (state) => {
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        SET_PRODUCT: (state, product) => {
            state.products.push(product);
        },
        ADD_PRODUCT_TO_CART: (state, product) => {
            state.cart.push(product);
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
        SHOW_POPUP_CART: (state) => {
            state.showPopupCart = !state.showPopupCart;
        },
    },

    actions: {
        getProducts: ({commit}) => {
            axios.get('http://127.0.0.1:4000/api/products')
                    .then(response => {
                        commit('SET_PRODUCT', response.data)
                        console.log(response.data)
                    })

        },
        addProductToCart: (context, product) => {
            context.commit('ADD_PRODUCT_TO_CART', product);
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