import Axios from 'axios';
import tokenConfig from '../../utils/tokenConfig';
import Register from "@/views/register/Register";
import userConfig from '../../utils/userConfig'
export default {
    name:"Login",
    data: () => ({
        valid: true,
        email: '',
        emailRules: [
            v => !!v || 'Adresse E-mail est requis',
            v => /.+@.+\..+/.test(v) || 'Adresse email invalide',
        ],
        password: '',
        passwordRule: [
            v => !!v || 'Le mot de passe est requis',
        ],
    }),
    components: { Register },
    computed: {
        products() {
            return this.$store.state.products
        },
        getProductsInCart(){
            return this.$store.state.cart
        }
    },
    methods: {
        async validate() {
            let isReady = this.$refs.form.validate();
            let dataSend = {
                email : this.email,
                password : this.password,
                cartProducts: this.getProductsInCart
            }
            if(isReady) {
                const connectInfo = await Axios.post('http://localhost:4000/api/login', dataSend);

                if(connectInfo.data.token) {

                    tokenConfig.setToken(connectInfo.data.token);
                    userConfig.setUser(JSON.stringify(connectInfo.data))
                    location.href = '/';
                    // this.$router.push('/');

                    this.flashMessage.success({
                        message: connectInfo.data.message,
                        time: 5000,
                    });
                } else {

                    this.flashMessage.error({
                        message: connectInfo.data.message,
                        time: 5000,
                    });
                }
            }
        }
    },
    mounted() {
        this.$store.dispatch("getProducts");

    },
}