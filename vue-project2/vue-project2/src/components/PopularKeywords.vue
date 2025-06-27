<template>
  <div class="popular-keywords" v-if="keywords.length">
    <h3>🔥 인기 검색어</h3>
    <ul>
      <li v-for="keyword in keywords" :key="keyword" @click="selectKeyword(keyword)">
        {{ keyword }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    keywords: { type: Array, default: () => [] },
  },
  methods: {
    selectKeyword(keyword) {
      this.$emit('select', keyword);
    },
  },
};
</script>

<style scoped>
.popular-keywords {
  margin-top: 10px;
  text-align: left;
}
.popular-keywords ul {
  list-style: none;
  padding: 0;
}
.popular-keywords li {
  cursor: pointer;
  padding: 5px 0;
  color: #3f51b5;
}
.popular-keywords li:hover {
  text-decoration: underline;
}
</style>