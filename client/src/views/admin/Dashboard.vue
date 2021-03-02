<template>
  <div id="container">
    <v-container>
      <h2 class="pa-7">Bienvenue !</h2>
    <Users/>
    </v-container>
  </div>
</template>
<script>

import Users from './Users'
export default {
  name: "Dashboard",
  components : { Users },

}
</script>