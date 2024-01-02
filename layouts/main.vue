<template>
  <div id="wrap" class="main">
    <header id="header">
      <h1><NuxtLink to="/"><img src="@/assets/images/logo_main.svg" alt="MovieRevue"></NuxtLink></h1>
      <nav>
        <ul>
          <li><NuxtLink to="/movies">LIST</NuxtLink></li>
          <li><NuxtLink to="/about">ABOUT</NuxtLink></li>
        </ul>
      </nav>
      <div class="util">
        <movieSearch />
        <template v-if="loginStore.isLogin">
          <div class="login_area"><button class="btn_login"><span class="sr_only">로그인 정보</span></button></div>
          {{ username }}
          {{ email }}
          <button @click="loginStore.logout" class="btnLogout">Logout</button> <!-- 로그아웃 버튼 -->
        </template>
        <template v-else>
          <div class="login_area"><NuxtLink to="/user/login" class="btn_login"><span class="sr_only">로그인</span></NuxtLink></div>
        </template>
      </div>
    </header>

    <div id="content">
      <slot /> <!-- output the page content -->
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
const loginStore = useLoginStore() // useLoginStore 함수 호출
const username = ref(loginStore.userInfo.username)
const email = ref(loginStore.userInfo.email)
</script>