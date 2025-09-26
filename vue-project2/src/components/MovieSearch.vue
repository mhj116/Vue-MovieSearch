<template>
  <div class="app">
    <h1>🎬 영화 검색</h1>

    <!-- 찜한 영화 페이지로 이동 -->
    <router-link to="/liked">❤️ 찜한 영화 보기</router-link>

    <!-- 검색창 -->
    <SearchInput
      :query="movieStore.query"
      :keywords="keywords"
      @update:query="movieStore.query = $event"
      @search="searchMovies"
    />

    <!-- 검색 결과 -->
    <div v-if="movieStore.movies.length > 0" class="movies">
      <MovieCard
        v-for="movie in movieStore.movies"
        :key="movie.id"
        :movie="movie"
        :isLiked="movieStore.isLiked(movie)"
        @toggle-like="movieStore.toggleLike(movie)"
      />
    </div>
    <div v-else>
      <p>검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchInput from "./SearchInput.vue";
import MovieCard from "./MovieCard.vue";
import { useMovieStore } from "../stores/useMovieStore"; // ✅ Pinia store
import "@/assets/MovieStyle.css";

export default {
  components: { SearchInput, MovieCard },
  data() {
    return {
      keywords: [],
    };
  },
  mounted() {
    this.fetchPopularKeywords();
  },
  setup() {
    const movieStore = useMovieStore();

    const searchMovies = async () => {
      if (!movieStore.query) return;
      try {
        const apiKey = "694fbc523c68ac174d35e9271cbc40fc";
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieStore.query}&language=ko-KR`;
        const response = await axios.get(url);
        movieStore.setMovies(response.data.results);
      } catch (error) {
        console.error("영화 검색 실패:", error);
      }
    };

    return { movieStore, searchMovies };
  },
  methods: {
    async fetchPopularKeywords() {
      try {
        const apiKey = "694fbc523c68ac174d35e9271cbc40fc";
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;
        const response = await axios.get(url);
        this.keywords = response.data.results.map((movie) => movie.title);
      } catch (error) {
        console.error("인기 검색어 불러오기 실패:", error);
      }
    },
  },
};
</script>
