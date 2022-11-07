<template>
  <!-- 全域原件 -->
  <LoadingView :active="isLoading"></LoadingView>

  <button @click="qw">測試按鍵</button>
  <div class="container addticket">
    <div class="row">
      <div class="col-12 col-sm-8" v-if="dataList.product">
        left
        <div class="box row">
          <div class="addgrand col-sm-2 col-4 my-3">
            <div class="card text-white">
              <h5 class="card-header" :class="`bg-${dataList.product.grand}`">
                {{
                  dataList.product.grand == 'G'
                    ? '0+'
                    : dataList.product.grand == 'P'
                    ? '6+'
                    : dataList.product.grand == 'PG'
                    ? '12+'
                    : '18+'
                }}
              </h5>
              <div class="card-body text-gray">
                <p class="card-text">{{ dataList.product.grand }}</p>
              </div>
            </div>
          </div>
          <div class="title col-sm-7 col-8 my-3">
            <h1>{{ dataList.product.title }}</h1>
            <p>{{ dataList.product.engtitle }}</p>
          </div>
          <div class="des col-sm-3 col-12 my-3">
            <p>標籤{{ dataList.product.day }}</p>
            <p><i class="bi bi-clock"></i>時間:{{ dataList.product.time }}</p>
            <p><i class="bi bi-camera-reels"></i>影廳:{{ dataList.product.theater }}</p>
          </div>
        </div>
        <div class="bg-gray">
          <div class="text-center text-white p-3 my-3">
            <h2>選擇電影票</h2>
            <p class="pt-3">
              選擇您希望購買的電影票張數和類型.請注意會員折扣以全票8折計算，系統將自動為您保留可訂的最佳座位,
              愛心票' 請於取票窗口出示證件，單張證件限購2票。
            </p>
          </div>
        </div>
        <div class="accordion" id="accordionExample">
          <div class="card">
            <div class="card-header position-relative mb-1" id="headingOne">
              <h2 class="mb-0">
                優惠票
                <button
                  class="btn btn-link position-absolute end-0 tod-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <i class="bi bi-caret-down-square"></i>
                </button>
              </h2>
            </div>

            <div
              id="collapseOne"
              class="collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header mb-1" id="headingThree">
              <h2 class="mb-0">
                票券
                <button
                  class="btn btn-link collapsed position-absolute end-0 top-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <i class="bi bi-caret-down-square"></i>
                </button>
              </h2>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">票種</th>
                      <th scope="col">價格</th>
                      <th scope="col" width="120">張數</th>
                      <th scope="col">
                        總價
                        <div class="spinner-border spinner-border-sm" role="status" v-if="isload">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">全票</th>
                      <td>{{ dataList.product.price }}</td>

                      <!-- {{
                        dataList.aldult
                      }} -->
                      <!-- :disabled="this.status.loadingItem === item.id" -->
                      <td>
                        <select
                          aria-labelledby="lbl-main-menu-mob"
                          data-prompt-position="topLeft"
                          class="form-control"
                          v-model="aldult"
                          @change="ticketType('aldult')"
                          :disabled="isload"
                        >
                          <option v-for="(i, index, key) in number" :key="key">{{ i }}</option>
                        </select>
                      </td>
                      <td>${{ aldultPrices }}</td>
                    </tr>
                    <tr>
                      <th scope="row">學生票</th>
                      <td>{{ dataList.product.price - 20 }}</td>
                      <td>
                        <select
                          aria-labelledby="lbl-main-menu-mob"
                          data-prompt-position="topLeft"
                          class="form-control"
                          v-model.number="student"
                          @change="ticketType('student')"
                          :disabled="isload"
                        >
                          <option selected value="">0</option>
                          <option v-for="(i, index, key) in number" :key="key">{{ i }}</option>
                        </select>
                      </td>
                      <td>${{ studentPrices }}</td>
                    </tr>
                    <tr>
                      <th scope="row">愛心票</th>
                      <td>{{ dataList.product.price * 0.5 }}</td>
                      <td>
                        <select
                          aria-labelledby="lbl-main-menu-mob"
                          data-prompt-position="topLeft"
                          class="form-control"
                          v-model="half"
                          @change="ticketType('half')"
                          :disabled="isload"
                        >
                          <option value="">0</option>
                          <option v-for="(i, index, key) in number" :key="key">{{ i }}</option>
                        </select>
                      </td>
                      <td>${{ halfPrices }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header position-relative mb-1" id="headingTwo">
              <h2 class="mb-0">
                餐飲
                <button
                  class="btn btn-link collapsed position-absolute end-0 top-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <i class="bi bi-caret-down-square"></i>
                </button>
              </h2>
            </div>
            <div
              id="collapseTwo"
              class="collapse show"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body">
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                  <label class="btn btn-outline-primary" for="btnradio1"
                    >飲料
                    <input
                      type="radio"
                      class="btn-check"
                      name="btnradio"
                      id="btnradio1"
                      autocomplete="off"
                  /></label>

                  <label class="btn btn-outline-primary" for="btnradio2"
                    >爆米花
                    <input
                      type="radio"
                      class="btn-check"
                      name="btnradio"
                      id="btnradio2"
                      autocomplete="off"
                  /></label>

                  <label class="btn btn-outline-primary" for="btnradio3"
                    >點心
                    <input
                      type="radio"
                      class="btn-check"
                      name="btnradio"
                      id="btnradio3"
                      autocomplete="off"
                  /></label>
                </div>
                <!-- candys -->
                <div class="productflex">
                  <div class="card product" v-for="(item, key) in Candys" :key="key">
                    <img :src="item.imageUrl" class="card-img-top" :alt="item.title" />
                    <div class="cardhover">
                      <p class="hovertxt">
                        <a :href="item.imageUrl"
                          ><span>.</span> <i class="bi bi-hand-index text-white border border-3"></i
                        ></a>
                      </p>
                    </div>
                    <div class="card-body position-absolute end-0 bottom-0">
                      <h6 class="card-title">
                        {{ item.title }} <s class="text-gray">${{ item.origin_price }}</s>
                      </h6>
                      <span class="card-text pe-2">${{ item.price }}</span>
                      <select
                        aria-labelledby="lbl-main-menu-mob"
                        data-prompt-position="topLeft"
                        @change="addOnCandy(item)"
                        v-model="candyqty"
                      >
                        <option selected value="">0</option>
                        <option v-for="(i, key) in number" :key="key">
                          {{ i }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="col-12 col-sm-4">
        right
        <div class="input-group mb-3 input-group-sm">
          <label for="coupon"
            ><input
              type="text"
              class="form-control"
              v-model="coupon_code"
              placeholder="請輸入會員ID"
          /></label>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
              套用會員折扣
            </button>
            {{ dataList.seatSelect }}
          </div>
        </div>
        <div class="card text-white my-5" v-if="dataList.product">
          <h5 class="card-header bg-titleblue">:{{ dataList.product.title }}</h5>
          <div class="card-body text-gray">
            <p class="card-text">
              影廳:{{ dataList.product.theater }} ,<span>時間:{{ dataList.product.time }}</span>
            </p>
            <a
              href="#"
              class="btn btn-primary position-absolute end-0"
              @click.prevent="removeCartItem"
              >選擇其他電影
            </a>
            <p class="card-text">
              <span>seat:{{ dataList.qty }}</span>
            </p>
            <p class="position-relative">
              <span v-if="reduce !== 0 && dataList.final_total === dataList.total"
                >金額$:{{ dataList.total - reduce }}</span
              ><span v-else>金額$:{{ dataList.total }}</span
              ><a
                href="#"
                class="btn btn-primary position-absolute end-0"
                @click.prevent="openModal"
                >選擇座位
              </a>
            </p>
            <p>{{ dataList.seat }}</p>
            <p v-if="dataList.final_total !== dataList.total">
              會員金額:{{ dataList.final_total }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 區域原件 -->

  <SeatModal ref="SeatModal" :seatData="dataList" @update-seat="seatClick"></SeatModal>
</template>

<script>
import SeatModal from '@/components/SeatModal.vue';

export default {
  data() {
    return {
      carts: [],
      Candys: [],
      seatSelect: [],
      // 總票數?
      number: 4,
      candyqty: 0,
      candyarray: [],
      aldult: 0,
      student: 0,
      half: 0,
      reduce: 0,
      dataList: {},
      aldultPrices: 0,
      studentPrices: 0,
      halfPrices: 0,
      qtynumber: 0,
      coupon_code: '',
      isload: false,
      isLoading: false,
    };
  },
  components: { SeatModal },
  methods: {
    qw() {
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;

      this.$http.get(Api).then((res) => {
        console.log(res);
        // this.$httpMessageState(response, '移除購物車品項');
      });
    },
    // 移除票資料
    removeCartItem() {
      this.isload = this.dataList.id;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${this.dataList.id}`;

      this.$http.delete(Api).then((res) => {
        console.log(res);
        // this.$httpMessageState(response, '移除購物車品項');
        this.$router.push('/FilmAboutView');
      });
    },

    // 更新票種
    seatClick(item) {
      console.log('haha');
      console.log(item);
      this.seatSelect = item;
      const modal = this.$refs.SeatModal;

      modal.hideModal();
      this.updateCart();
    },
    updateCart() {
      this.isload = true;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${this.dataList.id}`;
      //   this.isLoading = true;
      //   this.status.loadingItem = item.id;
      const cart = {
        product_id: this.dataList.product_id,
        qty: this.qtynumber,
        seatSelect: this.seatSelect,
        aldult: this.aldult,
        student: this.student,
        half: this.half,
      };
      this.$http.put(Api, { data: cart }).then((res) => {
        console.log(res);
        // this.status.loadingItem = '';
        this.isload = false;
        this.getusercarts();
      });
    },
    // 加購餐點
    addOnCandy(item) {
      const b = { candytitle: item.title, candyqty: this.candyqty };
      if (this.candyarray.length === 0) {
        this.candyarray.push(b);
      } else {
        const a = this.candyarray.map((i) => i.candytitle);
        const c = a.indexOf(item.title);

        if (c !== -1) {
          this.candyarray.splice(c, 1);
        }
        console.log(this.candyarray);

        this.candyarray.push(b);
      }
    },
    //  調整票整
    ticketType(i) {
      if (i === 'aldult') {
        this.aldultPrices = Number(this.aldult) * this.dataList.product.price;
      } else if (i === 'student') {
        this.studentPrices = Number(this.student) * (this.dataList.product.price - 20);
      } else {
        this.halfPrices = Number(this.half) * this.dataList.product.price * 0.5;
      }
      this.qtynumber = Number(this.aldult) + Number(this.student) + Number(this.half);

      // eslint-disable-next-line
      this.reduce =
        // eslint-disable-next-line
        Number(this.student) * 20 + Number(this.half) * (this.dataList.product.price * 0.5);
      this.updateCart();
    },
    addCouponCode() {
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http.post(Api, { data: coupon }).then((res) => {
        // res.message 回覆吐司
        // this.$httpMessageState(response, '加入優惠券');
        console.log(res);
        this.getusercarts();
        this.isLoading = false;
      });
    },
    getusercarts() {
      // 取得購物車群資料
      this.isLoading = true;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(Api)
        .then((res) => {
          this.carts = res.data.data.carts;
          this.filterCart();
          this.isLoading = false;
        })
        .catch((e) => {
          console.loc(e);
        });
    },
    // 篩選資料
    // 利用router 篩選出選擇的電影品項ID 利用此ID取得購物車ID與資料
    // 會有bug重複項被修改 因用同projid的品項都會重疊 僅單人練習使用 無法上線
    filterCart() {
      const a = this.carts.filter((item) => item.product_id === this.$route.params.id);
      const b = a[0];
      this.dataList = b;
      this.aldult = b.aldult;
      this.student = b.student;
      this.half = b.half;
    },

    // 開啟modal

    openModal() {
      const modal = this.$refs.SeatModal;

      modal.showModal();
    },
    //  取得餐飲資料
    getCandys() {
      this.isLoading = true;

      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CANDYPATH}/products`;

      this.$http
        .get(Api)
        .then((res) => {
          this.Candys = res.data.products;

          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  computed: {
    // 利用router 篩選出選擇的電影品項ID 利用此ID取得購物車ID與資料
    // dataList() {
    //   const a = this.carts.filter((item) => item.product_id === this.$route.params.id);
    //   return a[0];
    // },
  },
  // watch: {
  //   carts() {
  //     const a = this.carts.filter((item) => item.product_id === this.$route.params.id);
  //     const b = a[0];
  //     this.dataList = b;
  //     this.aldult = b.aldult;
  //     this.student = b.student;
  //     this.half = b.half;
  //     console.log(this.dataList);
  //   },
  // },

  created() {
    this.getusercarts();
    this.getCandys();
  },
};
</script>

<style lang="scss" scoped>
// 設定卡片重疊陰影
.productflex {
  display: flex;
  flex-wrap: wrap;
}
.addticket {
  .product {
    position: relative;
    margin: 1rem;
    width: 9rem;
    height: 18rem;
  }
  img {
    height: 73%;
    width: 100%;
  }
  .product:hover {
    .cardhover {
      opacity: 0.6;
    }
  }
  .cardhover {
    display: flex;
    min-width: 9rem;
    width: 100%;
    height: 73%;
    background-color: black;

    opacity: 0;
    position: absolute;
    transition: all 0.5s;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;

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
    .product {
      width: 18rem;
      height: 27rem;
    }
  }
}
</style>
