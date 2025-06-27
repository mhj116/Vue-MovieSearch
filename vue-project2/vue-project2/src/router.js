import { createRouter, createWebHistory } from 'vue-router';
import MovieSearch from '@/components/MovieSearch.vue';
import LikedMovies from '@/components/LikedMovies.vue';

const routes = [
  {
    path: '/',
    name: 'Search',
    component: MovieSearch,
  },
  {
    path: '/liked',
    name: 'Liked',
    component: LikedMovies,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
