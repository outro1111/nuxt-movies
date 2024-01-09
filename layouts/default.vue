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
          <div class="login_area login_is"><button class="btn_login" @click="userOpen = !userOpen"><span class="sr_only">로그인 정보</span><span class="arrow"></span></button>
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
const userOpen = ref(false) // 로그인 정보 toggle
</script>