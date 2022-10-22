<template>
  <div class="container-fluid">後台管理<router-view></router-view></div>
</template>

<script>
export default {
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;

    const Api = `${process.env.VUE_APP_API}api/user/check`;

    this.$http
      .post(Api)
      .then((res) => {
        console.log(res.data);

        if (!res.data.success) {
          this.$router.push('login');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style lang="scss" scoped></style>
