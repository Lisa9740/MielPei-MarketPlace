
<template>
<v-container>
  <v-form ref="registerForm" v-model="valid" lazy-validation>
    <h2 class="text-center">Vous pouvez vous inscrire </h2>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field color="#1b3043" v-model="firstName" :rules="[rules.required]" label="Prénom" maxlength="20" required></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field color="#1b3043" v-model="lastName" :rules="[rules.required]" label="Nom" maxlength="20" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field color="#1b3043" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field color="#1b3043" v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Mot de passes" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirmation du mot de passe" counter @click:append="show1 = !show1"></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex ma-5" cols="12" sm="3" xsm="12">
        <v-btn x-large block :disabled="!valid" color="success" @click="validate">S'inscrire</v-btn>
      </v-col>
    </v-row>
  </v-form>
</v-container>
</template>
<script>
import tokenConfig from "@/utils/tokenConfig";
import {APIService} from "@/service/service";

let api = new APIService();
export default {
  name: 'Register',
  data: () => ({
    valid: true,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    }
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods : {
    async validate() {
      let isReady = this.$refs.registerForm.validate();
      let dataSend = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }
      if (isReady) {

        const connectInfo = await api.register(dataSend);
        console.log(connectInfo);
        if (connectInfo.data.token) {
          tokenConfig.setToken(connectInfo.data.token);
         /* tokenConfig.setFirstName(connectInfo.data.firstName)
          tokenConfig.setLastName(connectInfo.data.lastName)*/
          location.href = '/';
          // this.$router.push('/');
          console.log('true', connectInfo.data);
          this.flashMessage.success({
            message: connectInfo.data.message,
            time: 5000,
          });
        } else {
          console.log('false', connectInfo.data);
          this.flashMessage.error({
            message: connectInfo.data.message,
            time: 5000,
          });
        }
      }
    }
  }
}

</script>