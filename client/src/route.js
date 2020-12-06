import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue';
import Users from './views/admin/Users.vue';
import myStore from './components/myStore.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
    },
        {
            path: '/users',
            name: 'user',
            component: Users,
        },      {
            path: '/mystore',
            name: 'mystore',
            component: myStore,
        },
    ]
})


export default router;