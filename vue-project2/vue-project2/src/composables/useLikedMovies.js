import { ref } from 'vue';

export function useLikedMovies() {
  const likedMovies = ref([]);

  const isLiked = (movie) => likedMovies.value.some(m => m.id === movie.id);

  const toggleLike = (movie) => {
    if (isLiked(movie)) {
      likedMovies.value = likedMovies.value.filter(m => m.id !== movie.id);
    } else {
      likedMovies.value.push(movie);
    }
  };

  return { likedMovies, isLiked, toggleLike };
}