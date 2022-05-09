<template>
  <ul class="error-messages">
    <li v-for="error in errorMessages" :key="error">{{ error }}</li>
  </ul>
</template>

<script setup>
import {computed} from 'vue';

const props = defineProps({
  validationErrors: Object,
});

console.log(props.validationErrors);
// eslint-disable-next-line arrow-body-style
const errorMessages = computed(() => {
  return Object.keys(props.validationErrors).map((name) => {
    const messages = props.validationErrors[name].join(', ');

    return `${name} ${messages}`;
  });
});
</script>
