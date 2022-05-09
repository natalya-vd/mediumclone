import {createRouter, createWebHistory} from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed';
import Register from '@/views/Register';
import Login from '@/views/Login';

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: GlobalFeed,
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: GlobalFeed,
  },
  {
    path: '/article/new',
    name: 'createArticle',
    component: GlobalFeed,
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: GlobalFeed,
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed,
  },
  {
    path: '/profile/:slug',
    name: 'userProfile',
    component: GlobalFeed,
  },
  {
    path: '/profile/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
