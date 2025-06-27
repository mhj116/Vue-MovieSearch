<template>
  <div class="search-box">
    <input
      v-model="internalQuery"
      @keyup.enter="onSearch"
      @focus="showPopular = true"
      placeholder="영화를 검색하세요"
    />
    <PopularKeywords
      v-if="showPopular"
      :keywords="keywords"
      @select="onSelectKeyword"
    />
  </div>
</template>

<script>
import PopularKeywords from './PopularKeywords.vue';

export default {
  components: { PopularKeywords },
  props: {
    query: String,
    keywords: { type: Array, default: () => [] },
  },
  emits: ['update:query', 'search'],
  data() {
    return {
      internalQuery: this.query,
      showPopular: false,
    };
  },
  watch: {
    query(newVal) {
      this.internalQuery = newVal;
    },
    internalQuery(newVal) {
      this.$emit('update:query', newVal);
    },
  },
  methods: {
    onSearch() {
      this.showPopular = false;
      this.$emit('search');
    },
    onSelectKeyword(keyword) {
      this.internalQuery = keyword;
      this.$nextTick(() => this.onSearch());
    },
  },
};
</script>

<style scoped>
.search-box {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 8px;
}
</style>
