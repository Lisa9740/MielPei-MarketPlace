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
          <v-btn @click="isAdding = true">Ajouter nouvel adresse</v-btn>

          <v-form ref="orderForm" v-model="valid">
              <v-row>
                <v-list-item-content
                    class="text-justify"
                >
                  <v-radio-group
                      v-model="selected"
                      :mandatory="false"
                  >
                    <v-radio
                        value='radio-1'
                        class="d-none"
                    ></v-radio>
                    <v-radio
                        v-for="adresse in livraisonData[0]"
                        :key="adresse.id"
                        :label="adresse.name + ' - ' + adresse.adresse "
                        :value="adresse"
                       @change="getSelectedValue(adresse.id)">
                    </v-radio>
                  </v-radio-group>
                </v-list-item-content>
              </v-row>
            <v-btn @click="postOrderData">Continuer</v-btn>
          </v-form>
        </v-list>
      </v-container>
    </v-card>

    <v-container v-if="isAdding">
      <AddLivraisonAdresse :isAdding="isAdding" @change-state="update" @add="addLivraison"/>
    </v-container>
  </div>

</template>
<script src="./stepTwo.js"></script>