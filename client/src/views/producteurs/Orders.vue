<template>
  <div id="container">
    <v-container fluid>
      <h2 class="pa-7">Commandes des clients</h2>
      <v-row>
        <v-col cols="2">
          <template>
            <Menu/>
          </template>
        </v-col>
        <v-col>
          {{ orders.orders }}
          <v-data-table
              :headers="headers"
              :items="orders"
              :items-per-page="5"
              class="elevation-1"
          >

            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-toolbar-title>Gestion des commandes de {{fiche.name}}</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                    v-model="dialog"
                    max-width="700px"
                >
                  <v-card>
                    <v-card-title class="headline">
                     Editer status
                    </v-card-title>


                    <v-card-text>
                      <v-container>
                        <v-form>
                          <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >

                              <v-text-field
                                  v-model="editedItem.name"
                                  :value="name"
                                  label="Nom du produit"
                                  required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="blue darken-1"
                          text

                      >
                        Cancel
                      </v-btn>
                      <v-btn v-if="editedItem.id !== ''"
                             color="blue darken-1"
                             text
                             :disabled="!valid"
                      >
                        Changer de status
                      </v-btn>


                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:no-data>
              <v-btn
                  color="primary"
              >
                Reset
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Axios from "axios";
import userConfig from "@/utils/userConfig";
import Menu from './Menu.vue'

export default {
  components: {Menu},
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
    headers: [
      {text: 'ID', value: 'id'},
      {text: 'Status', value: 'status'},
      {text: 'Actions', value: 'actions', sortable: true},
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      status:'0'
    },
  }),

  methods: {
    formatStatusValue(orders) {
      orders.forEach( order => {
        if (order.status === 1) {
          order.status = 'Non terminée'
        } else if (status === 2){
          order.status = 'A traité'
        }
      })
    },
    retrieveFicheProducteur() {
      Axios.get('http://127.0.0.1:4000/api/exploitations/' + this.user.id + '/datas')
          .then(response => {
            this.fiche = response.data.fiche
            this.products = response.data.product
            this.ficheId = response.data.fiche.id
            this.retrieveLastOrders(response.data.fiche.id)

          })
    },
    retrieveLastOrders(element) {
      Axios.get('http://127.0.0.1:4000/api/exploitations/' +  element + '/orders')
          .then(response =>{
            this.orders.push(response.data)
            this.orders = this.orders.flat()
            console.log(('orders' + JSON.stringify(this.orders)))
            this.formatStatusValue(this.orders)
          })
    }
  },
  created() {
    this.retrieveFicheProducteur()

  }
}
</script>