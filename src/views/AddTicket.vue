<template>
  <button @click="getusercarts">測試按鍵</button>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-8">
        left
        <div class="box row">
          <div class="addgrand col-sm-2 col-4 my-3">
            <div class="card text-white">
              <h5 class="card-header bg-success">0+</h5>
              <div class="card-body text-gray">
                <p class="card-text">普片級</p>
              </div>
            </div>
          </div>
          <div class="title col-sm-7 col-8 my-3">
            <h1>(數位)變形金剛</h1>
            <p>英文名字</p>
          </div>
          <div class="des col-sm-3 col-12 my-3">
            <p>標籤(2022/10/10)</p>
            <p>時間16:00</p>
            <p>影廳:C15</p>
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
                  #1
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
            <div class="card-header position-relative mb-1" id="headingTwo">
              <h2 class="mb-0">
                票種
                <button
                  class="btn btn-link collapsed position-absolute end-0 top-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  #2
                </button>
              </h2>
            </div>
            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
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
                種類
                <button
                  class="btn btn-link collapsed position-absolute end-0 top-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  #3
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
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4">
        right

        <div class="card text-white my-5">
          <h5 class="card-header bg-titleblue">購票資訊</h5>
          <div class="card-body text-gray">
            <p class="card-text">使用動態資料</p>
            <a href="#" class="btn btn-primary text-end">下一頁</a>
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
      carts: {},
    };
  },
  methods: {
    getusercarts() {
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(Api)
        .then((res) => {
          console.log(res.data.data.carts[0].product);
        })
        .catch((e) => {
          console.loc(e);
        });
    },
  },

  created() {
    this.getusercarts();
  },
};
</script>

<style lang="scss" scoped></style>
