<template>
  <div id="container">
    <v-container fluid>
      <h2 class="pa-7">Mes produits</h2>
      <v-row>
        <v-col cols="2">
          <template>
            <Menu/>
          </template>
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
                                <v-text-field
                                    v-model="editedItem.inStock"
                                    :value="inStock"
                                    label="En stock"
                                    required
                                ></v-text-field>
                              </v-col>
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
                                @click="postNewProduct(editedItem)"
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
import Menu from  "./Menu.vue"
import {APIService} from "@/service/service";

let api = new APIService();
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
      {text: 'En stock', value: 'inStock'},
      {text: 'Description', value: 'description'},
      {text: 'Actions', value: 'actions', sortable: true},
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      price: '',
      inStock: 0,
      description: '',
    },
    defaultItem: {
      id: 0,
      name: '',
      price: '',
      inStock: 0,
      description: '',
    },
    price: '',
    name: '',
    inStock: '',
    user: JSON.parse(userConfig.getUser()),
  }),
  components: { Menu },
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
    async postNewProduct(element){
      let dataSend = {
        name: element.name,
        inStock: element.inStock,
        price: element.price,
        exploitationId: this.ficheId,
        description: element.description,
      }
      const connectInfo = await api.createProduct(dataSend);
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
        inStock: this.editedItem.inStock,
        description: this.editedItem.description,
        exploitationId : this.ficheId,

      }


      const connectInfo = await api.editProduct(dataSend);


      this.save(dataSend)

      this.flashMessage.success({
        message: connectInfo.data.message,
        time: 5000,
      });

    },
    retrieveFicheProducteur() {
      api.getExploitationByUser(this.user.id)
          .then(response => {
            console.log("exploitationn", response);
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
        this.products.push(this.editedItem)
      }
      this.close()
    },
  },
  created() {
    this.retrieveFicheProducteur()
  }

}
</script>