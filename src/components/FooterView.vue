<template>
  <footer class="footer bg-titleblue">
    <address class="copyright">
      <p class="text-center text-white">
        Copyright © 2022 影城 Wayne Cinemas. All Rights Reserved.
      </p>
      <ul class="addressLink">
        <li><a href="">關於影城</a></li>
        <li><a href="">人才招募</a></li>
        <li><a href="">電子發票</a></li>
        <li><a href="">隱私權政策</a></li>
        <li class="close">本網站照片來源</li>
        <li class="close">網站地圖</li>
      </ul>
    </address>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.copyright {
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  ul {
    left: 0;
    right: 0;

    list-style: none;

    display: flex;
    li {
      color: white;

      margin-left: 1.5rem;
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
}
</style>
