<template>
  <!-- 全域原件 -->
  <LoadingView :active="isLoading"></LoadingView>
  <div class="about container">
    <nav aria-label="breadcrumb" class="p-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">首頁</a></li>
        <li class="breadcrumb-item">
          <a href="#" @click.prevent="isShowwing = null" @Keyup.enter.prevent="isShowwing = null"
            >全部</a
          >
        </li>
        <li class="breadcrumb-item">
          <a href="#" @click.prevent="isShowwing = 1" @Keyup.enter.prevent="isShowwing = 1"
            >熱映中</a
          >
        </li>
        <li class="breadcrumb-item">
          <a href="#" @click.prevent="isShowwing = 0" @Keyup.enter.prevent="isShowwing = 0"
            >即將上映</a
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">Data</li>
      </ol>
    </nav>
    <h2>{{ isShowwing == null ? 'All' : isShowwing == 1 ? '上映中' : '即將上映' }}</h2>

    <button @click="cc">111</button>
    <router-view />
    <div class="row justify-content-md-center flex-wrap">
      <div class="card m-4 flex-wrap" style="width: 16rem" v-for="i in datastore" :key="i.id">
        <div class="titleimg position-relative">
          <div class="triangle"><div class="triangletxt">文字</div></div>

          <a href="#" @click.prevent="userproduct(i.id)"
            ><img :src="i.imageUrl" :alt="i.engtitle"
          /></a>
        </div>
        <span class="badge badge-pill badge-primary bg-primary w-25 grand">{{ i.grand }}</span>
        <div class="card-body">
          <p class="rounded border border-gray w-25 text-gray text-center">{{ i.version }}</p>

          <h5 class="card-title">
            <a href="#" @click.prevent="userproduct(i.id)">{{ i.title }}</a>
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
  <!-- 掛載旁邊的選單  -->
  <SearchFilm :searchproducts="filmproducts"></SearchFilm>
</template>

<script>
// @ is an alias to /src
import SearchFilm from '@/components/SearchFilm.vue';

export default {
  name: 'FilmAboutView',
  components: { SearchFilm },
  data() {
    return { filmproducts: [], isLoading: false, isShowwing: null };
  },
  methods: {
    userproduct(id) {
      this.$router.push(`/userproduct/${id}`);
    },
    getfilmproducts() {
      this.isLoading = true;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(Api)
        .then((res) => {
          this.filmproducts = res.data.products;
          console.log(res.data);

          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cc() {
      console.log(this.filmproducts);
    },
  },
  computed: {
    //  搜尋過濾
    datastore() {
      // if (this.isShowwing === 1) {
      //   console.log(this.isShowwing);
      // }
      if (this.isShowwing === 0) {
        return this.filmproducts.filter((i) => i.is_showing === this.isShowwing);
      }
      if (this.isShowwing === 1) {
        return this.filmproducts.filter((i) => i.is_showing === this.isShowwing);
      }

      return this.filmproducts;

      // return this.filmproducts.filter((i) => i.Name.match(this.search));
    },
  },
  created() {
    this.getfilmproducts();
    console.log(this.filmproducts);
  },
};
</script>
<style lang="scss">
.about {
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
    overflow: hidden;
  }
  //  三角形
  .triangle {
    top: -60px;
    left: -60px;
    bottom: auto;
    width: 120px;
    height: 120px;
    transform: rotate(-45deg);

    background-color: orange;
    position: absolute;
  }
  .triangletxt {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-weight: bold;
  }
}
</style>
