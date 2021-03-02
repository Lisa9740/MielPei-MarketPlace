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