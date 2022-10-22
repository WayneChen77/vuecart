<template>
  <div class="text-end">
    this 控制台
    <button class="btn btn-titleblue" @click="openModal(true)">新增映演</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>電影名稱</th>
        <th>影廳</th>
        <th>放映時間</th>
        <th>廳位數</th>
        <th>剩餘坐位</th>
        <th width="120">全票</th>
        <th width="120">學生票</th>
        <th width="120">愛心票</th>
        <th width="100">是否上映</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>分類</td>
        <td>標題</td>
        <td>C5</td>
        <td>12:00</td>
        <td>100</td>
        <td>100</td>
        <td class="text-right">200</td>
        <td class="text-right">100</td>
        <td class="text-right">100</td>
        <td>
          <span class="text-success">上映</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="getfilmproducts">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <FilmProductModal
    :product="filmproduct"
    @update-product="updateProduct"
    ref="FilmProductModal"
  ></FilmProductModal>

  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>電影名稱</th>
        <th>影廳</th>
        <th>放映時間</th>
        <th>廳位數</th>
        <th>剩餘坐位</th>
        <th width="120">全票</th>
        <th width="120">學生票</th>
        <th width="120">愛心票</th>
        <th width="100">是否上映</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in filmproducts" :key="i.id">
        <td>{{ i.category }}</td>
        <td>{{ i.title }}</td>
        <td>{{ i.theater }}</td>
        <td>{{ testuse.放映時間 }}</td>
        <td>{{ testuse.坐位數 }}</td>
        <td>{{ testuse.坐位數 - testuse.售出 }}</td>
        <td class="text-right">{{ i.origin_price }}</td>
        <td class="text-right">{{ i.price }}</td>
        <td class="text-right">{{ i.origin_price * 0.4 }}</td>
        <td>
          <span class="text-success" v-if="i.is_enabled">上映</span>
          <span class="text-success" v-else>下映</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, i)">
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import FilmProductModal from '@/components/FilmProductModal.vue';

export default {
  data() {
    return { filmproducts: [], pagination: [], testuse: {}, filmproduct: {}, isNew: false };
  },
  components: { FilmProductModal },
  methods: {
    openModal(isNew, item) {
      if (isNew) {
        this.filmproduct = {};
      } else {
        this.filmproduct = { ...item };
      }
      // this.isNew = isNew;這個讓下方update方法判斷用put還是post
      this.isNew = isNew;
      const modal = this.$refs.FilmProductModal;

      modal.showModal();
    },
    // /api/:api_path/admin/products
    // /api/:api_path/admin/product
    updateProduct(item) {
      this.filmproduct = item;
      const modal = this.$refs.FilmProductModal;
      // 新增
      let Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      //   修改
      if (!this.isNew) {
        console.log('ddd');
        Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }

      this.$http[httpMethod](Api, { data: this.filmproduct }).then((res) => {
        console.log(res);
        modal.hideModal();
        this.getfilmproducts();
      });
    },
    getfilmproducts() {
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`;
      this.$http
        .get(Api)
        .then((res) => {
          this.filmproducts = res.data.products;
          this.pagination = res.data.pagination;
          console.log(this.filmproducts);

          //  將傳來的字串整個改成物件 如何將"物件"修改他不是"陣列"
          //   const haha = this.filmproducts.map((i) => {
          //     // // eslint-disable-next-line
          //     // const jsObja = eval('(' + i + ')');
          //     // console.log(typeof jsObja);
          //     // console.log(jsObja.放映時間);
          //     // console.log(i.content);
          //     console.log(i.indexOf(i.content));

          //     return 'ha';
          //   });
          //   console.log(haha);

          //   以下測試使用

          const jsObj = res.data.products[2].content;

          // eslint-disable-next-line
          const jsObja = eval('(' + jsObj + ')');
          this.testuse = jsObja;
          console.log(typeof jsObja);
          console.log(jsObja.放映時間);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getfilmproducts();
  },
};
</script>

<style lang="scss" scoped></style>
