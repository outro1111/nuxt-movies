<template>
  <template v-if="loginStore.isLogin">
    <div class="login_area login_is">
      <button class="btn_login" @click="userOpen = !userOpen"><em><span class="sr_only">{{ $t('btnLoginInfo') }}</span></em><span class="arrow"></span></button>
      <transition name="loginLayerfade">
        <div class="user_layer" v-if="userOpen" :class="{ active: userOpen }">
          <div class="user_layer_in" @click.self="userOpen = !userOpen"></div>
          <p class="user_info">
            <span class="name">{{ loginStore.userInfo.username }}</span>
            <span class="email">{{ loginStore.userInfo.email }}</span>
          </p>
          <p class="btn_area">
            <button @click="[loginStore.logout(), logoutAfter()]" class="btn_logout"><span class="icon"></span>Logout</button>
          </p>
        </div>
      </transition>  
    </div>
  </template>
  <template v-else>
    <div class="login_area">
      <NuxtLink :to="localePath('/user/login')" class="btn_login">
        <em><span class="sr_only">{{ $t('btnLogin') }}</span></em>
      </NuxtLink>
    </div>
  </template>
</template>

<script setup>
import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
const localePath = useLocalePath() // 다국어 적용 링크
const { t } = useI18n()
const router = useRouter()
const loginStore = useLoginStore() // useLoginStore 함수 호출
const userOpen = ref(false) // 로그인 정보 toggle

const logoutAfter = () => { // 로그아웃 후 얼랏 및 메인 페이지로 이동
  alert(t('logoutGuide'))
  router.push({ path: localePath('/') }) // 로그인 후 홈으로 이동
}
</script>