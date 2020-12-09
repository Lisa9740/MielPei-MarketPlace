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
                const connectInfo = await Axios.post('http://127.0.0.1:4000/api/login', dataSend);

                if(connectInfo.data.token) {

                    tokenConfig.setToken(connectInfo.data.token);
                    userConfig.setUser(connectInfo.data.user.username)
                    userConfig.setUserId(connectInfo.data.user.id)
                    location.href = '/';
                    // this.$router.push('/');

                    console.log('true', connectInfo.data);
                    this.flashMessage.success({
                        message: connectInfo.data.message,
                        time: 5000,
                    });
                } else {
                    console.log('false',connectInfo.data);
                    this.flashMessage.error({
                        message: connectInfo.data.message,
                        time: 5000,
                    });
                }
            }
        }
    },
    mounted() {
        this.$store.dispatch("getProduct");

    },
}