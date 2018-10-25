<template>
          <v-container fluid>   
            <v-snackbar
              v-model="snackbar"
              absolute
              top
              right
              color="success"
            >
              <span>Le Client a été ajouté !</span>
              <v-icon dark>check_circle</v-icon>
            </v-snackbar>
            <v-layout align-center justify-center>
              <v-flex v-if="!$store.state.isUserLoggedIn" xs12 sm10 md8>
                <v-alert
                  :value="true"
                  type="error"
                >
                  You need to be logged in.
                </v-alert>
              </v-flex>
              <v-flex v-if="$store.state.isUserLoggedIn" xs12 sm10 md8>
                <v-slide-x-transition origin="top left 0">
                  <v-card class="elevation-7">
                    <v-toolbar dark color="primary">
                      <v-toolbar-title>Ajouter un Client</v-toolbar-title>
                      <v-spacer></v-spacer>
                      
                    </v-toolbar>
                    <v-card-text>
                    <v-form v-model="valid">
                      <v-flex>
                        <v-text-field
                          color="accent"
                          v-model="client.nom"
                          :rules="nomRules"
                          :counter="10"
                          label="Nom du client"
                          required
                        ></v-text-field>
                        <v-text-field
                          color="accent"
                          v-model="client.entreprise"
                          :rules="entrepriseRules"
                          :counter="10"
                          label="Entreprise"
                          required
                        ></v-text-field>
                        <v-text-field
                          color="accent"
                          v-model="client.telephoneEntreprise"
                          :rules="telephoneRules"
                          :counter="10"
                          :mask="telephoneMask"
                          label="Telephone Entreprise"
                          required
                        ></v-text-field>
                        <v-text-field
                          color="accent"
                          v-model="client.telephoneOptionnel"
                          :rules="telephoneRules"
                          :counter="10"
                          :mask="telephoneMask"
                          label="Telephone Optionnel"
                          required
                        ></v-text-field>
                      <v-menu
                        ref="menu2"
                        :close-on-content-click="false"
                        v-model="menu2"
                        :nudge-right="40"
                        :return-value.sync="date"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          color="primary"
                          slot="activator"
                          v-model="client.date"
                          label="Date de la vente"
                          prepend-icon="event"
                          readonly
                          :rules="dateRules"
                          required
                        ></v-text-field>
                        <v-date-picker v-model="client.date" color="primary" @input="$refs.menu2.save(date)"></v-date-picker>

                      </v-menu>
                      </v-flex>
                      <v-text-field
                        color="primary"
                        v-model="client.email"
                        :rules="emailRules"
                        :counter="10"
                        label="Courriel"
                        required
                      ></v-text-field>
                      <v-select
                        :items="forfaits"
                        v-model="client.forfait"
                        label="Standard"
                        required
                      ></v-select>
                      <v-select
                        :items="vendeurs"
                        v-model="client.vendeur"
                        label="Vendeur"
                        required
                      ></v-select>
                      <v-text-field
                        color="primary"
                        v-model="client.forfait"
                        :rules="forfaitRules"
                        :counter="10"
                        label="Forfait"
                        required
                      ></v-text-field>
                      <v-text-field
                        color="primary"
                        v-model="client.domaine"
                        :rules="domaineRules"
                        :counter="10"
                        label="Domaine"
                        required
                      ></v-text-field>
                    </v-form>
                    </v-card-text>
                      <div class="error--text" v-html="error" />
                    <v-card-actions>
                      <v-flex>
                      <v-btn large align-center @click="create" color="primary">Ajouter un client</v-btn>
                      </v-flex>
                    </v-card-actions>
                  </v-card>                  
                </v-slide-x-transition>
              </v-flex>
            </v-layout>
          </v-container>
</template>

<script>
import ClientsService from '@/services/ClientsService';
export default {
  data() {
    return {
      client: {    
        nom: "",    
        date: null,
        email: "",
        forfait: "",
        domaine: "",
        telephoneEntreprise: ""
      },
      menu: false,
      modal: false,
      menu2: false,
      landscape: false,
      reactive: false,
      valid: false,
      snackbar: false,
      telephoneMask: "phone",
      forfaits: ["Présence", "Cible", "Complet", "SEO", "Premium"],

      //---------rules----------//

      nomRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      dateRules: [
        v => !!v || "Date is required",
        v => v.length <= 10 || "Date must be less than 10 characters"
      ],
      forfaitRules: [
        v => !!v || "Forfait is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      domaineRules: [
        v => !!v || "Domaine is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },

      //---------methods----------//

  methods: {
    async create () {
    //   this.error = null
    //   const areAllFieldsFilledIn = Object
    //     .keys(this.client)
    //     .every(key => !!this.client[key])
    //   if (!areAllFieldsFilledIn) {
    //     this.error = 'Please fill in all the required fields.'
    //     return
    //   }
      try {
        this.snackbar = true
        await ClientsService.post(this.client)
        setTimeout(() => { this.reroute() }, 2000)
      } catch (err) {
        console.log(err)
      }
    },
    
    reroute() {      
      this.$router.push({
          name: 'viewClients'
        })
    }
  },
  name: "AddUser"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
