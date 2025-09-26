<template>
  <div class="movie-card">
    <!-- 영화 클릭 시 상세페이지 이동 -->
    <router-link :to="`/movie/${movie.id}`" class="movie-link">
      <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="포스터" />
      <h3>{{ movie.title }}</h3>
    </router-link>

    <p>{{ movie.overview || '줄거리가 없습니다.' }}</p>

    <!-- 찜 버튼 -->
    <button @click="$emit('toggle-like', movie)" class="favorite-btn">
      <span v-if="isLiked">❤️ 찜 취소</span>
      <span v-else>🤍 찜하기</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object,
    isLiked: Boolean,
  },
};
</script>

<style scoped>
.movie-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 6px;
  width: 240px;
}

/* 상세 페이지로 이동하는 링크 스타일 */
.movie-link {
  text-decoration: none;
  color: inherit;
}

.movie-link:hover h3 {
  text-decoration: underline;
}
</style>
