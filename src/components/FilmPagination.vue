<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        :class="{ disabled: !pages.has_pre }"
        @click.prevent="clickPagination(pages.current_page - 1)"
        @keyup.enter="clickPagination(pages.current_page - 1)"
      >
        <a class="page-link" href=" " aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="i in pages.total_pages"
        :key="'pages' + i"
        :class="{ active: pages.current_page === i }"
        @click.prevent="clickPagination(i)"
        @keyup.enter="clickPagination(i)"
      >
        <a class="page-link" href="#">{{ i }}</a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: !pages.has_next }"
        @click.prevent="clickPagination(pages.current_page + 1)"
        @keyup.enter="clickPagination(pages.current_page + 1)"
      >
        <a class="page-link" href="" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ['pages'],
  methods: {
    updatePage() {},
    clickPagination(e) {
      this.$emit('change-pagination', e);
    },
  },
};
</script>
