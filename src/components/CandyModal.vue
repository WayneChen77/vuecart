<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">餐飲</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body row">
          <div class="col">
            <div class="mb-3">
              <label for="title"
                >餐點<input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempCandy.title"
                  placeholder="請輸入標題"
              /></label>
            </div>
            <div class="mb-3">
              <label for="candy_category"
                >類別
                <input
                  type="text"
                  class="form-control"
                  id="candy_category"
                  v-model="tempCandy.category"
                  placeholder="類型"
              /></label>
            </div>
            -->
            <div class="mb-3">
              <label for="tempCandy_unit"
                >數量<input
                  type="text"
                  class="form-control"
                  id="tempCandy_unit"
                  v-model.number="tempCandy.unit"
                  placeholder="請輸入單位"
              /></label>
            </div>
            <div class="mb-3">
              <label for="tempCandy_origin_price"
                >原價<input
                  type="number"
                  class="form-control"
                  id="tempCandy_origin_price"
                  v-model.number="tempCandy.origin_price"
                  placeholder="請輸入價格"
              /></label>
            </div>
            <div class="mb-3">
              <label for="tempCandy_price"
                >優惠<input
                  type="number"
                  class="form-control"
                  id="tempCandy_price"
                  v-model.number="tempCandy.price"
                  placeholder="請輸入價格"
              /></label>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="image" class="form-label"
                >輸入圖片網址
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="tempCandy.imageUrl"
              /></label>
              <button type="button" class="btn btn-outline-danger" @click="tempCandy.imageUrl = ''">
                移除
              </button>
            </div>

            <div class="mb-3">
              <label for="customFile" class="form-label"
                >或 上傳圖片 <i class="fas fa-spinner fa-spin"></i
                ><input type="file" class="form-control" ref="fileInput" @change="uploadFile" />
              </label>
              <div><img class="w-100" :src="tempCandy.imageUrl" alt="" /></div>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempCandy.is_enabled"
                    id="is_enabled"
                /></label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="$emit('update-candy', tempCandy)">
            更新餐飲
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalmixins';

export default {
  name: 'candyModal',
  props: {
    candyProduct: {},
  },
  methods: {
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData).then((res) => {
        if (res.data.success) {
          this.tempCandy.imageUrl = res.data.imageUrl;
        }
      });
    },
  },
  data() {
    return {
      tempCandy: {},
    };
  },
  emits: ['update-candy'],
  watch: {
    candyProduct() {
      this.tempCandy = this.candyProduct;
    },
  },
  mixins: [modalMixin],
};
</script>
