<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex 12>        
        <v-container fluid grid-list-xl>
          <v-layout row justify center>
            <v-flex 3>
                <h1 class="display-4 text-uppercase">Bienvenue</h1>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Testslot from "@/components/Testslot.vue";
import ClientsService from "@/services/ClientsService";

export default {
  name: "Home",
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1{
  letter-spacing: 42px !important;
}
</style>
