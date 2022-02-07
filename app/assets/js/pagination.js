const pagination = {
    props: ['pages'],
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item" :class="{disabled: !pages.has_pre}">
            <a class="page-link" href="#" aria-label="Previous" @click="$emit('get-product', page = 1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" :class="{ active: page === pages.current_page}" v-for="page in pages.total_pages" :key="page">
            <a class="page-link" href="#" @click="$emit('get-product', page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{disabled: !pages.has_next}">
            <a class="page-link" href="#" aria-label="Next" @click="$emit('get-product', page = pages.total_pages)">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
  </nav>`
}