<template>
  <div class="app">
    <!-- 고정 홈 + 다크모드 버튼 -->
    <header class="app-header">
      <!-- @click 추가해서 상태 초기화 -->
      <router-link to="/" class="home-btn" @click.native="resetApp">
        🏠 홈
      </router-link>
      <button class="theme-toggle" @click="toggleTheme">
        {{ isDark ? "☀️ 라이트 모드" : "🌙 다크 모드" }}
      </button>
    </header>

    <!-- 라우터 페이지 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isDark: false, // 현재 모드 상태
    };
  },
  mounted() {
    // 저장된 모드 불러오기
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      this.isDark = true;
      document.body.classList.add("dark-mode");
    }
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    },
    // 🔥 홈 버튼 누를 때 상태 초기화
    resetApp() {
      // Pinia/Vuex를 쓴다면 스토어 초기화
      localStorage.removeItem("searchQuery");
      localStorage.removeItem("movies");

      // 새로고침으로 강제 초기화 (간단하고 확실)
      this.$router.push("/").then(() => {
        window.location.reload();
      });
    },
  },
};
</script>
