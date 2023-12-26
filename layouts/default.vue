<template>
  <div id="wrap">
    <header id="header">
      <h1><NuxtLink to="/"><img src="@/assets/images/logo.svg" alt="MovieRevue"></NuxtLink></h1>
      <nav>
        <ul>
          <li><NuxtLink to="/movies">LIST</NuxtLink></li>
          <li><NuxtLink to="/about">ABOUT</NuxtLink></li>
        </ul>
      </nav>
      <div class="util">
        <movieSearch />
        <template v-if="loginStore.isLogin">
          <div class="login_area">11<button class="btn_login"><span class="sr_only">로그인</span></button></div>
          {{ loginStore.userInfo.username }}
          {{ loginStore.userInfo.email }}
          <button @click="loginStore.logout" class="btnLogout">Logout</button> <!-- 로그아웃 버튼 -->
        </template>
        <template v-else>
          <div class="login_area">22<NuxtLink to="/user/login" class="btn_login"><span class="sr_only">로그인</span></NuxtLink></div>
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
</script>