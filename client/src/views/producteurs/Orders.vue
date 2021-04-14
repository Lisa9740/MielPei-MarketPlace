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
                     Commande #{{editedItem.reference}}
                    </v-card-title>


                    <v-card-text>
                      <v-container>
                        <v-form>
                          <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                              <span v-if="editedItem.status !== 3">En attente de traitement</span>
                              <span  v-if="editedItem.status === 3">Terminé</span>

                            </v-col>
                          </v-row>
                        </v-form>
                        <div v-for="products in editedItem.products" :key="products.id">
                          {{ products.name}}<br>
                          Quantité : {{ products.quantity}}<br>
                          Prix total : {{ products.quantity * products.price}}

                        </div>

                        <v-btn
                            class="mt-5"
                            color="#EDBE58"
                            @click="setOrderFinished(editedItem)"
                            v-if="editedItem.status !== 3"

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
            <template v-slot:item.status="{ item }">
              <v-chip
                  :color="getColor(item.status)"
                  dark
              >
                <span v-if="item.status === 2">A traité</span>
                <span v-if="item.status === 3">Traité</span>

              </v-chip>
            </template>
            <template v-slot:item.createdAt="{ item }">
              {{ new Date(item.createdAt) | dateFormat('DD/MM/YYYY hh:mm')  }}
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
import userConfig from "@/utils/userConfig";
import Menu from './Menu.vue'
import {APIService} from "@/service/service";


let api = new APIService();
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
      {text: 'Reference', value: 'reference'},
      {text: 'Produit', value: 'products.product.name'},
      {text: 'Quantité', value: 'products.product.quantity'},
      {text: 'Prix (unité)', value: 'products.product.price'},
      {text: 'Date commande', value: 'createdAt'},
      {text: 'Status', value: 'status', sortable: true},
      {text: 'Actions', value: 'actions', sortable: true},
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      reference: '',
      status: 0,
      orders : []
    },
    defaultItem: {
      id: 0,
      reference: '',
      status: '0',
      orders : []
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  methods: {
    getColor (calories) {
      if (calories === 2) return 'orange'
      else if (calories === 3) return 'green'
      else return 'red'
    },
    formatStatusValue(orders) {
        if (orders.status === 1) {
          this.deleteItem(orders)
        } else if (orders.status === 2){
          orders.status = 'A traité'
        }
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
            this.orders = response.data.order

            this.formatStatusValue(
                this.orders
            )
          })
    },

    async setOrderFinished(element) {

      let dataSend = {
        id : element.id,
        reference: element.reference,
        data: element
      }

      const connectInfo = await api.setOrderFinished(dataSend);
      this.save(dataSend.data);
      this.flashMessage.success({
        message: connectInfo.data.message,
        time: 5000,
      });
    },
    editItem (item) {
      console.log(item)
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