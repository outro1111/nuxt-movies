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
        <span>{{ $i18n.locale }}</span>
        <NuxtLink :to="switchLocalePath('ko')">한국어</NuxtLink>
        <NuxtLink :to="switchLocalePath('en')">English</NuxtLink>
        <movieSearch />
        <darkMode />
        <template v-if="loginStore.isLogin">
          <div class="login_area login_is"><button class="btn_login" @click="userOpen = !userOpen"><em><span class="sr_only">로그인 정보</span></em><span class="arrow"></span></button>
            <transition name="loginLayerfade">
              <div class="user_layer" v-if="userOpen" :class="{ active: userOpen }">
                <div class="user_layer_in" @click.self="userOpen = !userOpen"></div>
                <p class="user_info">
                  <span class="name">{{ loginStore.userInfo.username }}</span>
                  <span class="email">{{ loginStore.userInfo.email }}</span>
                </p>
                <p class="btn_area">
                  <button @click="loginStore.logout" class="btn_logout"><span class="icon"></span>Logout</button>
                </p>
              </div>
            </transition>  
          </div>
        </template>
        <template v-else>
          <div class="login_area"><NuxtLink :to="localePath('/user/login')" class="btn_login"><em><span class="sr_only">로그인</span></em></NuxtLink></div>
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
const userOpen = ref(false) // 로그인 정보 toggle

const localePath = useLocalePath() // 다국어 적용 링크
const switchLocalePath = useSwitchLocalePath() // 다국어 스위치
</script>