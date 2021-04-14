import userConfig from "@/utils/userConfig";
import {APIService} from "@/service/service";

let api = new APIService();
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
                console.log("hé",this.orderData.order)
                let thisOrder = this.orderData.order
            thisOrder.forEach(function (value) {
                result += value.products.product.price * value.products.product.quantity;
            })
                return result


        },
        getExploitationData(){

        },
        async setOrderPaid() {
            this.nextStep()
            let dataSend = {
                userId : this.user.id,
                reference: this.orderData.order[0].reference,
            }

            const connectInfo = await api.setOrderPaid(dataSend);
            this.flashMessage.success({
                message: connectInfo.data.message,
                time: 5000,
            });
        },
    },
};