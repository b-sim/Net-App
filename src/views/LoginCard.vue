<template>
 <v-app >
      <v-content>
          <v-toolbar dark color ="primary">
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>NetBLB Client log</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn flat>Sign Up</v-btn>
              <v-btn flat>Sign In</v-btn>
              <v-btn flat @click="toggle">{{title}}</v-btn>
            </v-toolbar-items>
          </v-toolbar>
        <v-container fluid fill-height>            
            <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4>
                 
              </v-flex>
            </v-layout>
          </v-container>
    
      </v-content>
    </v-app>
  
</template>

<script>
// @ is an alias to /src
import LoginCard from '@/components/LoginCard.vue'

export default {
  name: 'home',
  components: {
    LoginCard
  }
}
</script>
