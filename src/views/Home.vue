<template>
  <div class="home">
    <h1>home</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import LoginCard from '@/components/LoginCard.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'home',
  components: {
    HelloWorld, LoginCard, Register
  }
}
</script>
