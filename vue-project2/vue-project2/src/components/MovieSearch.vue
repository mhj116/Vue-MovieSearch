<template>
  <div class="app">
    <h1>🎬 영화 검색</h1>

    <router-link to="/liked">❤️ 찜한 영화 보기</router-link>

    <SearchInput
      :query="query"
      :keywords="keywords"
      @update:query="query = $event"
      @search="searchMovies"
    />

    <div v-if="movies.length > 0" class="movies">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :isLiked="isLiked(movie)"
        @toggle-like="toggleLike(movie)"
      />
    </div>
    <div v-else>
      <p>검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SearchInput from './SearchInput.vue';
import MovieCard from './MovieCard.vue';
import '@/assets/MovieStyle.css';

export default {
  components: { SearchInput, MovieCard },
  data() {
    return {
      query: '',
      movies: [],
      keywords: [],
      likedMovies: JSON.parse(localStorage.getItem('likedMovies') || '[]'),
    };
  },
  mounted() {
    this.fetchPopularKeywords();
  },
  methods: {
    async searchMovies() {
      if (!this.query) return;
      try {
        const apiKey = '694fbc523c68ac174d35e9271cbc40fc';
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.query}&language=ko-KR`;
        const response = await axios.get(url);
        this.movies = response.data.results;
      } catch (error) {
        console.error('영화 검색 실패:', error);
      }
    },
    async fetchPopularKeywords() {
      try {
        const apiKey = '694fbc523c68ac174d35e9271cbc40fc';
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;
        const response = await axios.get(url);
        this.keywords = response.data.results.map(movie => movie.title);
      } catch (error) {
        console.error('인기 검색어 불러오기 실패:', error);
      }
    },
    isLiked(movie) {
      return this.likedMovies.some(liked => liked.id === movie.id);
    },
    toggleLike(movie) {
      if (this.isLiked(movie)) {
        this.likedMovies = this.likedMovies.filter(liked => liked.id !== movie.id);
      } else {
        this.likedMovies.push(movie);
      }
      localStorage.setItem('likedMovies', JSON.stringify(this.likedMovies));
    },
  },
};
</script>