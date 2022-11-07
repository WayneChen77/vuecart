<template>
  <!-- 全域原件 -->
  <LoadingView :active="isLoading"></LoadingView>
  <button @click.prevent="test">test</button>
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
      </ol>
    </nav>
    <h2 class="text-primary">
      {{ isShowwing == null ? 'All' : isShowwing == 1 ? '熱映中' : '即將上映' }}
    </h2>

    <!-- <router-view /> -->
    <div class="row justify-content-md-center flex-wrap">
      <!--  用title篩選去除同名場次再去用字做迴圈 -->
      <div class="card m-4 flex-wrap" v-for="(i, key) in datastore" :key="key">
        <div class="titleimg position-relative">
          <div class="triangle"><div class="triangletxt">文字</div></div>

          <img :src="i.imageUrl" :alt="`${i.engtitle}.pic`" :title="i.title" />
          <div class="cardhover">
            <p class="hovertxt">
              <!-- 要調整傳入參數 為title-->
              <a href="#" @click.prevent="userproduct(i.title, i.engtitle)"
                ><span>.</span> <i class="bi bi-hand-index text-white border border-3"></i
              ></a>
            </p>
          </div>
        </div>
        <span class="badge badge-pill badge-primary w-25 grand" :class="`bg-${i.grand}`"
          >{{ i.grand }}
          {{ i.grand == 'G' ? '0+' : i.grand == 'P' ? '6+' : i.grand == 'PG' ? '12+' : '18+' }}
        </span>
        <div class="card-body">
          <p class="rounded border border-gray w-25 text-gray text-center">{{ i.version }}</p>

          <h5 class="card-title">
            <!-- 要調整傳入參數 為title-->
            <a href="#" @click.prevent="userproduct(i.title, i.engtitle)">{{ i.title }}</a>
          </h5>
          <h5 class="card-title">{{ i.engtitle }}</h5>
          <p>日期:{{ i.day }}</p>
          <!-- <p class="card-text">
            {{ i.description }}
          </p> -->
        </div>
      </div>
    </div>
  </div>
  <!-- 掛載旁邊的選單  -->
  <!-- 記得調整傳入資料 為p_id -->
  <SearchFilm :searchdatalist="datalist" :searchfilmproducts="filmproducts"></SearchFilm>
</template>

<script>
// @ is an alias to /src
import SearchFilm from '@/components/SearchFilm.vue';

export default {
  name: 'FilmAboutView',
  components: { SearchFilm },
  data() {
    return { filmproducts: [], isLoading: false, isShowwing: null, datalist: [] };
  },
  methods: {
    // 篩選同title資料去除
    filterFilm() {
      const result = new Set();
      const repeat = new Set();
      this.filmproducts.forEach((item) => {
        if (result.has(item.title)) {
          repeat.add(item);
        } else {
          result.add(item.title);

          this.datalist.push(item);
        }

        // result.has(item) ? repeat.add(item) : result.add(item);
      });
    },
    userproduct(title, engtitle) {
      this.$router.push(`/userproduct/${title + engtitle}`);
    },
    getfilmproducts() {
      this.isLoading = true;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(Api)
        .then((res) => {
          this.filmproducts = res.data.products;

          this.isLoading = false;
          this.filterFilm();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  computed: {
    //  搜尋過濾
    datastore() {
      if (this.isShowwing === 0) {
        return this.datalist.filter((i) => i.is_showing === this.isShowwing);
      }
      if (this.isShowwing === 1) {
        return this.datalist.filter((i) => i.is_showing === this.isShowwing);
      }

      return this.datalist;

      // return this.filmproducts.filter((i) => i.Name.match(this.search));
    },
  },
  created() {
    this.getfilmproducts();
  },
};
</script>
<style lang="scss">
.about {
  .grand {
    transform: translate(10%, -125%);
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
  //動畫

  // 卡片數據
  img {
    width: 100%;
    height: 100%;
  }
  .card {
    width: 16rem;
    border: none;
    h5 a {
      text-decoration: none;
    }
  }

  .titleimg {
    height: 20rem;
    object-fit: cover;
    overflow: hidden;
  }
  // 卡片遮罩

  .card:hover {
    background: rgb(189, 187, 187);
    .cardhover {
      opacity: 0.6;
    }
  }
  .cardhover {
    display: flex;
    min-width: 9rem;
    width: 100%;
    height: 100%;
    background-color: black;
    top: 0;
    opacity: 0;
    position: absolute;
    transition: all 0.5s;

    .hovertxt {
      margin: auto;

      i {
        padding: 1rem;
        border-radius: 50%;
      }
      a span {
        height: 1px;
        width: 1px;
        position: absolute;
        overflow: hidden;
        top: -10px;
      }
    }
  }
  @media (max-width: 480px) {
    .card {
      width: 18rem;
      background: rgb(189, 187, 187);
    }
  }
}
</style>
