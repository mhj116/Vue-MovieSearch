import axios from 'axios';
import { ref } from 'vue';

export function useMovieApi() {
  const movies = ref([]);
  const keywords = ref([]);

  const fetchMovies = async (query) => {
    if (!query) return;
    try {
      const apiKey = '694fbc523c68ac174d35e9271cbc40fc';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=ko-KR`;
      const response = await axios.get(url);
      movies.value = response.data.results;
    } catch (error) {
      console.error('영화 검색 실패:', error);
    }
  };

  const fetchPopularKeywords = async () => {
    try {
      const apiKey = '694fbc523c68ac174d35e9271cbc40fc';
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;
      const response = await axios.get(url);
      keywords.value = response.data.results.map(m => m.title);
    } catch (error) {
      console.error('인기 검색어 불러오기 실패:', error);
    }
  };

  return { movies, keywords, fetchMovies, fetchPopularKeywords };
}
