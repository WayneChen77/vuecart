<template>
  <div
    class="modal fade"
    id="delModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <!-- <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>{{ product.title }}</span>
        </h5>
        <button @click="$emit('del-item', product)">刪除</button>
        <button @click="hideModal">取消</button>
      </div>
    </div> -->
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-warning">
          <h1 class="modal-title fs-5" id="exampleModalLabel">刪除場次</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h5 class="modal-title" id="exampleModalLabel">
            <p>日期:待設定</p>
            <p>
              <span>{{ product.theater }}</span>
              <span>{{ product.title }}</span>
            </p>
            <p>
              場次時間<span>{{ product.time }}</span>
            </p>
          </h5>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="$emit('del-item', product)">
            確認刪除
          </button>
          <button type="button" class="btn btn-secondary" @click="hideModal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Modal from 'bootstrap/js/dist/modal';
import modalmixiins from '@/mixins/modalmixins';

export default {
  data() {
    return {
      modal: '',
    };
  },
  props: {
    product: { type: Object },
    default() {
      return {};
    },
  },
  mixins: [modalmixiins],
  //   mounted() {
  //     this.modal = new Modal(this.$refs.modal);
  //   },
  //   methods: {
  //     showModal() {
  //       this.modal.show();
  //     },
  //     hideModal() {
  //       this.modal.hide();
  //     },
  //   },
};
</script>

<style lang="scss" scoped></style>
