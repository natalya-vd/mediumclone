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
      PAGINATION
    </div>
  </div>
</template>

<script setup>
import {onMounted, computed} from 'vue';

import {useStore} from 'vuex';
import {actionTypes} from '@/store/modules/feed';

const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
  },
});

const store = useStore();
const isLoading = computed(() => store.state.feed.isLoading);
const feed = computed(() => store.state.feed.data);
const error = computed(() => store.state.feed.error);

onMounted(() => {
  store.dispatch(actionTypes.getFeed, {apiUrl: props.apiUrl});
});

console.log(props);
</script>
