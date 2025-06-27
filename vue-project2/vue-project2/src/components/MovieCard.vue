<template>
    <div class="movie-card">
      <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="포스터" />
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.overview || '줄거리가 없습니다.' }}</p>
      <button @click="$emit('toggle-like', movie)" class="like-button">
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
  .like-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 32px;
  }
  </style>  