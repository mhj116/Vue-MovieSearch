// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import MovieSearch from "@/components/MovieSearch.vue";
import LikedMovies from "@/components/LikedMovies.vue";
import { useMovieStore } from "@/stores/useMovieStore";

const MovieDetail = () => import("@/components/MovieDetail.vue");

const routes = [
  { path: "/", name: "Search", component: MovieSearch },
  { path: "/liked", name: "Liked", component: LikedMovies },
  { path: "/movie/:id", name: "MovieDetail", component: MovieDetail, props: true },
  { path: "/:pathMatch(.*)*", redirect: { name: "Search" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

// ✅ 홈(/) 들어갈 때 store 초기화 (찜 목록은 유지)
router.beforeEach((to, from, next) => {
  if (to.name === "Search") {
    const store = useMovieStore();
    store.resetStore();
  }
  next();
});

export default router;
