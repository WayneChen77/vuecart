<template>
  <!-- 全域原件 -->
  <LoadingView :active="isLoading"></LoadingView>

  <div class="container">
    <button class="btn btn-titleblue col-2" @click="openModal(true)">新增折扣</button>
  </div>

  <table class="table mt-4 container">
    <thead>
      <tr>
        <th width="120">折扣名稱(代碼)</th>
        <th>折數</th>
        <th>期限</th>
        <th>開啟</th>

        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(i, index, key) in coupons" :key="key">
        <!-- <tr> -->
        <td>{{ i.title + `(${i.code})` }}</td>
        <td>{{ i.percent }}</td>
        <td>{{ $filters.date(i.due_date) }}</td>

        <td>
          <span class="text-success">{{ i.is_enabled === 1 ? '生效' : '失效' }}</span>
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
  <CouponModal :coupon="coupontemp" @update-coupon="updateCoupon" ref="CouponModal"></CouponModal>
  <DeleteModal :product="coupontemp" @del-item="delitem" ref="DeleteModal"></DeleteModal>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
// 分頁資訊

export default {
  data() {
    return {
      // 所有資料
      coupons: [],
      // 要傳往modal處理的資料
      coupontemp: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: { CouponModal, DeleteModal },
  methods: {
    openModal(isNew, item) {
      if (isNew) {
        this.coupontemp = {};
      } else {
        this.coupontemp = { ...item };
      }
      // this.isNew = isNew;這個讓下方update方法判斷用put還是post
      this.isNew = isNew;
      const modal = this.$refs.CouponModal;

      modal.showModal();
    },
    // 開啟刪除開區塊
    deleteModal(item) {
      this.coupontemp = { ...item };
      const modal = this.$refs.DeleteModal;

      modal.showModal();
    },
    // 刪除資料/api/:api_path/admin/product/:product_id
    delitem(item) {
      // 開啟讀取效果
      this.isLoading = true;
      this.coupontemp = item;

      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
      this.$http
        .delete(Api)
        .then((res) => {
          // 關閉讀取效果
          this.isLoading = false;
          const modal = this.$refs.DeleteModal;
          this.getCoupons();
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

    updateCoupon(item) {
      // 開啟讀取效果
      this.isLoading = true;
      this.coupontemp = item;
      const modal = this.$refs.CouponModal;
      // 新增
      let Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = 'post';
      //   修改
      if (!this.isNew) {
        Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        httpMethod = 'put';
      }
      // 這邊如果將modal 放到139行
      modal.hideModal();
      this.$http[httpMethod](Api, { data: this.coupontemp }).then((res) => {
        // 如果放到這 或141下方 load都會被moadl蓋住 是否要使用css設定z-index還是有內建設定的方式
        // 關閉讀取效果
        this.isLoading = false;
        console.log(res.data.message);
        if (res.data.success) {
          this.getCoupons();

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
    getCoupons() {
      this.isLoading = true;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`;

      this.$http
        .get(Api)
        .then((res) => {
          this.coupons = res.data.coupons;

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
    this.getCoupons();
  },
};
</script>

<style lang="scss" scoped></style>
