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
                     Command #{{editedItem.id}}
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
                                  v-model="editedItem.status"
                                  :value="name"
                                  label="Status"
                                  required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                        {{ editedItem.orders}}
                        <ul id="example-2">
                       <li v-for="(products, index) in editedItem.orders.product" :key="index">
                       {{products.name}}, {{ index}}
                       </li>
                        </ul>

                        <v-btn
                            color="blue darken-1"
                            text

                        >
                          Mettre le statut de la commande en traité
                        </v-btn>

                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                  small
                  @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
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
import _ from 'lodash';


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
      status:0,
      orders : []
    },
    defaultItem: {
      id: '',
      status: '0',
      orders : []
    }
  }),

  methods: {
    formatStatusValue(orders) {
        if (orders.status === 1) {
          this.deleteItem(orders)
        } else if (orders.status === 2){
          orders.status = 'A traité'
        }
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
            this.orders = response.data
            const result = []

            const grouped = [_.groupBy(this.orders, 'orderId')];
            console.log("grouped" + grouped[0].length, grouped[0], this.orders)
            for (let i=0; i<grouped.length; i++){
              result.push({order : grouped[i][1]})
            }

            console.log(result)
            this.formatStatusValue(this.orders)
          })
    },
    editItem (item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteItem (item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.orders.splice(this.editedIndex, 1)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.orders[this.editedIndex], this.editedItem)
      } else {
        this.orders.push(this.editedItem)
      }

    },
  },
  created() {
    this.retrieveFicheProducteur()

  }
}
</script>