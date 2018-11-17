import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Landing from "./components/Landing.vue";
import AddClient from "./components/AddClient.vue";
import ViewClients from "./components/ViewClients.vue";
import VuexTest from "./components/VuexTest.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/addClient",
      name: "addClient",
      component: AddClient
    },
    {
      path: "/landing",
      name: "landing",
      component: Landing
    },
    {
      path: "/viewClients",
      name: "viewClients",
      component: ViewClients
    },
    {
      path: "/vuexTest",
      name: "vuexTest",
      component: VuexTest
    }
  ]
});
