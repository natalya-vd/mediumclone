<template>
  <ul class="pagination">
    <li
      v-for="page in pages"
      :key="page"
      class="page-item"
      :class="{active: props.currentPage === page}"
    >
      <router-link
        :to="{path: props.url, query: {page: page}}"
        class="page-link"
      >
        {{ page }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import {computed} from 'vue';
import {range} from '@/helpers/utils';

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const pages = computed(() => {
  const pagesCount = Math.ceil(props.total / props.limit);

  return range(1, pagesCount);
});
</script>
