<template>
  <div class="searchBox">
    <ul class="searchItem">
      <li class="first open">
        <a href="#" @click.prevent="btncontrol = !btncontrol" :class="{ linkWord: btncontrol }"
          >快速訂票</a
        >

        <section id="searchForm1" class="searchSet" :class="{ searchForm1: btncontrol }">
          <form class="bookBox">
            <ul>
              <li class="row">
                <i class="col-1 bi bi-camera-reels-fill"></i>
                <select
                  aria-labelledby="lbl-main-menu-mob"
                  name="movie"
                  data-prompt-position="topLeft"
                  class="col form-control validate[required]"
                  v-model="catchItem"
                >
                  <!-- 選的電影 是其中一個title 有其他同名時間 所以時間要另外再filter -->
                  <option selected value="" disabled>請選擇影片</option>
                  <option :value="item" v-for="(item, index, key) in dataList" :key="key">
                    {{ item.title }}
                  </option>
                </select>
              </li>

              <li class="row">
                <i class="col-1 bi bi-calendar2-plus"></i>
                <select
                  name="date"
                  data-prompt-position="topLeft"
                  aria-labelledby="lbl-main-menu-mob"
                  class="form-control col validate[required]"
                  v-model="catchDay"
                >
                  <option selected value="" disabled>請選擇日期</option>

                  <option :value="i" v-for="(i, index, key) in dataDay" :key="key">
                    {{ i.day }}
                  </option>
                </select>
              </li>

              <li class="row">
                <i class="bi bi-clock col-1"></i>
                <select
                  name="session"
                  data-prompt-position="topLeft"
                  aria-labelledby="lbl-main-menu-mob"
                  class="form-control col validate[required]"
                  v-model="catchTime"
                >
                  <option selected value="" disabled>請選擇時間</option>
                  <option :value="i" v-for="i in dataTime" :key="i">{{ i.time }}</option>
                </select>
              </li>
            </ul>
            <section class="btnArea text-center m-3">
              <button type="button" class="btn btn-info" @click="buyticket">前往訂票</button>
            </section>
          </form>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catchItem: '',
      catchDay: '',
      catchTime: '',

      btncontrol: false,
    };
  },
  methods: {
    buyticket() {
      const cart = {
        product_id: this.catchTime.id,

        qty: 1,
        aldult: 1,
        student: 0,
        half: 0,
      };
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(Api, { data: cart })
        .then((res) => {
          console.log(res);
          //   傳入動態電影ID 以利下一頁取得產品ID

          this.$router.push(`/addticket/${cart.product_id}`);
        })
        .catch((e) => {
          console.loc(e);
        });
    },
  },

  computed: {
    dataList() {
      return this.searchdatalist.filter((item) => item.is_showing !== 0);
    },
    dataDay() {
      const a = this.searchfilmproducts.filter((item) => item.title === this.catchItem.title);
      const result = new Set();
      const repeat = new Set();
      const b = [];
      a.forEach((item) => {
        if (result.has(item.day)) {
          repeat.add(item);
        } else {
          result.add(item.day);
          b.push(item);
        }
      });

      return b;
    },
    dataTime() {
      const b = this.searchfilmproducts.filter((i) => i.title === this.catchItem.title);

      return b.filter((i) => i.day === this.catchDay.day);
    },
  },
  //   searchdatalist為上層下來以篩選title searchfilmproducts為全部資料
  // 之後要設定排除comming問題 item.is_showing !== 0應可形 但其他要記得設定

  //   目前以抓到日期 彈還沒排除重複期 解決這個 還有目前時間沒抓到
  props: ['searchdatalist', 'searchfilmproducts'],
};
</script>

<style lang="scss" scoped>
.bi.col-1 {
  transform: translateX(-100%);
  font-size: 1.5rem;
}
.searchBox {
  position: fixed;
  z-index: 50;
  right: 0;
  top: 135px;
}
.searchBox ul.searchItem {
  position: relative;
  li {
    list-style: none;
  }
}
.searchBox ul.searchItem li a {
  &.linkWord {
    right: 345px;
  }
  transition: all 1s;
  position: absolute;
  z-index: 90;
  right: 0;
  top: 30px;
  width: 35px;
  height: 105px;
  padding: 10px 13px 10px 10px;
  line-height: 1.3em;
  background-color: #666;
  //   border-top: 1px solid #888;
  //   border-bottom: 1px solid #555;
  color: #fff;
}

.searchBox ul.searchItem li .searchSet {
  &.searchForm1 {
    right: 0px;
  }
  transition: all 1s;
  position: absolute;
  z-index: 99;
  top: 0;
  right: -350px;
  width: 350px;
  background-color: #2660a9;
  -webkit-border-radius: 15px 15px 15px 15px;
  border-radius: 15px 0 0 15px;
}
.searchBox ul.searchItem li .searchSet .bookBox {
  padding: 25px 6.25% 25px;
  ul li {
    margin-bottom: 1rem;
  }
}
</style>
