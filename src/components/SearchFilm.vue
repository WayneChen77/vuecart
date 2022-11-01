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
                  <option selected value="" disabled>請選擇影片</option>
                  <option :value="i" v-for="(i, index, key) in searchproducts" :key="key">
                    {{ i.title }}
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
                  @change="setdetail(catchDay.detail)"
                >
                  <option selected value="" disabled>請選擇日期</option>
                  <option value="">請選擇日期</option>
                  <option :value="i" v-for="(i, index, key) in catchItem.test" :key="key">
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
                  <option :value="i" v-for="i in catchTimes" :key="i">{{ i.while }}</option>
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
      catchTimes: '',
      btncontrol: false,
    };
  },
  methods: {
    buyticket() {
      const cart = {
        day: this.catchDay.day,
        filmWhile: this.catchTime.while,
        product_id: this.catchItem.id,
        qty: 1,
      };
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(Api, { data: cart })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.loc(e);
        });
    },
    setdetail(i) {
      console.log(this.catchDay);
      if (this.catchItem) {
        if (this.catchDay) {
          this.catchTimes = i.time;
          console.log(this.catchTime);
        } else {
          this.catchTimes = [];
        }
      } else {
        this.catchTimes = [];
      }
    },
  },
  //   上方函是資料 會有bug 改變選向時無法自動清空跳回請選擇資料 要思考如何修改
  //   computed:{
  //   },
  props: ['searchproducts'],
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
