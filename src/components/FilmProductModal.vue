<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增映演</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label"
                  >輸入圖片網址
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="filmProduct.imgurls"
                /></label>
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片 <i class="fas fa-spinner fa-spin"></i
                  ><input type="file" class="form-control" />
                </label>
              </div>
              <img class="img-fluid" alt="" />
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5">
                <div class="mb-3 input-group">
                  <input
                    type="url"
                    class="form-control form-control"
                    placeholder="請輸入連結"
                    v-model="filmProduct.imgurl"
                  />
                  <button type="button" class="btn btn-outline-danger">移除</button>
                </div>
                <div>
                  <button class="btn btn-outline-primary btn-sm d-block w-100">新增圖片</button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label"
                  >電影名稱<input
                    id="title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入名稱"
                    v-model="filmProduct.title"
                /></label>
              </div>
              <div class="mb-3">
                <label for="theater" class="form-label"
                  >影廳號碼<input
                    id="title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入名稱"
                    v-model="filmProduct.theater"
                /></label>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label"
                    >分類<input
                      id="category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類"
                      v-model="filmProduct.category"
                  /></label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label"
                    >坐位數
                    <input
                      id="unit"
                      type="text"
                      class="form-control"
                      placeholder="請輸入單位"
                      v-model="filmProduct.unit"
                  /></label>
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label"
                    >全票<input
                      id="origin_price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入全票"
                      v-model="filmProduct.origin_price"
                  /></label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label"
                    >學生票<input
                      id="price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入學生票"
                      v-model="filmProduct.price"
                  /></label>
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label"
                  >產品描述
                  <textarea
                    id="description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入描述"
                    v-model="filmProduct.description"
                  ></textarea>
                </label>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label"
                  >說明內容
                  <textarea
                    id="content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入說明內容"
                    v-model="filmProduct.content"
                  ></textarea>
                </label>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <label class="form-check-label" for="is_enabled">
                    是否上映
                    <input
                      id="is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      v-model="filmProduct.is_enabled"
                  /></label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', filmProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return { modal: {}, filmProduct: {} };
  },
  props: {
    product: { type: Object },
    default() {
      return {};
    },
  },
  watch: {
    product() {
      this.filmProduct = this.product;
    },
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    // this.modal = $('#modal').modal(options);
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

<style lang="scss" scoped></style>
