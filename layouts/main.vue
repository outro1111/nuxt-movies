<template>
  <div id="wrap" class="main">
    <header id="header">
      <h1>
        <NuxtLink :to="localePath('/')">
          <img src="@/assets/images/logo_main.svg" alt="MovieRevue">
        </NuxtLink>
      </h1>
      <nav>
        <ul>
          <li><NuxtLink :to="localePath('/movies')">LIST</NuxtLink></li>
          <li><NuxtLink :to="localePath('/about')">ABOUT</NuxtLink></li>
        </ul>
      </nav>
      <div class="util">
        <movieSearch /> <!-- 검색 버튼 -->
        <darkMode /> <!-- 다크 모드 버튼 -->
        <langMenu />  <!-- 언어 설정 버튼 -->
        <LoginMenu />  <!-- 로그인 버튼 -->
      </div>
    </header>

    <div id="content">
      <slot /> <!-- output the page content -->
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath() // 다국어 적용 링크
</script>