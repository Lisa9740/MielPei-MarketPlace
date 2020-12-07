<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-text>
    <v-row>
      <v-col>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div class="card p-5 w-50 mx-auto shadow">
            <h2 class="text-center">Veuillez vous connectez </h2>
            <v-form ref="form" v-model="valid" lazy-validation >
              <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Adresse e-mail"
                  required
                  type="email"
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  :rules="passwordRule"
                  label="Mot de passe"
                  required
                  type="password"
              ></v-text-field>

              <div class="d-flex justify-content-end">
                <v-btn :disabled="!valid" color="#f90" class="text-white" @click="validate" >
                  Connexion
                </v-btn>
              </div>
            </v-form>
          </div>
        </div>
      </v-col>
      <v-col>
        <Register/>
      </v-col>
    </v-row>
      </v-card-text>
    </v-card>


  </v-container>
</template>

<script src="./login.js"></script>