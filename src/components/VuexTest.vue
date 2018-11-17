<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex 12>        
        <h1 class="font-weight-thin display-4">Vuex</h1>
        <p v-if="$store.state.isUserAdmin"> you are authorized => {{ $store.state.user.email }} </p>
        <p v-else> you are not authorized => {{ $store.state.user.email }} </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'VuexTest',
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
 