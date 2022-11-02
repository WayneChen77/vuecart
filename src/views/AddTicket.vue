<template>
  <button @click="getusercarts">測試按鍵</button>
  <div class="container addticket">
    <div class="row">
      <!-- 如果使用v-for不會有問題 -->
      <!-- 不管資料形式是arry或OBJ -->
      <!-- 在取得資料時整個資料都可以輸出 -->

      <!-- 但如果不使用v-for直接取得資料中子物件時 瀏覽器都會報錯underfined -->
      <!-- 跳過報錯後卻會取得資料內容 -->

      <!-- {{ dataList[0] }}取得到值
        {{ dataLista }}取得到值 -->
      <!-- {{ dataLista.id }} 取不到值
         {{ dataList[0].id }}取不到值 -->
      <!-- 理解為資料取得是在beforemounted  html原件掛載是在mounted階段-->
      <!-- 那是什麼原因讓資料無法讀取 -->
      <!-- 報錯 -->
      <!-- <p>{{ carts[0].final_total }}</p> -->
      <!-- 報錯 -->
      <!-- 正常 -->
      <div v-if="carts[0]">
        <p>{{ carts[0].final_total }}</p>
      </div>
      <!-- 正常 -->
      <!-- 為什麼需要加v-if才能抓到資料 是否代表 在mounted掛在html時 某個時間carts[0]資料會是underfined-->
      <!-- 後來査到資料說 -->
      <!-- beforeMount：已經載入原始HTML至Virtual DOM，但內容尚未透過Vue進行渲染。
mounted：已經透過Vue進行渲染HTML，並且取代原本的元素內容。 -->
      <!-- 所以html其實在mounted前就已經掛載咯 這個時候會是導致underfined的原因嗎    -->
      <!-- Vue進行渲染HTML，並且取代原本的元素內容 所已原本內容{{ carts[0].final_total }}這時後會被讀取出data資料 -->
      <!-- 但這似乎無法解釋讀取不到資料的疑問 資料不是在created就會取得了嗎 -->

      <div class="col-12 col-sm-8" v-for="(item, index, key) in dataList" :key="key">
        left
        <div class="box row">
          <div class="addgrand col-sm-2 col-4 my-3">
            <div class="card text-white">
              <h5 class="card-header bg-success">0+</h5>
              <div class="card-body text-gray">
                <p class="card-text">{{ item.product.grand }}</p>
              </div>
            </div>
          </div>
          <div class="title col-sm-7 col-8 my-3">
            <h1>{{ item.product.title }}</h1>
            <p>{{ item.product.engtitle }}</p>
          </div>
          <div class="des col-sm-3 col-12 my-3">
            <p>標籤{{ item.product.day }}</p>
            <p><i class="bi bi-clock"></i>時間:{{ item.product.time }}</p>
            <p><i class="bi bi-camera-reels"></i>影廳:{{ item.product.theater }}</p>
          </div>
        </div>
        <div class="bg-gray">
          <div class="text-center text-white p-3 my-3">
            <h2>選擇電影票</h2>
            <p class="pt-3">
              選擇您希望購買的電影票張數和類型.請注意系統將自動為您保留可訂的最佳座位,
              每筆交易最多可購買10張電影票
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
                      <th scope="col">張數</th>
                      <th scope="col">總價</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">全票</th>
                      <td>300</td>
                      {{
                        this.aldult
                      }}
                      <td>
                        <select
                          aria-labelledby="lbl-main-menu-mob"
                          data-prompt-position="topLeft"
                          class="form-control w-25"
                          v-for="(item, index, key) in dataList"
                          :key="key"
                          v-model="item.aldult"
                          :value="item.aldult"
                        >
                          <option value="">{{ item.aldult }}111</option>
                          <option v-for="(i, index, key) in number" :key="key">{{ i }}</option>
                        </select>
                      </td>
                      <td>總價</td>
                    </tr>
                    <tr>
                      <th scope="row">學生票</th>
                      <td>300-20</td>
                      <td>
                        <select
                          aria-labelledby="lbl-main-menu-mob"
                          data-prompt-position="topLeft"
                          class="form-control w-25"
                          v-model="student"
                        >
                          <option selected value="">0</option>
                          <option v-for="(i, index, key) in number" :key="key">{{ i }}</option>
                        </select>
                      </td>
                      <td>總數</td>
                    </tr>
                    <tr>
                      <th scope="row">愛心票</th>
                      <td>300/2</td>
                      <td>
                        <select
                          aria-labelledby="lbl-main-menu-mob"
                          data-prompt-position="topLeft"
                          class="form-control w-25"
                          v-model="half"
                        >
                          <option value="">0</option>
                          <option v-for="(i, index, key) in number" :key="key">{{ i }}</option>
                        </select>
                      </td>
                      <td>總數</td>
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
                <div class="productflex">
                  <div class="card product">
                    <img
                      src="https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?cs=srgb&dl=pexels-jonathan-borba-2983100.jpg&fm=jpg&_gl=1*zzanli*_ga*MTQyOTQ4NzA2Ni4xNjY2MzE5MTU2*_ga_8JE65Q40S6*MTY2NzIwNDI2My44LjEuMTY2NzIwNDcyMC4wLjAuMA.."
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="cardhover">
                      <p class="hovertxt">
                        <a
                          href="https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?cs=srgb&dl=pexels-jonathan-borba-2983100.jpg&fm=jpg&_gl=1*zzanli*_ga*MTQyOTQ4NzA2Ni4xNjY2MzE5MTU2*_ga_8JE65Q40S6*MTY2NzIwNDI2My44LjEuMTY2NzIwNDcyMC4wLjAuMA.."
                          ><span>.</span> <i class="bi bi-hand-index text-white border border-3"></i
                        ></a>
                      </p>
                    </div>
                    <div class="card-body position-absolute end-0 bottom-0">
                      <h6 class="card-title">大杯可樂</h6>
                      <span class="card-text pe-2">$110</span>
                      <select
                        aria-labelledby="lbl-main-menu-mob"
                        data-prompt-position="topLeft"
                        class=""
                      >
                        <option selected value="" disabled>0</option>
                        <option>123</option>
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

        <div class="card text-white my-5" v-for="(item, index, key) in dataList" :key="key">
          <h5 class="card-header bg-titleblue">:{{ item.product.title }}</h5>
          <div class="card-body text-gray">
            <p class="card-text">
              影廳:{{ item.product.theater }} ,<span>時間:{{ item.product.time }}</span>
            </p>
            <p class="card-text">
              <span>seat:{{ item.qty }}</span>
            </p>
            <p class="position-relative">
              <span>金額$:{{ item.total }}</span
              ><a
                href="#"
                class="btn btn-primary position-absolute end-0"
                @click.prevent="getusercarts"
                >選擇座位
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
      number: 4,
      aldult: 0,
      student: 0,
      half: 0,
      datalista: {},
    };
  },
  methods: {
    getusercarts() {
      // 取得購物車群資料
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(Api)
        .then((res) => {
          this.carts = res.data.data.carts;
          console.log(res.data.data.carts);
        })
        .catch((e) => {
          console.loc(e);
        });
    },
  },
  computed: {
    // 利用router 篩選出選擇的電影品項ID 利用此ID取得購物車ID與資料
    dataList() {
      return this.carts.filter((item) => item.product_id === this.$route.params.id);
    },
    dataLista() {
      const a = this.carts.filter((item) => item.product_id === this.$route.params.id);
      return a[0];
    },
  },

  created() {
    this.getusercarts();
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
