<template>
  <!-- 全域原件 -->
  <LoadingView :active="isLoading"></LoadingView>
  <div class="container my-4">
    <h2>熱映api<small>now showing</small></h2>
    <br />
    <div class="row">
      <div class="col row">
        <div class="titleimg" style="width: 16rem">
          <img :src="filmproduct.imageUrl" :alt="filmproduct.engtitle" :title="filmproduct.title" />
        </div>

        <div class="col">
          <span class="badge badge-pill badge-primary bg-primary m-2">{{ filmproduct.grand }}</span>
          <span class="badge badge-pill badge-primary bg-primary m-2">特殊標籤</span>

          <h3>片名:{{ filmproduct.title }}</h3>
          <p>英文:{{ filmproduct.engtitle }}</p>
          <p>類型:{{ filmproduct.category }}</p>
          <p>片長:{{ filmproduct.flength }}分鍾</p>

          <p>上映日期:{{ filmproduct.day }}</p>
          <p>導演:{{ filmproduct.director }}</p>
          <p>
            演員: <span v-for="i in filmproduct.actors" :key="'actor' + i">{{ i }},</span>
          </p>
        </div>
      </div>
      <div class="col-2">
        <p>劇情簡介:</p>
        <p>{{ filmproduct.description }}</p>
      </div>
      <div class="col bg-titleblue">
        <p>請選擇日期及廳別場次:</p>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <button
                @click.prevent="azx"
                type="button"
                class="rounded-circle btn btn-outline-danger"
              >
                <span>10/28</span>
                <br />
                <span>(五)</span>
              </button>
            </li>
            <li class="breadcrumb-item">
              <button type="button" class="rounded-circle btn btn-outline-danger">
                <span>10/28</span>
                <br />
                <span>(五)</span>
              </button>
            </li>
            <li class="breadcrumb-item">
              <button type="button" class="rounded-circle btn btn-outline-danger">
                <span>10/28</span>
                <br />
                <span>(五)</span>
              </button>
            </li>
            <li class="breadcrumb-item">
              <button type="button" class="btn btn-outline-danger rounded-circle">Danger</button>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>
        <div>
          <span>聽別版本</span>
          <hr class="用after做條線" />
          <button type="button" class="btn btn-outline-secondary m-1" v-for="i in 5" :key="i">
            Secondary{{ i }}
          </button>
        </div>
        <div>
          <span>聽別版本</span>
          <hr class="用after做條線" />
          <button type="button" class="btn btn-outline-secondary m-1" v-for="i in 5" :key="i">
            Secondary{{ i }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="filmwhile container my-3">1</div>
  <div class="imgs py-4">
    <swiper
      class=""
      :modules="modules"
      :slides-per-view="phonerwd ? 1 : 2"
      :space-between="50"
      navigation
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
    >
      <swiper-slide v-for="(i, key) in filmproduct.images" :key="key"
        ><img :src="i" :id="'圖片+i'" class="d-block w-100" :alt="'圖片+i'"
      /></swiper-slide>
    </swiper>
    <div class=""></div>
    <div class=""></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  data() {
    return {
      phonerwd: false,
      filmproduct: {},
      isLoading: false,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    getfilmproduct() {
      this.isLoading = true;
      // 取得path來使用
      const { id } = this.$route.params;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(Api)
        .then((res) => {
          this.filmproduct = res.data.product;
          console.log(res.data);
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    azx() {
      const dateNow = new Date();
      const yearNow = dateNow.getFullYear();
      const monthNow = dateNow.getMonth() + 1;
      const dayNow = dateNow.getDate();
      const maxDate = `${yearNow}-${monthNow}-${dayNow}`;
      const dd = this.filmproduct.test[0].day;
      console.log(this.filmproduct.test[0].day);
      console.log(typeof maxDate);
      console.log(dd === '2022-10-19');
      console.log(typeof Number(maxDate));
    },
  },
  // computed: {
  //   //  搜尋過濾
  //   datastore() {
  //     return this.filmproduct.filter((i) => i.is_showing === this.isShowwing);

  //     // return this.filmproducts.filter((i) => i.Name.match(this.search));
  //   },
  // },
  created() {
    this.getfilmproduct();
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.swiper {
  width: 600px;
  height: 300px;
  object-fit: cover;
}
.imgs {
  background-color: antiquewhite;
}
.titleimg {
  height: 20rem;
  object-fit: cover;
}
</style>
