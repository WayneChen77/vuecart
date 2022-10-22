<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signin">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only"
            >Email address
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              required
              v-model="user.username"
          /></label>
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only"
            >Password
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              required
              autocomplete="off"
              v-model="user.password"
          /></label>
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const Api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(Api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `userToken=${token}; expires=${new Date(expired)}`;
            this.$router.push('dashboard/filmproduct');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
