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
                    v-model="filmProduct.imageUrl"
                /></label>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="filmProduct.imageUrl = ''"
                >
                  移除
                </button>
              </div>

              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片 <i class="fas fa-spinner fa-spin"></i
                  ><input type="file" class="form-control" ref="fileInput" @change="uploadFile" />
                </label>
                <div><img class="w-100" :src="filmProduct.imageUrl" alt="" /></div>
              </div>
              <img class="img-fluid" alt="" />

              <div class="mt-5" v-if="filmProduct.images">
                <div class="mb-3">
                  <label for="customFile" class="form-label"
                    >新增 其餘圖片
                    <input
                      id="customFile"
                      type="file"
                      class="form-control"
                      ref="fileInputs"
                      @change="uploadFiles(key)"
                      multiple
                    /><i class="fas fa-spinner fa-spin"></i>
                  </label>
                </div>

                <div v-for="(image, key) in filmProduct.images" class="mb-3 input-group" :key="key">
                  <input
                    type="url"
                    class="form-control form-control"
                    v-model="filmProduct.images[key]"
                    placeholder="請輸入連結"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="filmProduct.images.splice(key, 1)"
                  >
                    移除
                  </button>
                </div>
                <div
                  v-if="
                    filmProduct.images[filmProduct.images.length - 1] || !filmProduct.images.length
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="filmProduct.images.push('')"
                  >
                    新增其餘圖片網址
                  </button>
                </div>

                <!--  -->
                <swiper
                  :modules="modules"
                  :slides-per-view="1"
                  :space-between="50"
                  navigation
                  :pagination="{ clickable: true }"
                  :scrollbar="{ draggable: true }"
                >
                  <swiper-slide v-for="(image, key) in filmProduct.images" :key="key"
                    ><img :src="image" :id="'圖片+image'" class="d-block w-100" alt="..."
                  /></swiper-slide>
                </swiper>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="row gx-2">
                <div class="mb-3 col-md-4">
                  <label for="title" class="form-label"
                    >電影名稱<input
                      id="title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入名稱"
                      v-model="filmProduct.title"
                  /></label>
                  <label for="title" class="form-label"
                    >英文名稱<input
                      id="title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入名稱"
                      v-model="filmProduct.engtitle"
                  /></label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="title" class="form-label"
                    >電影分級<input
                      id="title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入名稱"
                      v-model="filmProduct.grand"
                  /></label>
                  <label for="title" class="form-label"
                    >電影版本<input
                      id="title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入名稱"
                      v-model="filmProduct.version"
                  /></label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="title" class="form-label"
                    >上映日期<input
                      id="title"
                      type="date"
                      class="form-control"
                      placeholder="請輸入名稱"
                      v-model="filmProduct.day"
                  /></label>
                  <label for="title" class="form-label"
                    >場次時間<input
                      id="title"
                      type="number"
                      class="form-control"
                      placeholder="請輸入名稱"
                      v-model="filmProduct.time"
                  /></label>
                </div>
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
                      placeholder="請輸入票價"
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
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="description" class="form-label"
                    >電影介紹
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入描述"
                      v-model="filmProduct.description"
                    ></textarea>
                  </label>
                  <label for="category" class="form-label"
                    >片長<input
                      id="category"
                      type="number"
                      class="form-control"
                      placeholder="請輸入分類"
                      v-model="filmProduct.flength"
                  /></label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label"
                    >導演<input
                      id="category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類"
                      v-model="filmProduct.director"
                  /></label>
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
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
                <div class="mb-3 col-md-6" v-if="filmProduct.actors">
                  <div
                    v-for="(image, key) in filmProduct.actors"
                    class="mb-3 input-group"
                    :key="key"
                  >
                    <input
                      type="text"
                      class="form-control form-control"
                      v-model="filmProduct.actors[key]"
                      placeholder="請輸入名字"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="filmProduct.actors.splice(key, 1)"
                    >
                      移除
                    </button>
                  </div>
                  <div
                    v-if="
                      filmProduct.actors[filmProduct.actors.length - 1] ||
                      !filmProduct.actors.length
                    "
                  >
                    <button
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="filmProduct.actors.push('')"
                    >
                      新增演員名單
                    </button>
                  </div>
                </div>
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

import { Swiper, SwiperSlide } from 'swiper/vue';

// 應該設定在哪個位置

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  data() {
    return { modal: {}, filmProduct: {}, modules: [Navigation, Pagination, Scrollbar, A11y] };
  },
  components: {
    Swiper,
    SwiperSlide,
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
      if (!this.filmProduct.images) {
        this.filmProduct.images = [];
      }
      if (!this.filmProduct.actors) {
        this.filmProduct.actors = [];
      }
    },
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.filmProduct.imageUrl = response.data.imageUrl;
        }
      });
    },

    uploadFiles() {
      const uploadedFile = this.$refs.fileInputs.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.axios.post(api, formData).then((response) => {
        if (response.data.success) {
          this.filmProduct.images.push(response.data.imageUrl);
        }
      });
    },
  },

  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

<style lang="scss" scoped></style>
