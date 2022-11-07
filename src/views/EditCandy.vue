<template>
  <!-- 全域原件 -->
  <LoadingView :active="isLoading"></LoadingView>

  <div class="container">
    <button class="btn btn-titleblue col-2" @click="openModal(true)">新增餐飲</button>
  </div>

  <table class="table mt-4 container">
    <thead>
      <tr>
        <th width="120">餐飲名稱 <br />(類型)</th>
        <th>原價</th>
        <th>優惠價</th>
        <th>開啟</th>

        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(i, index, key) in Candys" :key="key">
        <!-- <tr> -->
        <td>
          {{ i.title }}<br />
          {{ `(${i.category})` }}
        </td>
        <td>{{ i.origin_price }}</td>
        <td>{{ i.price }}</td>

        <td>
          <span class="text-success">{{ i.is_enabled === 1 ? '開賣' : '停售' }}</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, i)">
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal(i)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 區域原件 -->
  <!-- update-coupon -->
  <CandyModal :candy-product="candy" @update-candy="updatecandy" ref="CandyModal"></CandyModal>
  <DeleteModal :product="candy" @del-item="delitem" ref="DeleteModal"></DeleteModal>
</template>

<script>
import CandyModal from '@/components/CandyModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
// 分頁資訊

export default {
  data() {
    return {
      // 所有資料
      Candys: [],
      // 要傳往modal處理的資料
      candy: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: { CandyModal, DeleteModal },
  methods: {
    openModal(isNew, item) {
      if (isNew) {
        this.candy = {};
      } else {
        this.candy = { ...item };
      }
      // this.isNew = isNew;這個讓下方update方法判斷用put還是post
      this.isNew = isNew;
      const modal = this.$refs.CandyModal;

      modal.showModal();
    },
    // 開啟刪除開區塊
    deleteModal(item) {
      this.candy = { ...item };
      const modal = this.$refs.DeleteModal;

      modal.showModal();
    },
    // 刪除資料/api/:api_path/admin/product/:product_id
    delitem(item) {
      // 開啟讀取效果
      this.isLoading = true;
      this.candy = item;
      // 往只代修改
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CANDYPATH}/admin/product/${item.id}`;
      this.$http
        .delete(Api)
        .then((res) => {
          // 關閉讀取效果
          this.isLoading = false;
          const modal = this.$refs.DeleteModal;
          this.getCandys();
          modal.hideModal();
          this.emitter.emit('push-msg', {
            style: 'danger',
            title: res.data.message,
            content: res.data.message,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatecandy(item) {
      // 開啟讀取效果
      this.isLoading = true;
      this.candy = item;
      const modal = this.$refs.CandyModal;
      // 新增
      // 往只代修改
      let Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CANDYPATH}/admin/product`;
      let httpMethod = 'post';
      //   修改
      if (!this.isNew) {
        // 往只代修改
        Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CANDYPATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      // 這邊如果將modal 放到139行
      modal.hideModal();
      this.$http[httpMethod](Api, { data: this.candy }).then((res) => {
        // 如果放到這 或141下方 load都會被moadl蓋住 是否要使用css設定z-index還是有內建設定的方式
        // 關閉讀取效果
        this.isLoading = false;
        console.log(res.data.message);
        if (res.data.success) {
          this.getCandys();

          this.emitter.emit('push-msg', {
            style: 'success',

            title: res.data.message,
            content: res.data.message,
          });
        } else {
          this.emitter.emit('push-msg', {
            style: 'warning',
            title: '更新失敗',
            content: res.data.message.join(','),
          });
        }
      });
    },
    getCandys() {
      this.isLoading = true;
      // 往只代修改
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_CANDYPATH}/admin/products`;

      this.$http
        .get(Api)
        .then((res) => {
          this.Candys = res.data.products;
          console.log(this.Candys);

          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  //   從最父層取得bus使用 用來傳遞原件資料
  inject: ['emitter'],
  created() {
    this.getCandys();
  },
};
</script>

<style lang="scss" scoped></style>
