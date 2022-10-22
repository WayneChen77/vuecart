<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link>|
    <router-link to="/login">Login</router-link>
  </nav> -->
  <NavBar></NavBar>

  <router-view />

  <footer>this is footer</footer>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>
<style lang="scss">
@import './assets/all.scss';
</style>
