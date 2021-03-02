<template>
  <v-container>
    <h2 class="mb-5 mt-5">Bienvenue à MielPéi! <span v-if="user">{{user.firstName}} {{user.lastName}}</span></h2>

    <v-row>
      <v-col cols="6" class="pa-6">
        <MapExploitation/>
      </v-col>
      <v-col cols="6" class="pa-6">
        <v-card class="pa-5">
          <v-card-text>
            <h2>Nos exploitants fournissent le meilleur miel de l'ile de la réunion</h2>
            <p class="mt-3"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cum dicta doloremque et ipsa
              magnam maxime necessitatibus,
              possimus quis quos repellendus, sint tempore. Beatae commodi obcaecati reiciendis,
              repellendus suscipit velit?</p>
            <v-img src="https://via.placeholder.com/100x100" height="120px"></v-img>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-container>
      <h2 class="mt-8"> Meilleurs produits encore en stock</h2>
      <v-divider class="yellow-divider"></v-divider>
      <BestProducts/>
    </v-container>
  </v-container>
</template>


<style>
#mapContainer {
  width: 60vw;
  height: 60vh;
  z-index: 3;
}
</style>

<script>
import BestProducts from "@/components/BestProducts";
import MapExploitation from "./components/MapExploitation";
import userConfig from "@/utils/userConfig";

export default {
  data: () => ({
    user: JSON.parse(userConfig.getUser())
  }),
  components: {
    MapExploitation,
    BestProducts
  },
}
</script>