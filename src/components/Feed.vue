<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, idx) in feed.articles"
        :key="idx"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
        </div>

        <div class="pull-xs-right">ADD TO FAVORITES</div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>
      <pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script setup>
import {stringify, parseUrl} from 'query-string';
import {onMounted, computed, ref, watch} from 'vue';

import {useStore} from 'vuex';
import {actionTypes} from '@/store/modules/feed';
import Pagination from '@/components/Pagination';
import {LIMIT} from '@/helpers/vars';
import {useRoute} from 'vue-router';

const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
  },
});

const route = useRoute();

const limit = ref(LIMIT);

const store = useStore();
const isLoading = computed(() => store.state.feed.isLoading);
const feed = computed(() => store.state.feed.data);
const error = computed(() => store.state.feed.error);
const currentPage = computed(() => Number(route.query.page || '1'));
const baseUrl = computed(() => route.path);
const offset = computed(() => currentPage.value * limit.value - limit.value);

const fetchFeed = () => {
  const parsedUrl = parseUrl(props.apiUrl);
  const stringifiedParams = stringify({
    limit: limit.value,
    offset: offset.value,
    ...parsedUrl.query,
  });

  const apiUrlWidthParams = `${parsedUrl.url}?${stringifiedParams}`;

  store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWidthParams});
};

watch(currentPage, () => {
  fetchFeed();
});

onMounted(() => {
  fetchFeed();
});
</script>
