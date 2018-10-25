<template>
          <v-container fluid>            
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
                    >
                      <template slot="items" slot-scope="props">
                        <tr @click='expand'>
                        <td class="text-xs-left">{{ props.item.nom }}</td>
                        <td class="text-xs-right">{{ props.item.date }}</td>
                        <td class="text-xs-right">{{ props.item.email }}</td>
                        <td class="text-xs-right">{{ props.item.forfait }}</td>
                        <td class="text-xs-right">{{ props.item.domaine }}</td>
                        </tr>
                      </template>
                      <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                      </v-alert>
                      <template slot="expand" slot-scope="props">
                        <v-card flat color="secondary">
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
import ClientsService from '@/services/ClientsService'
export default {
  data() {
    return {
      
      search: "",
      headers: [
        {
          text: 'Nom',
          align: 'left',
          sortable: true,
          value: 'nom'
        },
        { text: 'Date', align: 'right', value: 'date' },
        { text: 'Email', align: 'right', value: 'email' },
        { text: 'Forfait', align: 'right', value: 'forfait' },
        { text: 'Domaine', align: 'right', value: 'domaine' }
      ],
      clients: null,
      rowsPerPageItems: [{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}, 10, 20],
      pagination: {
        rowsPerPage: 20
      }
    }
  },
  async mounted () {
    this.clients = (await ClientsService.index()).data
  },
  methods: {
    expand () {
      console.log(this)
    }
  },
  name: "ViewClients"
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.isActive{
  background-color: red;
}
</style>
