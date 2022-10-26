<template>
  <!-- 全域原件 -->
  <LoadingView :active="isLoading"></LoadingView>
  <div class="container bg-danger">this is product page</div>
</template>

<script>
export default {
  data() {
    return { isLoading: false };
  },
  methods: {
    getfilmproduct() {
      this.isLoading = true;
      // 取得path來使用
      const { id } = this.$route.params;
      const Api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(Api)
        .then((res) => {
          this.filmproduct = res.data.product;
          console.log(res.data);
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getfilmproduct();
  },
};
</script>

<style lang="scss" scoped></style>
