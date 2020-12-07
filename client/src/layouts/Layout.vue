<template>
  <v-app>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet" />
    <!-- main with router view that import to handle routes -->
    <v-main class="bg-grey">

     <Navbar/>
        <router-view></router-view>

    </v-main>

    <!-- flash message component -->
    <flashMessage></flashMessage>
  </v-app>
</template>
<style>
.bg-blue{
  background-color: #1B3043 !important;
}

.bg-grey{
  background-color: #C4C4C4 !important;
}
.t-yellow{
  color: #EDBE58 !important;
}

.w-img{
  width: 25px;
}
</style>
<script>
/*import { authenticationService } from "../_services/authentication.service";
import router from "./router.js"*/
import Navbar from "../components/navigation/Nav.vue";

export default {
 components:{
   Navbar
 }
  /*computed: {
    isChecked() {
      return this.currentUser;
    },
  },

  methods: {
    logout() {
      authenticationService.logout();
      this.sheet = !this.sheet
      router.push("/login");

    },
    show: function () {
      this.isDisplay = true;
    },
    hide: function () {
      this.isDisplay = false;
    }
  },


  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }*/
};
</script>