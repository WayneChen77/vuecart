<template>
  <!-- 全域原件 -->
  <LoadingView :active="isLoading"></LoadingView>
  <div class="container my-4">
    <h2>熱映api<small>now showing</small></h2>
    <br />
    <div class="row">
      <div class="col row">
        <div class="titleimg" style="width: 16rem">
          <img :src="productdata.imageUrl" :alt="productdata.engtitle" :title="productdata.title" />
        </div>

        <div class="col">
          <span class="badge badge-pill badge-primary bg-primary m-2">{{ productdata.grand }}</span>
          <span class="badge badge-pill badge-primary bg-primary m-2">特殊標籤</span>

          <h3>片名:{{ productdata.title }}</h3>
          <p>英文:{{ productdata.engtitle }}</p>
          <p>類型:{{ productdata.category }}</p>
          <p>片長:{{ productdata.flength }}分鍾</p>

          <p>上映日期:{{ productdata.day }}</p>
          <p>導演:{{ productdata.director }}</p>
          <p>
            演員: <span v-for="(i, key) in productdata.actors" :key="key">{{ i }},</span>
          </p>
        </div>
      </div>
      <div class="col-2">
        <p>劇情簡介:</p>
        <p>{{ productdata.description }}</p>
      </div>
      <div class="col">
        <p>請選擇日期及廳別場次:</p>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="p-2" v-for="(i, key) in futuerday" :key="key">
              <button
                type="button"
                class="rounded-circle btn btn-outline-danger"
                :class="{ active: selectday === future(i - 1).today }"
              >
                <!-- 數字跑v-for會只跑到1不會跑到0 正確資料要剪一 -->
                <span> {{ `${future(i - 1).monthNow} / ${future(i - 1).dateNow}` }}</span>
                <br />
                <span> {{ future(i - 1).dayNow }}</span>
              </button>
            </li>
          </ol>
        </nav>

        <div v-for="(i, index, Key) in datastore" :key="Key">
          <p><i class="bi bi-camera-reels"></i>{{ i.theater }}</p>

          <button
            type="button"
            class="btn btn-outline-secondary m-1"
            :key="key"
            @click="buyticket(i)"
          >
            <span>{{ i.time }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

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
      <swiper-slide v-for="(i, key) in productdata.images" :key="key"
        ><img :src="i" class="d-block w-100" :alt="`${i}.pic`"
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
      filmproducts: [],
      productdata: {},
      isLoading: false,
      modules: [Navigation, Pagination, Scrollbar, A11y],
      selectday: this.future().today,

      // 顯示未來幾比日期
      futuerday: 5,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    getfilmproducts() {
      this.isLoading = true;
      // 取得path來使用
      const { id } = this.$route.params;
      // const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(Api)
        .then((res) => {
          const data = res.data.products;
          this.filmproducts = data.filter((i) => `${i.title}${i.engtitle}` === id);
          const a = this.filmproducts[0];
          this.productdata = a;

          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    buyticket(i) {
      console.log(i);
      const cart = {
        product_id: i.id,
        qty: 1,
      };

      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(Api, { data: cart })
        .then((res) => {
          console.log(res);
          this.$router.push('/addticket');
        })
        .catch((e) => {
          console.loc(e);
        });
    },

    // 取的未來時間並轉換為資料傳到畫面上
    future(i = 0) {
      const daynow = new Date(); // 获取当前日期

      const milliseconds = daynow.getTime() + 1000 * 60 * 60 * 24 * i;
      // 将当前日期转换为毫秒，加上需要增加的天数的毫秒，i表示天数

      const newMyDate = new Date(milliseconds);

      const yearNow = newMyDate.getFullYear();
      const monthNow = newMyDate.getMonth() + 1;
      const dateNow = newMyDate.getDate();

      // 轉換星期1到星期一
      const week = ['日', '一', '二', '三', '四', '五', '六'];
      const dayNow = week[newMyDate.getDay()];
      const today = `${yearNow}-${monthNow}-${dateNow}`;
      return { yearNow, monthNow, dayNow, dateNow, today };
    },
    // datastore(i) {
    //   this.selectday = this.future(i - 1).today;
    //   if (this.filmproducts !== {}) {
    //     const a = this.filmproducts.filter((item) => item.day.match('2022-10-19'));

    //     this.productdata = a;
    //     console.log(a);
    //   }
    //   // return '';
    // },
  },
  computed: {
    datastore() {
      return this.filmproducts.filter((item) => item.day.match('2022-10-19'));

      // return this.filmproducts.filter((i) => i.Name.match(this.search));
    },
  },
  created() {
    this.getfilmproducts();
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
.theraterdata {
  position: relative;

  & > p {
    &::after {
      content: '';
      position: absolute;
      left: 40px;
      top: 12px;
      max-width: 550px;
      width: 100%;
      height: 1px;
      background-color: gray;
      // background: -webkit-linear-gradient(90deg, #d8d8d8, transparent);
      // background: -o-linear-gradient(90deg, #d8d8d8, transparent);
      // background: -moz-linear-gradient(90deg, #d8d8d8, transparent);
      background: linear-gradient(90deg, #d8d8d8, transparent);
    }
    color: blue;
  }
}
</style>
