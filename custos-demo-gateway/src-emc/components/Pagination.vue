<template>
  <nav role="navigation" aria-label="pagination">
    <ul class="rvt-pagination rvt-pagination--small rvt-pagination--right">
      <li class="rvt-pagination__item">
        <a href="#" aria-label="Previous page">Previous</a>
      </li>
      <li class="rvt-pagination__item">
        <a href="#" aria-label="Page 1">1</a>
      </li>
      <li class="rvt-pagination__item is-disabled">
        <a href="#" class="rvt-flex" tabindex="-1" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g fill="currentColor">
              <circle cx="8" cy="8" r="2"></circle>
              <circle cx="14" cy="8" r="2"></circle>
              <circle cx="2" cy="8" r="2"></circle>
            </g>
          </svg>
        </a>
      </li>
      <li class="rvt-pagination__item">
        <a href="#" aria-label="Page 6">6</a>
      </li>
      <li class="rvt-pagination__item">
        <a href="#" aria-label="Page 6">7</a>
      </li>
      <li class="rvt-pagination__item is-active" aria-current="true">
        <a href="#" aria-label="Page 8, current page">8</a>
      </li>
      <li class="rvt-pagination__item">
        <a href="#" aria-label="Page 9">9</a>
      </li>
      <li class="rvt-pagination__item is-disabled">
        <a href="#" class="rvt-flex" tabindex="-1" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g fill="currentColor">
              <circle cx="8" cy="8" r="2"></circle>
              <circle cx="14" cy="8" r="2"></circle>
              <circle cx="2" cy="8" r="2"></circle>
            </g>
          </svg>
        </a>
      </li>
      <li class="rvt-pagination__item">
        <a href="#" aria-label="Page 20, last page">20</a>
      </li>
      <li class="rvt-pagination__item">
        <a href="#" aria-label="Next set of pages">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination"
}
</script>

<style scoped>

</style>