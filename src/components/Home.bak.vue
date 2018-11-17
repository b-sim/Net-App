<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex 12>        
        <v-container fluid grid-list-xl>
          <v-layout row justify center>
            <v-flex 3>
              <v-card ma-3>
                <v-btn datk color="primary" @click="getData">mongo</v-btn>
                <v-card-text>
                  card text
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex 3>
              <v-card ma-3>
                <v-btn datk color="primary" @click="getSQL">SQL</v-btn>
                <v-card-text>
                  card text
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex 3>
              <v-card ma-3>
                <v-btn datk color="primary" @click="getData">button text</v-btn>
                <v-card-text>
                  card text
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex 3>
              <v-card ma-3>
                <v-btn datk color="primary" @click="getData">button text</v-btn>
                <v-card-text>
                  card text
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-layout row>
          <v-flex 3 v-for="item in clients" :key="item.key">
            <v-card>
              <v-card-text>
                <ul>
                  <li v-for="(value, key) in item" >
                    {{ key }}: {{ value }}
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex >
            <v-card>
              <v-card-text >
                {{sqlClients}} 
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex >
            <v-card>
              <v-card-text >
                {{clients}} 
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>



        <Testslot :pseudo-slot="(item)=> item.adresse.rue ">
        </Testslot>



  </v-container>
</template>

<script>
import Testslot from "@/components/Testslot.vue";
import ClientsService from "@/services/ClientsService";

export default {
  name: "Home",
  components: {
    Testslot
  },
  data() {
    return {
      clients: null,
      sqlClients: null
    };
  },
  methods: {
    
    async getSQL() {
      this.sqlClients = (await ClientsService.index()).data;
    },

    async getData() {
      this.clients = (await ClientsService.indexMongo()).data;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
