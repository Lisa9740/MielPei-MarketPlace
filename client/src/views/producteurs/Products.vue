<template>
  <div id="container">
    <v-container fluid>
      <h2 class="pa-7">Mes produits</h2>

      <v-row>
        <v-col cols="2">
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
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Mes produits</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Mes produits commandés</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-container>
          </v-card>
        </v-col>
        <v-col>

            <v-data-table
                :headers="headers"
                :items="products"
                :items-per-page="5"
                class="elevation-1"
            >

              <template v-slot:top>
                <v-toolbar
                    flat
                >
                  <v-toolbar-title>Gestion des produits de {{fiche.name}}</v-toolbar-title>
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
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                      >
                        Ajouter un produit
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">
                        {{ formTitle }}
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

                              <v-col
                                  cols="12"
                                  md="6"
                              >
                                <v-text-field
                                    v-model="editedItem.price"
                                    :value="price"
                                    label="Prix"
                                    required
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col
                                  cols="12"
                              >
                                <v-textarea
                                    v-model="editedItem.description"
                                    :value="description"
                                    label="Description"
                                ></v-textarea>
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


                        <v-btn v-if="editedItem.id === ''"
                               color="blue darken-1"
                               text
                               :disabled="!valid"
                                @click="postNewProduct"
                        >
                          {{buttonName}}
                        </v-btn>

                        <v-btn v-if="editedItem.id !== ''"
                               color="blue darken-1"
                               text
                               :disabled="!valid"
                               @click="editProduct"
                        >
                          {{buttonName}}
                        </v-btn>


                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text >Cancel</v-btn>
                        <v-btn color="blue darken-1" text>OK</v-btn>
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
<style>
.no-link-style{
  text-decoration : none;
  color: black !important;
}
</style>
<script>
import userConfig from "@/utils/userConfig";
import axios from "axios";
import Axios from "axios";

export default {
  name: "AllProducts",
  data: () => ({
    valid: true,
    fiche: [],
    ficheId : 0,
    products: [],
    description: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {text: 'ID', value: 'id'},
      {text: 'Nom', value: 'name'},
      {text: 'Price', value: 'price'},
      {text: 'En stock', value: ''},
      {text: 'Description', value: 'description'},
      {text: 'Actions', value: 'actions', sortable: true},
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      price: '',
      description: '',
    },
    defaultItem: {
      id: 0,
      name: '',
      price: '',
      description: '',
    },
    price: '',
    name: '',
    user: JSON.parse(userConfig.getUser()),
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Ajouter un produit' : 'Editer un produit'
    },
    buttonName() {
      return this.editedIndex === -1 ? 'Ajouter' : 'Editer'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    async postNewProduct(){
      let dataSend = {
        name: this.name,
        price: this.price,
        exploitationId: this.ficheId,
        description: this.description,
      }

      console.log(dataSend)

      const connectInfo = await Axios.post('http://127.0.0.1:4000/api/products/create', dataSend);
      console.log(connectInfo);

      this.retrieveFicheProducteur()
      this.flashMessage.success({
        message: connectInfo.data.message,
        time: 5000,
      });
    },
    async editProduct() {
      let dataSend = {
        id: this.editedItem.id,
        name: this.editedItem.name,
        price: this.editedItem.price,
        description: this.editedItem.description,
        exploitationId : this.ficheId,

      }

      const connectInfo = await Axios.post('http://127.0.0.1:4000/api/products/edit', dataSend);
      console.log(connectInfo);

      this.save(dataSend)

      this.flashMessage.success({
        message: connectInfo.data.message,
        time: 5000,
      });

    },
    retrieveFicheProducteur() {
      axios.get('http://127.0.0.1:4000/api/exploitations/' + this.user.id)
          .then(response => {
            if (response){
              this.fiche = response.data.fiche
              this.products = response.data.product
              this.ficheId = response.data.fiche.id
              console.log(this.fiche)
            }


          })
    },
    editItem(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    },
  },
  created() {
    this.retrieveFicheProducteur()
  }

}
</script>