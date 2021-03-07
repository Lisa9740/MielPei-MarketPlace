<template>
  <div id="container">
    <v-container fluid>
      <h2 class="pa-7">Gestion de mon exploitation</h2>
      <v-row>
        <v-col cols="2">
          <template>
            <Menu/>
          </template>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title class="pa-7"> {{ fiche.name }}</v-card-title>

            <v-card-text class="pa-5">
              <div class="text-center">
                <v-dialog
                    v-model="dialog"
                    width="500"
                >
              <template v-slot:activator="{ on, attrs }">
              <v-btn class="mb-7" v-if="fiche.length === 0"
                     v-bind="attrs"
                     v-on="on">
               Ajouter mon exploitation
              </v-btn>
              </template>
                  <v-card>
                    <v-card-title class="headline">
                      Ajouter mon exploitation
                    </v-card-title>

                    <v-card-text>
                      <v-form>
                        <v-row>
                          <v-col
                              cols="12"
                              md="6"
                          >
                            <v-text-field
                                v-model="name"
                                label="Nom de l'exploitation"
                                required
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                              md="6"
                          >
                            <v-text-field
                                v-model="commune"
                                label="Commune"
                                required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                              cols="12"
                          >
                            <v-text-field
                                v-model="adresse"
                                label="Adresse"
                                required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                              cols="6"
                              md="4"
                          >
                            <v-text-field
                                v-model="latitude"
                                label="Latitude"
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="6"
                              md="4"
                          >
                            <v-text-field
                                v-model="longitude"
                                label="Longitude"
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                          >
                            <v-textarea
                                v-model="description"
                                label="Description"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="primary"
                          text
                          @click="postNewExploitation()"
                      >
                        Créer
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                </div>
              <v-spacer></v-spacer>
              <h4>Ma fiche descriptive</h4>
              <p>{{ fiche.description }}</p>
              <!--            <v-textarea
                              name="input-7-1"
                              label="Ma description"
                              color="#1b3043"
                              class="pa-7"
                              :value=fiche.description
                              hint="Hint text"
                          ></v-textarea>-->
              <h4>Mes dernières commandes</h4>
              {{ this.orders}}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>


  </div>
</template>
<style>
.no-link-style{
  text-decoration : none;
  color: black !important;
}
</style>
<script>
import Axios from "axios";
import userConfig from "@/utils/userConfig";
import Menu from "@/views/producteurs/Menu";
import {APIService} from "@/service/service";

let api = new APIService();
export default {
  data: () => ({
    dialog: false,
    fiche: [],
    products: [],
    ficheId : "",
    orders: [],
    description: "",
    user: JSON.parse(userConfig.getUser()),
    name: "",
    commune: "",
    adresse: "",
    longitude: "",
    latitude: "",
  }),
  components: { Menu },
  methods: {
    async postNewExploitation(){
      let dataSend = {
        name: this.name,
        adresse: this.adresse,
        commune: this.commune,
        longitude : this.longitude,
        latitude : this.latitude,
        description: this.description,
        userId : this.user.idmielpei
      }

      const connectInfo = await api.createExploitations(dataSend);

     this.retrieveFicheProducteur()

      this.flashMessage.success({
        message: connectInfo.data.message,
        time: 5000,
      });
    },
    retrieveFicheProducteur() {
      api.getExploitationByUser(this.user.id)
          .then(response => {
            this.fiche = response.data.fiche
            this.products = response.data.product
            this.ficheId = response.data.fiche.id
            this.retrieveLastOrders(response.data.fiche.id)
          })
    },
    retrieveLastOrders(element) {
      api.getExploitationOrders(element)
      .then(response =>{
        this.orders.push(response.data)
        this.orders = this.orders.flat()
      })
    }

  },
  created() {
    this.retrieveFicheProducteur()
  }
}
</script>