<template>
  <NavBar></NavBar>

  <router-view />

  <Footer></Footer>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/FooterView.vue';

export default {
  components: {
    NavBar,
    Footer,
  },
};
</script>
<style lang="scss">
@import './assets/all.scss';
</style>
