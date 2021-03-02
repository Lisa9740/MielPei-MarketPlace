<template>
<v-card height="200px">
<v-container>
  <v-list>
    <v-list-item-group >
      <router-link class="no-link-style" to="/producteur/dashboard">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Ma fiche descriptif</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link class="no-link-style" to="/producteur/dashboard/products">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Mes produits</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </router-link>
      <router-link class="no-link-style" to="/producteur/dashboard/orders">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Commandes clients</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </router-link>
    </v-list-item-group>
  </v-list>
</v-container>
</v-card>
</template>