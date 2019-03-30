<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-slide-x-transition origin="top left 0">
          <v-card class="elevation-7">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  @keyup.enter="login"
                  v-model="email"
                  prepend-icon="person"
                  name="login"
                  label="Login"
                  type="text"
                  autofocus="autofocus"
                ></v-text-field>
                <v-text-field
                  @keyup.enter="login"
                  v-model="password"
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <div class="error--text" v-html="error"/>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="login" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-x-transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        });
        console.log(response.data);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push({ name: "addClient" });
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  watch: {
    email(value) {}
  },
  name: "Login"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
