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
                        Ajouter compte
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.id"
                              ></v-text-field>
                              <v-text-field
                                  v-model="editedItem.firstName"
                                  :value="firstName"
                                  label="Prénom"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.lastName"
                                  :value="lastName"
                                  label="Nom"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >


                            </v-col>

                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                              v-model="editedItem.email"
                              label="Email"
                              :value="email"
                              ></v-text-field>
                              Rôle de l'utilisateur
                              <v-select
                                  v-model="editedItem.roleId"
                                  :items="roles"
                                  item-text="role"
                                  item-value="id"
                                  :label="getSelectedRoleName(editedItem, roles)"
                                  persistent-hint
                                  return-object
                                  single-line
                              ></v-select>
                              <v-switch
                                  v-model="editedItem.isActive"
                                  :value="isActive"
                                  label="Activer compte"
                              ></v-switch>


                            </v-col>
                          </v-row>
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
                            @click="addUser(editedItem)"
                        >
                          {{buttonName}}
                        </v-btn>

                        <v-btn v-if="editedItem.id !== ''"
                               color="blue darken-1"
                               text
                               :disabled="!valid"
                               @click="editUser(editedItem)"
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
          </template>

      </v-container>
  </div>
</template>
<script>
import {APIService} from '@/service/service.js';

let api = new APIService();
export default {
  name: "Users",
  data() {
    return{
      isAdding : false,
      users : [],
      dialog: false,
      dialogDelete: false,
      select: { role: 'Producteur', id: 'roleId' },
      roles : [
          {role : 'Producteur', id: 3 },
          {role : 'Client', id: 2 },
          {role : 'Administrateur', id: 1}
      ],
      headers: [
        { text:'ID', value: 'id'},
        { text:'Nom', value: 'lastName'},
        { text:'Prénom', value: 'firstName'},
        { text:'Email', value: 'email'},
        { text: 'Compte actifs', value: 'isActive'},
        { text:'Role', value: 'Role.name'},
        { text: 'Actions', value: 'actions', sortable: true },
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        roleName: '',
        roleId: '',
        isActive: 0,
        Role: 0,
      },
      defaultItem: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        roleName: '',
        roleId: '',
        isActive: '',
        Role: 0,
      },
      valid: true,
      id: '',
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isActive: false,
      verify: "",
      emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 8) || "Min 8 characters"
      },

    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Ajouter compte' : 'Editer compte'
    },
    buttonName() {
      return this.editedIndex === -1 ? 'Ajouter' : 'Editer'
    },
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
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
    async addUser(element) {
      console.log(element.roleId)
      let dataSend = {
        Role: {
          id : element.roleId.id,
          name: element.roleId.role
        },
        firstName: element.firstName,
        lastName: element.lastName,
        email: element.email,
        roleId : element.roleId.id,
        isActive: element.isActive
      }

      console.log(dataSend)

        const connectInfo = await api.createUser(dataSend);
        console.log(connectInfo);

        this.users.push(dataSend)
        this.flashMessage.success({
            message: connectInfo.data.message,
            time: 5000,
          });
    },
    async editUser() {
      let dataSend = {
        userId: this.editedItem.id,
        Role: {
          id : this.editedItem.roleId.id,
          name: this.editedItem.roleId.role
        },
        firstName: this.editedItem.firstName,
        lastName: this.editedItem.lastName,
        email: this.editedItem.email,
        roleId : this.editedItem.roleId.id,
        isActive: this.editedItem.isActive

      }

      const connectInfo = await api.editUser(dataSend);
      console.log(connectInfo);
      let formattedData = {
        id: this.editedItem.id,
        Role: {
          id : this.editedItem.roleId.id,
          name: this.editedItem.roleId.role
        },
        firstName: this.editedItem.firstName,
        lastName: this.editedItem.lastName,
        email: this.editedItem.email,
        roleId : this.editedItem.roleId.id,
        isActive: this.editedItem.isActive
      }

      this.save(formattedData)

      this.flashMessage.success({
        message: connectInfo.data.message,
        time: 5000,
      });

    },
    retrieveUsers: function () {
      this.users = [];

      api.getUsers()
          .then(({data}) => {
            this.users = data;
            console.log("récupération des users", data)
          }).catch(error => {
        console.log(error);
      })
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    getSelectedRoleName(item, roles){
      let selectedRole = []
      if (this.dialog){
        console.log('item', item, 'role', roles)
        roles.forEach(role => {
          if (role.id === item.roleId){
            selectedRole.push(role.role)
          }
        })
        console.log(selectedRole)
        if (selectedRole.length !== 0){
          return JSON.stringify(selectedRole[0].toString())
        }
        return "Role"
      }
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
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    },
  },
  mounted() {
    this.retrieveUsers();
  },
}
</script>