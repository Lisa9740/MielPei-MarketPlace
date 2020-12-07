import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue';
import Users from './views/admin/Users.vue';
import myStore from './components/ListProduct.vue';
import Order from './views/Order.vue'
import Login from './views/login/Login.vue'
import tokenConfig from "./utils/tokenConfig";

Vue.use(VueRouter);


// // check if is not authenticated
// const isNotAuthenticated = (to, from, next) => {
//     if (!tokenConfig.getToken()) {
//         return location.href = '/login'
//     }
//     next()
// }

// check if user is connected
const isAuthenticated = (to, from, next) => {
    if (tokenConfig.getToken() != null) {
        return location.href = '/';
    }
    next()
}


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: isAuthenticated
        },
        {
        path: '/',
        name: 'home',
        component: Home,
            beforeEnter: isAuthenticated
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
            beforeEnter: isAuthenticated
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
            beforeEnter: isAuthenticated
        },

    ]
})


export default router;