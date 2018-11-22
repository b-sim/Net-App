<template>
  <v-container id="container" grid-list-xl fluid>   
    <v-snackbar
      class="snackbar"
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Le Client a été ajouté !</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
    <v-layout row align-center justify-center>
      <v-flex d-flex v-if="!$store.state.isUserLoggedIn" xs12 sm10 md8>
        <v-alert
          :value="true"
          type="error"
        >
          You need to be logged in.
        </v-alert>
      </v-flex>
      <v-flex d-flex v-if="$store.state.isUserLoggedIn" xs12 lg10 xg8>
        <v-slide-x-transition origin="top left 0">
          <v-card class="elevation-7 card">

<!-- ================================================================ client ================================================================ -->

            <v-toolbar 
              dark color="primary" 
              >
              <v-toolbar-title class="title">Formulaire pour nouveau client</v-toolbar-title>
              <v-spacer></v-spacer>
              
            </v-toolbar>
            <v-toolbar 
              light color="transparent"
              flat >
              <v-toolbar-title>Client</v-toolbar-title>
              <v-spacer></v-spacer>
              
            </v-toolbar>
            <v-form v-model="valid">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="accent"
                      v-model="client.personnel.nom"
                      :rules="nomRules"
                      :counter="20"
                      label="Nom du client"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="accent"
                      v-model="client.personnel.prenom"
                      :rules="nomRules"
                      :counter="20"
                      label="Prénom du client"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="accent"
                      v-model="client.personnel.telephone"
                      :rules="telephoneRules"
                      :counter="10"
                      :mask="telephoneMask"
                      label="Telephone Client"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="primary"
                      v-model="client.personnel.email"
                      :rules="emailRules"
                      :counter="30"
                      label="Courriel Client"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>

