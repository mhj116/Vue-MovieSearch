import { defineStore } from "pinia";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    query: "",
    movies: [],
    liked: [],
  }),
  actions: {
    setMovies(movies) {
      this.movies = movies;
    },
    toggleLike(movie) {
      const index = this.liked.findIndex((m) => m.id === movie.id);
      if (index > -1) {
        this.liked.splice(index, 1);
      } else {
        this.liked.push(movie);
      }
    },
    isLiked(movie) {
      return this.liked.some((m) => m.id === movie.id);
    },
    // ✅ 검색어 + 영화 목록만 초기화
    resetStore() {
      this.query = "";
      this.movies = [];
    },
  },
});
