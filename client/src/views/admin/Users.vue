<template>
  <div id="container">
    <v-container>
          <template>
            <v-data-table
                :headers="headers"
                :items="users"
                :items-per-page="5"
                class="elevation-1"
            >

              <template v-slot:top>
                <v-toolbar
                    flat
                >
                  <v-toolbar-title>Gestion des utilisateurs de MielPéi</v-toolbar-title>
                  <v-divider
                      class="mx-4"
                      inset
                      vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog
                      v-model="dialog"
                      max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                      >
                        Ajouter compte
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline"></span>
                      </v-card-title>

                      <v-card-text>

                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text

                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                        >
                          Save
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
              <template v-slot:item.actions="">
                <v-icon
                    small
                    class="mr-2"

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
          </template>

      </v-container>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: "Users",
  data() {
    return{
      users : [],
      dialog: false,
      dialogDelete: false,
      headers: [
        { text:'Nom', value: 'lastName'},
        { text:'Prénom', value: 'firstName'},
        { text:'Email', value: 'email'},
        { text: 'Compte actifs', value: 'isActive'},
        { text:'Role', value: 'Role.name'},
        { text: 'Actions', value: 'actions', sortable: true },

      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        firstName: 0,
        email: 0,
        Role: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },

    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Ajouter compte' : 'Edit Item'
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
    retrieveUsers: function () {
      this.users = [];
      axios.get('http://127.0.0.1:4000/api/users')
          .then(({data}) => {
            this.users = data;
            console.log("récupération des users", data)
          }).catch(error => {
        console.log(error);
      })
    }
  },
  editItem (item) {
    this.editedIndex = this.users.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
  },

  deleteItem (item) {
    this.editedIndex = this.users.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialogDelete = true
  },

  deleteItemConfirm () {
    this.users.splice(this.editedIndex, 1)
    this.closeDelete()
  },

  close () {
    this.dialog = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    })
  },

  closeDelete () {
    this.dialogDelete = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    })
  },

  save () {
    if (this.editedIndex > -1) {
      Object.assign(this.desserts[this.editedIndex], this.editedItem)
    } else {
      this.desserts.push(this.editedItem)
    }
    this.close()
  },



  mounted() {
    this.retrieveUsers();
  },
}
</script>