<!-- ================================================================ entreprise ================================================================ -->

              <v-toolbar 
                light color="transparent"
                flat 
                >
                <v-toolbar-title>Entreprise</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="primary"
                      v-model="client.entreprise.nom"
                      :rules="nomRules"
                      :counter="20"
                      label="Nom de l'entreprise"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="primary"
                      v-model="client.entreprise.domaine"
                      :rules="domaineRules"
                      :counter="30"
                      label="Nom de domaine"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="primary"
                      v-model="client.entreprise.telephone1"
                      :rules="telephoneOptionnalRules"
                      :counter="10"
                      :mask="telephoneMask"
                      label="Telephone Principal Entreprise"
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="primary"
                      v-model="client.entreprise.email1"
                      :rules="emailOptionnalRules"
                      :counter="30"
                      label="Courriel Principal Entreprise"
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="primary"
                      v-model="client.entreprise.telephone2"
                      :rules="telephoneOptionnalRules"
                      :counter="10"
                      :mask="telephoneMask"
                      label="Telephone Secondaire Entreprise"
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="primary"
                      v-model="client.entreprise.email2"
                      :rules="emailOptionnalRules"
                      :counter="30"
                      label="Courriel Secondaire Entreprise"
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs12>
                    <v-textarea
                      color="primary"
                      v-model="client.entreprise.adresse"
                      :counter="30"
                      label="Adresse de l'Entreprise"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-card-text>

  <!-- ================================================================ Vente ================================================================ -->

              <v-toolbar 
                light color="transparent"
                flat 
                >
                <v-toolbar-title>Vente</v-toolbar-title>
                <v-spacer></v-spacer>              
              </v-toolbar>

              <v-card-text>                
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6>                    
                    <v-combobox
                      v-model="client.vente.nomTelephoniste"
                      :items="nomTelephonistes"
                      label="Nom du téléphoniste ayant réalisé le premier contact"
                    ></v-combobox>
                  </v-flex>
                  <v-flex d-flex>
                    <v-menu
                      ref="menu"
                      :close-on-content-click="false"
                      v-model="menu"
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
                        v-model="client.vente.datePremierContact"
                        label="Date du premier contact téléphonique"
                        prepend-icon="event"
                        readonly
                        :rules="dateRules"
                        required
                      ></v-text-field>
                      <v-date-picker 
                        v-model="client.vente.datePremierContact" 
                        color="primary" 
                        @input="$refs.menu.save(date)"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>                    
                    <v-combobox
                      v-model="client.vente.nomVendeur"
                      :items="nomVendeurs"
                      label="Nom du vendeur ayant finalisé la vente"
                    ></v-combobox>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
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
                        v-model="client.vente.dateVente"
                        label="Date de la vente"
                        prepend-icon="event"
                        readonly
                        :rules="dateRules"
                        required
                      ></v-text-field>
                      <v-date-picker 
                        v-model="client.vente.dateVente" 
                        color="primary" 
                        @input="$refs.menu2.save(date)"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex d-flex xs-12 sm-6>
                    <v-select
                      :items="forfaits"
                      v-model="client.vente.forfait"
                      label="Forfait"
                      required
                    ></v-select>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="accent"
                      v-model="client.vente.fraisDepart"
                      :counter="20"
                      :rules="amountRules"
                      :mask="numberMask"
                      label="Frais de départ"
                      prefix="$"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-flex text-xs-left xs12>
                      <span
                        class="display-3 font-weight-light"
                        v-text="client.vente.nombreModules"
                      ></span>
                      <span class="subheading font-weight-light mr-1">  MODULES</span>
                      <v-fade-transition>
                        <v-avatar
                          v-if="isPlaying"
                          :color="color"
                          :style="{
                            animationDuration: animationDuration
                          }"
                          class="mb-1 v-avatar--metronome"
                          size="12"
                        ></v-avatar>
                      </v-fade-transition>
                    </v-flex>
                    <v-flex xs6>
                      <v-slider
                        v-model="client.vente.nombreModules"
                        :color="color"
                        :rules="sliderRules"
                        min="0"
                        max="25"
                        thumb-label
                      ></v-slider>
                    </v-flex>
                  </v-flex>  
                        <v-container>
                          <v-layout>
                            <v-flex d-flex>
                              <v-container>
                                <v-layout row wrap>
                                  <v-flex v-for="item in numerosModules" d-flex pa-1 :key="item.key" xs4 sm3 md2 lg1>
                                    <v-card flat>
                                      <v-card-text class="cardBoxes"><v-checkbox class="checkBoxes" v-model="client.vente.modulesChoisis" :label="`${item}`" :value="`${item}`"></v-checkbox></v-card-text>
                                    </v-card>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        <v-container>
                          <v-layout justify-center wrap>
                            <v-flex v-for="item in client.vente.modulesChoisis" :key="item.key" class="moduleCard" xs4 sm3 md2 lg1>
                              <v-card dark color="accent">
                                <v-card-text class="font-weight-bold"> {{ item }} </v-card-text>
                              </v-card>
                            </v-flex>
                          </v-layout>
                              <h3 v-if="client.vente.modulesChoisis.length > maximumModules" class="error--text">vous avez un maximum de {{ maximumModules }} modules avec votre forfait</h3>
                        </v-container>
                </v-layout>    
              </v-card-text>

  <!-- ================================================================ Formulaire ================================================================ -->

              <v-toolbar 
                light color="transparent"
                flat 
                >
                <v-toolbar-title>Formulaire</v-toolbar-title>
                <v-spacer></v-spacer>                      
              </v-toolbar>    
                    <v-flex xs12>
                      <v-divider></v-divider>
                      <v-subheader class="subheading">Services</v-subheader>
                    </v-flex>    
                <v-layout align-center column>
                  <v-flex xs2>
                    <v-select
                        label="Nombre de services vedettes"
                        color="primary"
                        v-model="nombreServicesVedette"
                        :items="compteur"
                        prepend-icon='mdi-minus'
                        :prepend-icon-cb='decrementVedette'
                        append-outer-icon='mdi-plus'
                        :append-outer-icon-cb='incrementVedette'
                    >
                    </v-select>
                  </v-flex>
                </v-layout>
              <v-card-text v-for="(n, index) in nombreServicesVedette" :key="n">                     
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="primary"
                      :counter="20"
                      :label="'Service vedette ' + n"
                      v-model="client.formulaire.servicesVedettes[index].nom"
                      required
                    ></v-text-field> 
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-textarea
                      box
                      color="primary"
                      :counter="100"
                      label="Description du service"
                      v-model="client.formulaire.servicesVedettes[index].detail"
                      required
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-card-text>       
                <v-layout align-center column>
                  <v-flex xs4>
                  </v-flex>
                  <v-flex xs2>
                    <v-select
                        color="primary"
                        label="Nombre de services total"
                        v-model="nombreServicesTotal"
                        :items="compteur"
                        prepend-icon='mdi-minus'
                        :prepend-icon-cb='decrementTotal'
                        append-outer-icon='mdi-plus'
                        :append-outer-icon-cb='incrementTotal'
                    >
                    </v-select>
                  </v-flex>
                </v-layout>
              <v-card-text v-for="(n, index) in nombreServicesTotal" :key="n">                     
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="primary"
                      :counter="20"
                      :label="'Service ' + n"
                      v-model="client.formulaire.servicesTotal[index].nom"
                      required
                    ></v-text-field> 
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-textarea
                      box
                      color="primary"
                      :counter="100"
                      label="Description du service"
                      v-model="client.formulaire.servicesTotal[index].detail"
                      required
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-card-text>         
              <v-card-text>
                <v-layout row wrap>
                  <v-flex d-flex xs12>
                    <v-text-field
                      color="primary"
                      v-model="client.formulaire.slogan"
                      :rules="nomRules"
                      :counter="20"
                      label="Slogan"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs3 sm6 v-for="(item, index) in 4" :key="item.key">
                    <v-text-field
                      color="primary"
                      v-model="client.formulaire.forces[index]"
                      :counter="30"
                      :label="`Forces de lentreprise ` + (index + 1)"
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs12>
                    <v-text-field
                      color="primary"
                      v-model="client.formulaire.mission"
                      :rules="nomRules"
                      :counter="20"
                      label="Mission / but de l'entreprise"
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex xs3 sm6 v-for="(item, index) in 4" :key="item.key">
                    <v-text-field
                      color="primary"
                      v-model="client.formulaire.distinctions[index]"
                      :counter="30"
                      :label="`Distinctions de lentreprise ` + (index + 1)"
                    ></v-text-field>
                  </v-flex>     
                    <v-flex xs12>
                      <v-divider></v-divider>
                      <v-subheader class="subheading">Compteurs</v-subheader>
                    </v-flex>         
                <v-flex d-flex xs6 sm3>
              <v-subheader class="subheading"> {{ client.formulaire.age }} années d'expérience</v-subheader>  
                </v-flex>
                <v-flex d-flex xs6 sm3>                 
                  <v-text-field
                    label="Années d'expérience"
                    v-model="client.formulaire.age"
                    :mask="digitMask"
                  >
                    <v-icon
                      slot="prepend"
                      color="primary"
                      @click="client.formulaire.age--"
                    >
                      mdi-minus
                    </v-icon>

                  </v-text-field>
                    <v-icon
                      slot="append"
                      color="primary"
                      @click="client.formulaire.age++"
                    >
                      mdi-plus
                    </v-icon>
                </v-flex>
                <v-flex d-flex xs6 sm3>                
              <v-subheader class="subheading"> {{ client.formulaire.clientsSatisfaits }} clients satisfaits</v-subheader>     
                </v-flex>
                <v-flex d-flex xs6 sm3>                 
                  <v-text-field
                    label="Clients satisfaits"
                    v-model="client.formulaire.clientsSatisfaits"
                    :mask="digitMask"
                  >
                    <v-icon
                      slot="prepend"
                      color="primary"
                      @click="client.formulaire.clientsSatisfaits--"
                    >
                      mdi-minus
                    </v-icon>

                  </v-text-field>
                    <v-icon
                      slot="append"
                      color="primary"
                      @click="client.formulaire.clientsSatisfaits++"
                    >
                      mdi-plus
                    </v-icon>
                </v-flex>
                <v-flex d-flex xs6 sm3>                
              <v-subheader class="subheading"> {{ client.formulaire.employes }} employés</v-subheader>      
                </v-flex>
                <v-flex d-flex xs6 sm3>                 
                  <v-text-field
                    label="Employés"
                    v-model="client.formulaire.employes"
                    :mask="digitMask"
                  >
                    <v-icon
                      slot="prepend"
                      color="primary"
                      @click="client.formulaire.employes--"
                    >
                      mdi-minus
                    </v-icon>

                  </v-text-field>
                    <v-icon
                      slot="append"
                      color="primary"
                      @click="client.formulaire.employes++"
                    >
                      mdi-plus
                    </v-icon>
                </v-flex>
                <v-flex d-flex xs6 sm3>                      
                  <v-text-field
                    color="primary"
                    v-model="client.formulaire.diversQuantiteNom"
                    :counter="20"
                    label="Nature de la quantité"
                  ></v-text-field>           
                </v-flex>
                <v-flex d-flex xs6 sm3>                 
                  <v-text-field
                    label="Divers"
                    v-model="client.formulaire.diversQuantite"
                    :mask="digitMask"
                  >
                    <v-icon
                      slot="prepend"
                      color="primary"
                      @click="client.formulaire.diversQuantite--"
                    >
                      mdi-minus
                    </v-icon>

                  </v-text-field>
                    <v-icon
                      slot="append"
                      color="primary"
                      @click="client.formulaire.diversQuantite++"
                    >
                      mdi-plus
                    </v-icon>
                </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-textarea
                      color="primary"
                      :counter="100"
                      label="Expertise"
                      v-model="client.formulaire.expertise"
                    ></v-textarea>
                  </v-flex>
                  <v-flex d-flex xs12 sm6>
                    <v-textarea
                      color="primary"
                      :counter="100"
                      label="Équipement"
                      v-model="client.formulaire.equipement"
                    ></v-textarea>
                  </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                      <v-subheader class="subheading">Heures d'ouverture</v-subheader>
                    </v-flex>  
                  <v-flex xs12>
                    <v-layout justify-center>
                      <v-flex d-flex xs12 sm6>
                        <v-layout column>
                            <v-flex xs12 sm6 py-0>
                              <v-text-field
                                color="primary"
                                v-model="client.formulaire.heuresOuverture.lundi"
                                label="Lundi"
                                required
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 py-0>
                              <v-text-field
                                color="primary"
                                v-model="client.formulaire.heuresOuverture.mardi"
                                label="Mardi"
                                required
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 py-0>
                              <v-text-field
                                color="primary"
                                v-model="client.formulaire.heuresOuverture.mercredi"
                                label="Mercredi"
                                required
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 py-0>
                              <v-text-field
                                color="primary"
                                v-model="client.formulaire.heuresOuverture.jeudi"
                                label="Jeudi"
                                required
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 py-0>
                              <v-text-field
                                color="primary"
                                v-model="client.formulaire.heuresOuverture.vendredi"
                                label="Vendredi"
                                required
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 py-0>
                              <v-text-field
                                color="primary"
                                v-model="client.formulaire.heuresOuverture.samedi"
                                label="Samedi"
                                required
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 py-0>
                              <v-text-field
                                color="primary"
                                v-model="client.formulaire.heuresOuverture.dimanche"
                                label="Dimanche"
                                required
                              ></v-text-field>
                            </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                      <v-subheader class="subheading">Médias Sociaux</v-subheader>
                    </v-flex>  
                    <v-flex d-flex xs12 sm6>
                      <v-text-field
                        color="primary"
                        v-model="client.formulaire.mediasSociaux.facebook"
                        :counter="30"
                        label="Facebook"
                      ></v-text-field>
                    </v-flex>
                    <v-flex d-flex xs12 sm6>
                      <v-text-field
                        color="primary"
                        v-model="client.formulaire.mediasSociaux.linkedin"
                        :counter="30"
                        label="LinkedIn"
                      ></v-text-field>
                    </v-flex>
                    <v-flex d-flex xs12 sm6>
                      <v-text-field
                        color="primary"
                        v-model="client.formulaire.mediasSociaux.youtube"
                        :counter="30"
                        label="Youtube"
                      ></v-text-field>
                    </v-flex>
                    <v-flex d-flex xs12 sm6>
                      <v-text-field
                        color="primary"
                        v-model="client.formulaire.mediasSociaux.instagram"
                        :counter="30"
                        label="Instagram"
                      ></v-text-field>
                    </v-flex>

