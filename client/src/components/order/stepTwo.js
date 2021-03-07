import userConfig from "@/utils/userConfig";
import AddLivraisonAdresse from "@/components/AddLivraisonAdresse";
import {mapGetters} from "vuex";
import {APIService} from "@/service/service";


let api = new  APIService();
export default {
    name: "StepTwo",
    props: ['e1', 'orderData'],
    data: () => ({
        selected: 'radio-1',
        isAdding: false,
        valid: true,
        firstName: "",
        lastName: "",
        email: "",
        verify: "",
        user: JSON.parse(userConfig.getUser()),
        livraisonData: [],
        show1: false,
        rules: {
            required: value => !!value || "Required.",
            min: v => (v && v.length >= 8) || "Min 8 characters"
        }
    }),
    components: {
        AddLivraisonAdresse
    },
    computed: {
        ...mapGetters([
            'getCart'
        ]),
    },
    methods: {
        nextStep() {
            let etape3 = this.e1;
            etape3++;
            this.$emit("change-step", etape3)

        },
        getSelectedValue(v) {
            this.selected = v;
        },
        update(adresse) {
            this.isAdding = adresse
        },

        async postOrderData() {
            let isReady = this.$refs.orderForm.validate();

            let dataSend = {
                name: this.name,
                adresse: this.selected.name,
                userId: this.user.id,
                products: this.getCart,
                status: 1
            }
            if (isReady) {
                const connectInfo = await api.createOrder(dataSend);
                console.log('postOrderData', connectInfo.data);

                this.nextStep();
                this.flashMessage.success({
                    message: connectInfo.data.message,
                    time: 5000,
                });
                this.retrieveUserOrderData()
            }
        },

        retrieveLivraisonOrderData() {
            api.getOrderDeliveryAddress(this.user.id).then(data => {
                this.livraisonData.push(data.data)
                console.log(data.data)
            });
        },

        retrieveUserOrderData() {
            api.getOrder(this.user.id).then(data => {
                this.$emit("order-data", { order : data.data.order, livraison : this.selected })
            });
        },

        addLivraison: function (computer) {
            this.livraisonData[0].push(computer);
        },
    },
    created() {
        this.retrieveLivraisonOrderData()
        console.log('cart', this.getCart)
    }


};