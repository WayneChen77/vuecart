<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0">
    <ToastView v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script>
import ToastView from '@/components/ToastView.vue';

export default {
  components: { ToastView },
  data() {
    return {
      messages: [{ title: 'haha' }],
    };
  },
  inject: ['emitter'],
  mounted() {
    // 請自行補上 emitter 事件
    this.emitter.on('push-msg', (msg) => {
      const { style = 'succes', title, content } = msg;

      this.messages.push({ style, title, content });
    });
  },
};
</script>
