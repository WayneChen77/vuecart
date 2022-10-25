<template>
  <div class="about container">
    <nav aria-label="breadcrumb" class="p-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">首頁</a></li>
        <li class="breadcrumb-item">
          <router-link to="/FilmAboutView/showing">全部</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/FilmAboutView/showing">熱映中</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/FilmAboutView/comming">即將上映</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Data</li>
      </ol>
    </nav>
    <h2>api標題</h2>
    <router-view />
    <div class="row justify-content-md-center flex-wrap">
      <div class="card m-4 flex-wrap" style="width: 16rem" v-for="i in filmproducts" :key="i.id">
        <div class="titleimg">
          <a href="#"><img :src="i.imageUrl" :alt="i.engtitle" /></a>
        </div>
        <span class="badge badge-pill badge-primary bg-primary w-25 grand">{{ i.grand }}</span>
        <div class="card-body">
          <p class="rounded border border-gray w-25 text-gray text-center">{{ i.version }}</p>

          <h5 class="card-title">
            <a href="#">{{ i.title }}</a>
          </h5>
          <h5 class="card-title">{{ i.engtitle }}</h5>
          <p>日期{{ i.day }}</p>
          <!-- <p class="card-text">
            {{ i.description }}
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {},
  data() {
    return { filmproducts: [], isLoading: false };
  },
  methods: {
    getfilmproducts() {
      this.isLoading = true;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(Api)
        .then((res) => {
          this.filmproducts = res.data.products;
          // this.pagination = res.data.pagination;
          console.log(this.filmproducts);
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getfilmproducts();
    console.log(this.filmproducts);
  },
};
</script>
<style lang="scss">
.grand {
  transform: translate(10%, -125%);
}
img {
  width: 100%;
  height: 100%;
}
.card {
  border: none;
  h5 a {
    text-decoration: none;
  }
}
.card:hover {
  background: rgb(189, 187, 187);
}
.titleimg {
  height: 20rem;
  object-fit: cover;
}
</style>
