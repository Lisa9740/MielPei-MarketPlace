import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue';
import Users from './views/admin/Users.vue';
import myStore from './components/ListProduct.vue';
import Order from './views/Order.vue'
import Login from './views/login/Login.vue'
import AdminDashboard from './views/admin/Dashboard.vue'
import userConfig from "@/utils/userConfig";
import ProducteurDashboard from './views/producteurs/dashboard.vue'
import FicheProducteur from "@/views/FicheProducteur.vue";
import HistoryOrder from "@/views/HistoricOrder.vue"
import Products from "@/views/producteurs/Products";
//import tokenConfig from "./utils/tokenConfig";

Vue.use(VueRouter);


 const isAdmin = (to, from, next) => {
    if (userConfig.getUser() != null) {
        let user = JSON.parse(userConfig.getUser())
        if (user.roleId === 1 ){
            next ()
        }

    }
 }

 const isProducteur = (to, from, next) => {
     if (userConfig.getUser() != null){
         let user = JSON.parse(userConfig.getUser())
         if (user.roleId === 3 ){
             next ()
         }
     }
 }

/*
//check if is not authenticated
const isNotAuthenticated = (to, from, next) => {
    if (!tokenConfig.getToken()) {
        return location.href = '/login'
    }
    next()
}
*/

// check if user is connected
/*
const isAuthenticated = (to, from, next) => {
    if (tokenConfig.getToken() != null) {
        return location.href = '/';
    }
    next()
}
*/





const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,

        },
        {
        path: '/',
        name: 'home',
        component: Home,

    },
        {
            path: '/users',
            name: 'user',
            component: Users,
        },
        {
            path: '/mystore',
            name: 'mystore',
            component: myStore,

        },
        {
            path: '/order',
            name: 'order',
            component: Order,

        },
        {
            path: '/order/history',
            name: 'Historyorder',
            component: HistoryOrder,

        },
        {
            path:'/admin/dashboard',
            name: 'dashboard',
            beforeEnter: isAdmin,
            component: AdminDashboard,
        },
        {
            path:'/producteur/dashboard',
            name: 'ProducteurDashboard',
            beforeEnter: isProducteur,
            component: ProducteurDashboard,
        },
        {
            path:'/producteur/dashboard/products',
            name: 'Products',
            beforeEnter: isProducteur,
            component: Products,
        },
        {
            path:'/fiche/:id',
            name: 'FicheProducteur',
            component: FicheProducteur,
            props: true
        }

    ]
})


export default router;