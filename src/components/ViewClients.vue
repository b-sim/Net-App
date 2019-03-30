<template>
          <v-container fluid>            
            <v-layout align-center justify-center>
              <v-flex v-if="!$store.state.isUserAdmin" xs12 sm10 md8>
                <v-alert
                  :value="true"
                  type="error"
                >
                  You need to be an administrator.
                </v-alert>
              </v-flex>
              <v-flex v-if="$store.state.isUserAdmin" xs12 sm10 md8>
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>Registre Clients</v-toolbar-title>
                    <v-spacer></v-spacer>
                    
                  </v-toolbar>
                <v-slide-x-transition origin="top left 0">
                  <v-card>
                    <v-card-title>
                      Clients
                      <v-spacer></v-spacer>
                      <v-text-field autofocus="autofocus"
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table 
                      :search="search"
                      :rows-per-page-items="rowsPerPageItems"
                      :headers="headers"
                      :items="clients"
                      item-key="_id"
                    >
                      <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded; props.isActive = !props.isActive; " >
                        <td class="text-xs-left">{{ props.item.personnel.nom }}</td>
                        <td class="text-xs-right">{{ props.item.personnel.prenom }}</td>
                        <td class="text-xs-right">{{ props.item.personnel.telephone }}</td>
                        <td class="text-xs-right">{{ props.item.personnel.email }}</td>
                        <td class="text-xs-right">{{ props.item.vente.nomVendeur }}</td>
                        </tr>
                      </template>
                      <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        La recherche pour "{{ search }}" ne donne aucun résultat.
                      </v-alert>
                      <template slot="expand" slot-scope="props">
                        <v-card flat color="light-blue lighten-5">
                          <v-card-text>Infos supplémentaires</v-card-text>
                        </v-card>
                      </template>
                    </v-data-table>
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
      search: "",
      headers: [
        { text: "Nom", align: "left", sortable: true, value: "personnel.nom" },
        { text: "Prénom", align: "right", value: "personnel.prenom" },
        { text: "Téléphone", align: "right", value: "personnel.telephone" },
        { text: "Email", align: "right", value: "personnel.email" },
        { text: "Nom du Vendeur", align: "right", value: "vente.nomVendeur" }
      ],
      clients: null,
      rowsPerPageItems: [
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 },
        10,
        20
      ],
      pagination: {
        rowsPerPage: 20
      },
      isActive: false
    };
  },
  async mounted() {
    this.clients = (await ClientsService.indexMongo()).data;
  },
  name: "ViewClients"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.red {
  background-color: red !important;
}
</style>
