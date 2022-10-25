<template>
  <div class="nav">
    <div class="container pt-3">
      <nav class="navbar navbar-expand-lg navbar-titleblue bg-titleblue">
        <router-link class="text-light" to="/">XX影城</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">影院介紹</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/FilmAboutView">電影介紹</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/#">販賣部</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">會員登入</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light disabled" href="#" tabindex="-1" aria-disabled="true"
                >Disabled</a
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav {
  background-color: #2660a9;

  #navbarNav {
    justify-content: center;
  }
}
@media (min-width: 992px) {
  #navbarNav {
    font-size: 1.5rem;
    ul li {
      padding: 0rem 2rem;
      a {
        color: white;
      }

      .active {
        color: rgb(244, 228, 142);
      }
    }
  }
}
</style>
