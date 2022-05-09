<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed :api-url="apiURL" />
        </div>
        <div class="col-md-3">POPULAR TAGS</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Feed from '@/components/Feed';

const apiURL = ref('/articles');
</script>
