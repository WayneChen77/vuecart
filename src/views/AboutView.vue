<template>
  <div class="about container">
    <nav aria-label="breadcrumb" class="p-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">首頁</a></li>
        <li class="breadcrumb-item">
          <router-link to="/about/showing">熱映中</router-link>
        </li>
        <li class="breadcrumb-item"><router-link to="/about/comming">即將上映</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Data</li>
      </ol>
    </nav>
    <h2>api標題</h2>
    <router-view />
  </div>
</template>

<!-- <script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  created() {
    console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH);
  },
};
</script> -->
