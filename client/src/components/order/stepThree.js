import userConfig from "@/utils/userConfig";
import Axios from "axios";

export default {
    name: "StepThree",
    props: ['e1', 'orderData'],
    data: () => ({
        user: JSON.parse(userConfig.getUser()),
    }),
    methods: {
        nextStep() {
            let etape3 = this.e1;
            etape3 = 4;
            this.$emit("change-step", etape3)
        },

        getTotalPrice() {
            let result = null;
            let thisOrder = this.orderData.order.products
            thisOrder.forEach(function (value) {
                result += value.price * value.quantity;
            })
            return result
        },

        async setOrderPaid() {
            this.nextStep()
            let dataSend = {
                userId: this.user.id,
            }
            const connectInfo = await Axios.post('http://127.0.0.1:4000/api/order/payment', dataSend);
            this.flashMessage.success({
                message: connectInfo.data.message,
                time: 5000,
            });
        },
    },
};