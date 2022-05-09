import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home';
import Register from '@/views/Register';
import Login from '@/views/Login';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
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
    path: '/create-article',
    name: 'createArticle',
    component: Home,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Home,
  },
  {
    path: '/user-profile',
    name: 'userProfile',
    component: Home,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
