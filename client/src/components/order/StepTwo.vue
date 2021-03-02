<template>

  <div>
    <h3> Choisir votre adresse de livraison</h3>
    <v-spacer></v-spacer>

    <v-card
        class="mx-auto"
        v-if="!isAdding"
        flat
    >
      <v-container>
        <v-list dense>
          <v-subheader>Mes Adresses</v-subheader>
          <p @click="isAdding = true">
            <v-icon
              slot="append"
              color="green"
              @click.native="setProductQuantityInCart(product)"
          >
            mdi-plus
          </v-icon>
            Ajouter nouvel adresse
          </p>
            <v-form ref="orderForm" v-model="valid">
                <v-row>
                  <v-list-item-content
                      class="text-justify"
                  >
                    <v-radio-group
                        v-model="selected"
                        :mandatory="false"
                        class="pa-5"
                    >
                      <v-radio
                          value='radio-1'
                          class="d-none"
                          color="#e3b248"
                      ></v-radio>
                      <v-radio
                          color="#e3b248"
                          v-for="adresse in livraisonData[0]"
                          :key="adresse.id"
                          :label="adresse.name + ' - ' + adresse.adresse "
                          :value="adresse"
                         @change="getSelectedValue(adresse.id)">
                      </v-radio>
                    </v-radio-group>
                  </v-list-item-content>
                </v-row>
              <v-btn  color="#1b3043" class="text--yellow" @click="postOrderData">Continuer</v-btn>
            </v-form>
        </v-list>
      </v-container>
    </v-card>

    <v-container v-if="isAdding">
      <AddLivraisonAdresse :isAdding="isAdding" @change-state="update" @add="addLivraison"/>
    </v-container>
  </div>

</template>
<style>
.text--yellow {
  color: white !important;
}
</style>
<script src="./stepTwo.js"></script>