<template>
  <div class="login">
    <template v-if="loginStore.isSignup"> <!-- loginStore - isSignup true 일 시 회원가입 폼 노출 -->
      <h2 class="sub_title">{{ $t('signUpText') }}</h2>
      <form @submit.prevent="submitSignup({name, email, password})">
        <p :class="{ invalid : invalidName }">
          <input v-model="name" type="text" id="userName" :placeholder="$t('nameText')" ref="nameInput" @blur="validateName" />
          <label for="userName"><span>{{ $t('nameText') }}</span></label>
        </p>
        <p v-if="invalidName" class="validate_info"> <!-- 정규식 이름 입력 없을 시 노출  -->
          {{ $t('nameInvalid') }}
        </p>
        <p :class="{ invalid : invalidEmail }">
          <input v-model="email" type="email" id="userEmail" placeholder="$t('emailText')" ref="emailInput" @blur="validateEmail" />
          <label for="userEmail"><span>{{ $t('emailText') }}</span></label>
        </p>
        <p v-if="invalidEmail" class="validate_info"> <!-- 정규식 이메일 조건 미달 시 노출  -->
          {{ $t('emailInvalid') }}
        </p>
        <p :class="{ invalid : invalidPassword }">
          <input v-model="password" type="password" id="userPassword" placeholder="$t('passwordText')" ref="passwordInput" @blur="validatePassword" autoComplete="off" />
          <label for="userPassword"><span>{{ $t('passwordText') }}</span></label>
        </p>
        <p v-if="invalidPassword" class="validate_info"> <!-- 정규식 패스워드 조건 미달 시 노출  -->
          {{ $t('passwordInvalid') }}
        </p>
        <button class="btn primary" @click="submit" :disabled="disableButton">{{ $t('signUpText') }}</button>
      </form>
    </template>
    <template v-else> <!-- loginStore - isSignup false, 회원가입 완료 일 시 노출 -->
      <div class="success">
        <p><strong class="name">{{ loginStore.userInfo.username }}{{ $t('signUpWelcome1') }}</strong> {{ $t('signUpWelcome2') }} <span>{{ $t('signUpWelcome3') }}</span></p>
        <button class="btn primary" @click="$router.push({ path: localePath('/user/login') })">{{ $t('btnGotoLogin') }}</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
const loginStore = useLoginStore() // useLoginStore 함수 호출
const { t } = useI18n()
const localePath = useLocalePath() // 다국어 적용 링크
const name = ref('') // 입력 된 이름 데이터
const email = ref('') // 입력 된 이메일 데이터
const password = ref('') // 입력 된 패스워드 데이터
const invalidName = ref(false) // 이름 체크 - 입력 된 이름 없을 시 true
const invalidEmail = ref(false) // 이메일 체크 - 이메일 조건 미달 시 true
const invalidPassword = ref(false) // 패스워드 체크 - 패스워드 조건 미달 시 true
const nameInput = ref(null) // 포커스 될 이름 input
const emailInput = ref(null) // 포커스 될 이메일 input
const passwordInput = ref(null) // 포커스 될 비밀번호 input
const disableButton = ref(true) // 회원가입 disabled 상태

const submitSignup = async (signupObj) => {
  if(!name.value) { // 이름이 없을 시
    invalidName.value = true // 이름 체크 true
    nameInput.value.focus() // 이름 입력 input으로 포커스 이동
  } else if (!email.value) { // 이메일 없을 시
    invalidEmail.value = true // 이메일 체크 true
    emailInput.value.focus() // 이메일 입력 input으로 포커스 이동
  } else if (!password.value) { // 패스워드 없을 시
    invalidPassword.value = true // 패스워드 체크 true
    passwordInput.value.focus() // 패스워드 입력 input으로 포커스 이동
  }
  loginStore.signup(signupObj) // loginStore - signup 함수 실행 - name, email, password 파라미터로 전달
}

const validateName = () => { // 정규식 - 이름 입력 여부 체크
  invalidName.value = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9]{2,12}$/.test(name.value) ? false: true
  updateButtonState()
}
const validateEmail = () => { // 정규식 - 이메일 체크
  invalidEmail.value = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/.test(email.value) ? false: true
  updateButtonState()
}
const validatePassword = () => { // 정규식 - 숫자 문자 포함 6~12자리 체크
  invalidPassword.value= /^[A-Za-z0-9!@#$%^*+=-]{6,12}$/.test(password.value) ? false: true
  updateButtonState()
}

const updateButtonState = () => { // 정규식에 맞지 않아 true 일 시 회원가입 버튼 disabled로 설정
  disableButton.value = invalidName.value || invalidEmail.value || invalidPassword.value;
}

watch(name, validateName) // watch - name 데이터 변화 시 validateName (methods) 함수 매칭
watch(email, validateEmail) // watch - email 데이터 변화 시 validateEmail (methods) 함수 매칭
watch(password, validatePassword) // watch - password 데이터 변화 시 validatePassword (methods) 함수 

onMounted(() => {
  disableButton.value = true // 초기 회원가입 버튼 disabled로 설정
})

useHead({
  title: `${t('signUpText')} | MovieRevue`,
  meta: [
    { name: 'description', content: `Movies ${t('signUpText')}` }
  ]
})
</script>