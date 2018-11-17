<template>
  <v-container fluid grid-list-md>
    <v-layout align-center justify-center>
        <v-flex row xs12><h1>vos contacts</h1></v-flex>  
    </v-layout>
      <v-layout align-center justify-center column fill-height>
        <v-flex xs6>
          <v-flex v-for="item in contacts" :key="item._id" xs12>      
            <v-card dark color="primary">
              <v-card-title :style="{ fontSize: '20px' }">

                slot =>>> {{ pseudoSlot(item) }} <br>

              </v-card-title>
              <v-card-text :style="{fontSize: '14px', fontWeight: '700'}">
              </v-card-text>
            </v-card>
          </v-flex>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Testslot",
  data() {
    return {
      titre: "datatitle",
      contacts: [{
        "_id": "5bdf15f33fbcff587da4a954",
        "name": "simon",
        "job": "f",
        "adresse": {
          "rue": "miche"
        }
      }, 
      {
        "_id": "5bdf17843fbcff587da4a955",
        "name": "jon",
        "job": "a",
        "adresse": {
          "rue": "lievre"
        }
      }, 
      {
        "_id": "5bdf17843fbcff587da4a956",
        "name": "paul",
        "job": "b",
        "adresse": {
          "rue": "escau"
        }
      }, 
      {
        "_id": "5bdf17843fbcff587da4a957",
        "name": "dom",
        "job": "c",
        "adresse": {
          "rue": "valee"
        }
      }, 
      {
        "_id": "5bdf17843fbcff587da4a958",
        "name": "fred",
        "job": "d",
        "adresse": {
          "rue": "charest"
        }
      }]
    };
  },
  props: ['pseudo-slot']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
