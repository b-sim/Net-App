<template>
  <div id="app">
    <v-app>
      <Header />
        <v-content class="mainContent">   
          <v-slide-x-transition origin="top left 0" mode="out-in">
            <router-view></router-view> 
          </v-slide-x-transition> 
        </v-content>
      
      <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">login</router-link>
      </div> -->      
    </v-app>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.mainContent {
  margin-top: 60px;
}
</style>
