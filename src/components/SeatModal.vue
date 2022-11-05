<template>
  <!-- Button trigger modal -->

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
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">影廳座位</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="hideModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!-- <div class="modal-body">...</div> -->
        <div class="modal-body">
          <input
            type="button"
            name="submit_Btn"
            id="submit_Btn"
            value="2"
            style="background-image: url(XXX.jpg); width: 30px; height: 30px"
            @click="bt2"
          />
          <div class="container-fluid">
            <div class="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20vw"
                height="20vw"
                fill="currentColor"
                class="bi bi-tv-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a
                    .5.5 0 0 1-.5-.5zM2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2z"
                />
              </svg>
              <!-- <i class="bi bi-tv-fill"></i> -->
            </div>
            <div class="row seat">
              <button
                v-for="(i, index, key) in seatitem"
                :key="key"
                style="background-image: url(XXX.jpg)"
                class="col-1 text-center ca"
                :class="i.state"
                @click="selectSeat(i)"
              >
                {{ i.i % 10 }}
                {{ i.index }}
                <!-- {{ i.state }} -->
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <p>
              已選座位:<span v-for="(item, index, key) in seatSelect" :key="key"
                >{{ item.i }},</span
              >
            </p>
          </div>
          <div class="modal-footer col-4">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">
              取消
            </button>
            <button type="button" class="btn btn-primary">確定 {{ dataa }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalmixiins from '@/mixins/modalmixins';

export default {
  props: {
    dataa: { type: Object },
    default() {
      return {};
    },
  },
  data() {
    return {
      isshow: true,
      modal: '',
      //  全部座位資料
      seatitem: [],
      // 目前選中座位
      seatSelect: [],
      // 可選座位數
      num: 3,
    };
  },
  methods: {
    // 測試用新增座位
    bt2() {
      //   for (let i = 0; i < 20; i += 1) {
      //     const a = { i, state: 'none' };
      //     this.seatitem = [...this.seatitem, a];
      //   }
      console.log(this.dataa);
    },
    // 點擊座位函式
    selectSeat(i) {
      if (i.state === 'none' && this.seatSelect.length === this.num) {
        alert('請先取消已選擇座位');
      } else if (i.state === 'none') {
        this.seatitem[i.i].state = 'userselect';
        this.seatSelect.push(i);
      } else {
        this.seatitem[i.i].state = 'none';
        const b = this.seatSelect.filter((item) => item.i !== i.i);

        this.seatSelect = b;
      }
    },
  },
  // watch: {
  //   // 選種座位
  //   seatSelect(n) {
  //     if (this.browseLog.indexOf(n) === -1) {
  //       this.browseLog.unshift(n);
  //       if (this.browseLog.length > 3) {
  //         this.browseLog.pop();
  //       }
  //     }
  //   },
  // },
  mixins: [modalmixiins],
};
</script>

<style lang="scss" scoped>
.seat {
  padding: 1rem;
  .ca {
    margin-bottom: 0.5rem;
    background-color: blue;
  }
  .userselect {
    background-color: orange;
  }
  .ca {
    &:nth-child(1)::before {
      content: 'A';
      position: absolute;
      left: 8px;
    }
    &:nth-child(11)::before {
      content: 'B';
      position: absolute;
      left: 8px;
    }
  }

  .ca:nth-child(10n) {
    color: white;
  }
  .ca:nth-child(10n + 5) {
    margin-right: 6%;
  }
  .ca:nth-child(10n + 6) {
    margin-left: 6%;
  }
}

.candy {
  height: 500px;
  width: 100%;
  background-color: aqua;

  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .v-enter-tp,
  .v-leave-from {
    opacity: 1;
  }
}
</style>
