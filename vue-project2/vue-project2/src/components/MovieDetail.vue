<template>
  <div class="movie-detail">
    <div v-if="loading" class="loading">불러오는 중...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="movie" class="detail-card">
      <img
        class="poster"
        :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : '/no-image.png'"
        :alt="movie.title"
      />
      <div class="movie-info">
        <h1 class="title">{{ movie.title }}</h1>
        <p class="release-date">개봉일: {{ movie.release_date }}</p>
        <p class="rating">평점: ⭐ {{ movie.vote_average }}</p>
        <p class="overview">{{ movie.overview }}</p>

        <!-- 🔹 뒤로가기 / 홈 버튼 -->
        <div class="nav-buttons">
          <button @click="$router.back()">⬅️ 뒤로가기</button>
          <button @click="$router.push('/')">🏠 홈으로</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieDetail",
  data() {
    return {
      movie: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    const movieId = this.$route.params.id;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=694fbc523c68ac174d35e9271cbc40fc&language=ko-KR`
      );
      this.movie = response.data;
    } catch (err) {
      this.error = "영화 정보를 불러오는 데 실패했습니다.";
    } finally {
      this.loading = false;
    }
  },
};
</script>
