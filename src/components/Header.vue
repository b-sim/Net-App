<template>        
        <v-content>
          <v-toolbar class="headerToolbar" dark color ="primary">
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
            <div class="titleWrapper pr-5" @click="navigateTo({name: 'home'})"><v-toolbar-title flat>NetBLB Client log</v-toolbar-title></div>
            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn v-if="$store.state.isUserLoggedIn" @click="navigateTo({name: 'addClient'})" flat>Nouveau Client</v-btn>
              <v-btn v-if="$store.state.isUserLoggedIn && $store.state.isUserAdmin" @click="navigateTo({name: 'viewClients'})" flat>Registre</v-btn>
              <!-- <v-btn @click="navigateTo({name: 'vuexTest'})" flat>Vuex</v-btn> -->
            </v-toolbar-items>
              <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn v-if="$store.state.isUserLoggedIn && $store.state.isUserAdmin" @click="navigateTo({name: 'register'})" flat>Nouvel Utilisateur</v-btn>
              <v-btn v-if="!$store.state.isUserLoggedIn" @click="navigateTo({name: 'login'})" flat>Sign In</v-btn>
              <v-btn v-if="$store.state.isUserLoggedIn" @click="logout" flat>Sign Out</v-btn>
            </v-toolbar-items>
          </v-toolbar>       
        </v-content>
</template>

<script>
export default {
  name: 'Header',  
  methods: {
    navigateTo (route) {
      this.$router.push(route);
    },
    logout () {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: 'home'
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1{
  color:red;
}
.v-toolbar__title{
  height: 1.5em;
}
.titleWrapper{
  cursor: pointer;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.headerToolbar {
  position: fixed;  
  z-index: 99;
}
</style>
