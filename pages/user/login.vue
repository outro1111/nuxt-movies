<template>
  <div class="login">
    <h2 class="sub_title">{{ $t('loginText') }}</h2>
    <form @submit.prevent="login({email, password})">
      <p>
        <input v-model="email" type="email" id="userEmail" :placeholder="$t('emailText')" />
        <label for="userEmail"><span>{{ $t('emailText') }}</span></label>
      </p>
      <p>
        <input v-model="password" type="password" id="userPassword" :placeholder="$t('passwordText')" autoComplete="off" />
        <label for="userPassword"><span>{{ $t('passwordText') }}</span></label>
      </p>
      <div v-if="loginStore.isLoginError" class="alert"> <!-- 이메일, 패스워드가 틀릴 시 오류 메시지 노출 -->
        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"></path></svg></span> <!-- 오류 아이콘 -->
        {{ $t('passwordError1') }} <br />
        {{ $t('passwordError2') }}
      </div>
      <button class="btn primary" @click="submit">{{ $t('loginText') }}</button> <!-- 스토어의 login 함수 실행 {email: email, password: password} -->
      <template v-if="loginStore.isSignup">
        <div class="btn_signup">{{ $t('signUpGuideText1') }} <NuxtLink :to="localePath('/user/signup')">{{ $t('signUpText') }}</NuxtLink> {{ $t('signUpGuideText2') }}</div>
        <!-- <div class="btn_resetpassword">비밀번호를 잊으셨나요? <NuxtLink to="/user/resetPassword">비밀번호 재설정</NuxtLink>을 해주세요.</div>
        <a class="btn primary" href="http://127.0.0.1:1337/api/connect/google">구글로 시작하기</a> -->
      </template>
    </form>

  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
const { t } = useI18n()
const loginStore = useLoginStore() // useLoginStore 함수 호출
const email = ref('') // 입력 된 이메일 데이터
const password = ref('') // 입력 된 패스워드 데이터
const login = () => { // 템플릿에서 loginStore에 접근 할 수 있도록 return
  loginStore.login({ email: email.value, password: password.value })
}

useHead({
  title: `${t('loginText')} | MovieRevue`,
  meta: [
    { name: 'description', content: `Movies ${t('loginText')}` }
  ]
})
</script>