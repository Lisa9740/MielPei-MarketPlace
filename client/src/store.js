import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import tokenConfig from "@/utils/tokenConfig";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogged: tokenConfig.getToken(),
        products: [],
        cartProducts: [],
        currentProduct: {},
        showModal: false,
        showPopupCart: false,
    },

    getters: {
        getUserToken: state => state.isLogged,
        getProducts: state => state.products,
        getProductsInCart: state => state.cartProducts,
        getCurrentProduct: state => state.currentProduct,
        getShowModal: state => state.showModal,
        getPopupCart: state => state.showPopupCart,
    },

    mutations: {
        SET_PRODUCT: (state, product) => {
            state.products.push(product);
        },
        ADD_PRODUCT: (state, product) => {
            state.cartProducts.push(product);
        },
        REMOVE_PRODUCT: (state, index) => {
            state.cartProducts.splice(index, 1);
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
        getProduct: ({commit}) => {
            axios.get('http://127.0.0.1:4000/api/products')
                    .then(response => {
                        commit('SET_PRODUCT', response.data)
                        console.log(response.data)
                    })

        },
        addProduct: (context, product) => {
            context.commit('ADD_PRODUCT', product);
        },
        removeProduct: (context, index) => {
            context.commit('REMOVE_PRODUCT', index);
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