{{ client.formulaire.accreditations }}
              <v-card-text v-for="(n, index) in counterAccreditations" :key="n">                     
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6>
                    <v-text-field
                      color="primary"
                      :counter="20"
                      :label="'Accréditation ' + n"
                      v-model="client.formulaire.accreditations[index]"
                    ></v-text-field> 
                  </v-flex>
                </v-layout> {{ index }}  {{ key }} 
              </v-card-text>     


                </v-layout>
              </v-card-text>
            </v-form>
          <div class="error--text" v-html="error" />
            <v-card-actions>
              <v-container grid-list-xs>
                <v-layout row wrap>
                  <v-flex d-flex>
                    <v-btn 
                    type="submit"
                    large 
                    align-center 
                    @click="create" 
                    color="primary"
                    >
                    Ajouter un client
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-actions>
          </v-card>                  
        </v-slide-x-transition>
      </v-flex>
    </v-layout> 
  </v-container>
</template>

<script>
import ClientsService from "@/services/ClientsService";
export default {
  data() {
    return {
      client: {
        personnel: {
          nom: "",
          prenom: "",
          telephone: "",
          email: ""
        },
        entreprise: {
          nom: "",
          domaine: "",
          email1: "",
          email2: "",
          telephone1: "",
          telephone2: "",
          adresse: ""
        },
        formulaire: {
          servicesVedettes: [],
          servicesTotal: [],
          slogan: "",
          forces: [],
          mission: "",
          distinctions: [],
          age: null,
          clientsSatisfaits: null,
          employes: null,
          diversQuantiteNom: "",
          diversQuantite: null,
          equipement: [],
          expertise: "",
          mediasSociaux: {
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: ""
          },
          heuresOuverture: {
            lundi: "",
            mardi: "",
            mercredi: "",
            jeudi: "",
            vendredi: "",
            samedi: "",
            dimanche: ""
          },
          numeroLicence: "",
          accreditations: [""],
          financement: "",
          notes: ""
        },
        transfert: {
          actif: false,
          nomRegistraire: "",
          emailRegistraire: "",
          nomTechnicien: "",
          emailTechnicien: "",
          courrielsTransfert: false,
          nombreCourriels: null
        },
        vente: {
          nomTelephoniste: "",
          datePremierContact: "",
          nomVendeur: "",
          dateVente: "",
          forfait: "",
          fraisDepart: "",
          modulesChoisis: [],
          nombreModules: 0
        }
      },

      nombreServicesVedette: 0,
      nombreServicesTotal: 0,
      counterAccreditations: 1,
      menu: false,
      menu2: false,
      menu3: false,
      landscape: false,
      reactive: false,
      valid: false,
      snackbar: false,
      telephoneMask: "phone",
      numberMask: "###.##",
      digitMask: "####",
      nomTelephonistes: [
        "Dominic Lessard",
        "Simon Boudreault",
        "Steve Marticotte",
        "Edouard Langis",
        "Sarah Labelle",
        "Marie-Pier Boudreault",
        "Luis-Miguel Daigle",
        "Jean-Marc",
        "Vincent"
      ],
      nomVendeurs: [
        "Dominic Lessard",
        "Luis-Miguel Daigle",
        "Marie-Pier Boudreault"
      ],
      forfaits: ["Présence", "Cible", "Complet", "SEO", "Premium"],
      compteur: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      numerosModules: [
        "A1-A",
        "A1-B",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "P1",
        "P2",
        "P3",
        "P4",
        "S1",
        "S2",
        "S3",
        "S4",
        "S5",
        "G1",
        "G2",
        "G3",
        "G4",
        "G5",
        "AA1",
        "AA2",
        "T1",
        "T2",
        "T3",
        "M1",
        "M2",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "D6",
        "CT1",
        "IL",
        "TA1",
        "FAQ1",
        "V1"
      ],
      chosenModules: [],

      //---------rules----------//

      nomRules: [
        v => !!v || "Nom requis",
        v => v.length <= 40 || "Doit avoir moins de 20 charactères"
      ],
      sliderRules: [
        v =>
          this.maximumModules !== 0 ||
          v == 0 ||
          `Votre forfait ne contient pas de module.`,
        v =>
          v <= this.maximumModules ||
          `Votre forfait ne contient pas plus de ${
            this.maximumModules
          } modules.`
      ],
      domaineRules: [
        v => !!v || "Domaine requis",
        v => /.+\..+/.test(v) || "Le nom de domaine doit être valide"
      ],
      emailRules: [
        v => !!v || "E-mail requis",
        v => /.+@.+/.test(v) || "Le E-mail doit être valide"
      ],
      amountRules: [
        v => !!v || "Montant de départ requis",
        v => /[0-9]/.test(v) || "Entrez un montant de départ valide"
      ],
      emailOptionnalRules: [
        v => /.+@.+|^$/.test(v) || "Le E-mail doit être valide"
      ],
      telephoneRules: [
        v =>
          v.length == 10 ||
          "Entrez seulement les 10 chiffres du numéro de téléphone"
      ],
      telephoneOptionnalRules: [
        v =>
          v.length == 10 ||
          v.length == 0 ||
          "Entrez seulement les 10 chiffres du numéro de téléphone"
      ]
    };
  },

  //---------methods----------//

  methods: {
    sortedModules: function() {
      return this.client.vente.modulesChoisis.sort();
    },

    async create() {
      //   this.error = null
      //   const areAllFieldsFilledIn = Object
      //     .keys(this.client)
      //     .every(key => !!this.client[key])
      //   if (!areAllFieldsFilledIn) {
      //     this.error = 'Please fill in all the required fields.'
      //     return
      //   }
      try {
        this.snackbar = true;
        await ClientsService.postMongo(this.client);
        setTimeout(() => {
          this.reroute();
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    },

    decrementVedette() {
      this.nombreServicesVedette--;
    },
    incrementVedette() {
      this.nombreServicesVedette++;
    },
    decrementTotal() {
      this.nombreServicesTotal--;
    },
    incrementTotal() {
      this.nombreServicesTotal++;
    },

    reroute() {
      this.$router.push({
        name: "viewClients"
      });
    }
  },
  watch: {
    nombreServicesVedette: function(newValue, oldValue) {
      let difference = newValue - oldValue;
      if (newValue < 0) {
        this.nombreServicesVedette = 0;
      } else if (difference === 1) {
        this.client.formulaire.servicesVedettes.push({ nom: "", detail: "" });
      } else if (difference === -1) {
        this.client.formulaire.servicesVedettes.pop();
      } else if (difference > 1) {
        for (let i = 0; i < difference; i++) {
          this.client.formulaire.servicesVedettes.push({ nom: "", detail: "" });
        }
      } else if (difference < 1) {
        let x = Math.abs(difference);
        for (let i = 0; i < x; i++) {
          this.client.formulaire.servicesVedettes.pop();
        }
      }
    },

    nombreServicesTotal: function(newValue, oldValue) {
      let difference = newValue - oldValue;
      if (newValue < 0) {
        this.nombreServicesTotal = 0;
      } else if (difference === 1) {
        this.client.formulaire.servicesTotal.push({ nom: "", detail: "" });
      } else if (difference === -1) {
        this.client.formulaire.servicesTotal.pop();
      } else if (difference > 1) {
        for (let i = 0; i < difference; i++) {
          this.client.formulaire.servicesTotal.push({ nom: "", detail: "" });
        }
      } else if (difference < 1) {
        let x = Math.abs(difference);
        for (let i = 0; i < x; i++) {
          this.client.formulaire.servicesTotal.pop();
        }
      }
    },

    "client.formulaire.accreditations[0]": function() {
      if (
        this.client.formulaire.accreditations[
          this.client.formulaire.accreditations.length - 1
        ] !== ""
      ) {
        this.client.formulaire.accreditations.push("modifié");
        this.counterAccreditations++;
        console.log(this.client.formulaire.accreditations);
        console.log(counterAccreditations);
      }
    }
  },
  computed: {
    maximumModules() {
      if (this.client.vente.forfait === "Présence") return 3;
      if (this.client.vente.forfait === "Cible") return 5;
      if (this.client.vente.forfait === "Complet") return 8;
      if (this.client.vente.forfait === "SEO") return 0;
      if (this.client.vente.forfait === "Premium") return 20;
      else return 0;
    },
    color() {
      if (this.client.vente.nombreModules <= 3) return "green";
      if (this.client.vente.nombreModules <= 8) return "blue";
      if (this.client.vente.nombreModules <= 15) return "purple";
      if (this.client.vente.nombreModules <= 25) return "red";
      return "red";
    },
    formIsValid() {
      return (
        this.client.personnel.nom &&
        this.client.personnel.prenom &&
        this.client.personnel.email &&
        this.client.personnel.telephone
      );
    }
  },
  mounted() {
    this.nombreServicesVedette = 1;
    this.nombreServicesTotal = 1;
  },
  name: "AddUser"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.checkBoxes {
  padding: 0;
  margin: 0;
  max-height: 23px;
  min-width: 25px;
}

.cardBoxes {
  padding: 5px;
}

.snackbar {
  position: fixed;
}
</style>
