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
              <v-flex v-if="$store.state.isUserAdmin" xs12 sm8 md4>
                <v-slide-x-transition origin="top left 0">
                  <v-card class="elevation-7">
                    <v-toolbar dark color="primary">
                      <v-toolbar-title>Register</v-toolbar-title>
                      <v-spacer></v-spacer>
                      
                    </v-toolbar>
                    <v-card-text>
                      <v-form>
                        <v-text-field @keyup.enter="register" v-model="email" prepend-icon="person" name="login" label="Entrez votre courriel" type="text" autofocus="autofocus"></v-text-field>
                        <v-text-field @keyup.enter="register" v-model="password" autocomplete="new-password" id="password" prepend-icon="lock" name="password" label="Entrez votre mot de passe" type="password"></v-text-field>
                      </v-form>
                    </v-card-text>
                      <div class="error--text" v-html="error" />
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <br>
                      <v-btn @click="register" color="primary">Register</v-btn>
                    </v-card-actions>
                  </v-card>                  
                </v-slide-x-transition>
              </v-flex>
            </v-layout>
          </v-container>
</template>    
<script>
import AuthenticationService from '@/services/AuthenticationService';
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    }
  },
  methods: {
    async register () {
      try {
          const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push({name: 'landing'});
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  watch: {
    email (value) {
    }
  },
  name: 'Register',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
