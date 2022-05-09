<template>
  <div>
    <topbar />

    <router-view />
  </div>
</template>

<script setup>
import {useStore} from 'vuex';
import {onMounted} from 'vue';
import Topbar from '@/components/Topbar';
import {actionTypes} from '@/store/modules/auth';

const store = useStore();

onMounted(() => store.dispatch(actionTypes.getCurrentUser));
</script>

<style></style>
