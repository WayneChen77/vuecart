<template>
  <div class="candy container">
    <transition-group appear>
      <div class="block" v-if="isshow">123</div>
      <div class="block " v-if="isshow">123</div>
    </transition-group>
    <button @click="isshow = !isshow">1223</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: true,
    };
  },
};
</script>

<style lang="scss" scoped>
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
