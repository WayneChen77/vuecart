<template>
  <!-- 全域原件 -->
  <LoadingView :active="isLoading"></LoadingView>

  <div class="text-end">
    this 控制台
    <button class="btn btn-titleblue" @click="openModal(true)">新增映演</button>
  </div>
  {{ filmproducts[9] }}
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>電影名稱</th>
        <th>影廳</th>
        <th>上映時間</th>
        <th>級別</th>
        <th>剩餘坐位</th>
        <th width="120">全票</th>
        <th width="120">學生票</th>
        <th width="120">愛心票</th>
        <th width="100">熱映中</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in filmproducts" :key="i.id">
        <td>{{ i.category }}</td>
        <td>{{ i.title }}</td>
        <td>{{ i.theater }}</td>
        <td>{{ i.day }}</td>
        <td>{{ i.grand }}</td>
        <td>{{ i.unit - i.售出 }}</td>
        <td class="text-right">{{ $filters.currency(i.origin_price) }}</td>
        <td class="text-right">{{ $filters.currency(i.price) }}</td>
        <td class="text-right">{{ i.origin_price * 0.4 }}</td>
        <td>
          <span class="text-success" v-if="i.is_showing"
            >showwing{{ i.is_enabled === 1 ? '(上架)' : '(下架)' }}</span
          >
          <span class="text-success" v-if="!i.is_showing"
            >comming {{ i.is_enabled === 1 ? '(上架)' : '(下架)' }}
          </span>
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
  <FilmPagination :pages="pagination" @change-pagination="getfilmproducts"></FilmPagination>
  <FilmProductModal
    :product="filmproduct"
    @update-product="updateProduct"
    ref="FilmProductModal"
  ></FilmProductModal>
  <DeleteModal :product="filmproduct" @del-item="delitem" ref="DeleteModal"></DeleteModal>
</template>

<script>
import FilmProductModal from '@/components/FilmProductModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
// 分頁資訊
import FilmPagination from '@/components/FilmPagination.vue';

export default {
  data() {
    return {
      // 所有資料
      filmproducts: [],
      // 頁碼資料 傳往下層處理
      pagination: [],
      testuse: {},
      // 要傳往modal處理的資料
      filmproduct: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: { FilmProductModal, DeleteModal, FilmPagination },
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
    // 開啟刪除開區塊
    deleteModal(item) {
      this.filmproduct = { ...item };
      const modal = this.$refs.DeleteModal;

      modal.showModal();
    },
    // 刪除資料/api/:api_path/admin/product/:product_id
    delitem(item) {
      // 開啟讀取效果
      this.isLoading = true;
      this.filmproduct = item;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      this.$http
        .delete(Api)
        .then((res) => {
          // 關閉讀取效果
          this.isLoading = false;
          const modal = this.$refs.DeleteModal;
          this.getfilmproducts();
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
    // /api/:api_path/admin/products
    // /api/:api_path/admin/product
    updateProduct(item) {
      // 開啟讀取效果
      this.isLoading = true;
      this.filmproduct = item;
      const modal = this.$refs.FilmProductModal;
      // 新增
      let Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      //   修改
      if (!this.isNew) {
        Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      // 這邊如果將modal 放到139行
      modal.hideModal();
      this.$http[httpMethod](Api, { data: this.filmproduct }).then((res) => {
        // 如果放到這 或141下方 load都會被moadl蓋住 是否要使用css設定z-index還是有內建設定的方式
        // 關閉讀取效果
        this.isLoading = false;

        if (res.data.success) {
          this.getfilmproducts();

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
    getfilmproducts(page = 1) {
      this.isLoading = true;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
      this.$http
        .get(Api)
        .then((res) => {
          this.filmproducts = res.data.products;
          this.pagination = res.data.pagination;
          console.log(res.data);
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
    this.getfilmproducts();
  },
};
</script>

<style lang="scss" scoped></style>
