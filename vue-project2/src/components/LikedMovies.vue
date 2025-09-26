<template>
  <div class="app">
    <h1>❤️ 찜한 영화 목록</h1>

    <div v-if="likedMovies.length" class="movies">
      <MovieCard
        v-for="movie in likedMovies"
        :key="movie.id"
        :movie="movie"
        :isLiked="true"
        @toggle-like="toggleLike(movie)"
      />
    </div>
    <div v-else>
      <p>찜한 영화가 없습니다.</p>
    </div>

    <router-link to="/">← 메인으로</router-link>
  </div>
</template>

<script>
import { useMovieStore } from "@/stores/useMovieStore";
import MovieCard from "./MovieCard.vue";
import { storeToRefs } from "pinia";

export default {
  components: { MovieCard },
  setup() {
    const store = useMovieStore();
    const { liked } = storeToRefs(store);

    const toggleLike = (movie) => {
      store.toggleLike(movie);
    };

    return {
      likedMovies: liked,
      toggleLike,
    };
  },
};
</script>

<style scoped>
.app {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}
.movies {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}
</style>
