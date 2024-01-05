import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginStore', () => {
  const router = useRouter()
  const runtimeConfig = useRuntimeConfig()
  const apiURL = runtimeConfig.public.apiURL
  const userInfo = ref({
    username: null,
    email: null
  })
  const isSignup = ref(true)
  const isLogin = ref(false)
  const isLoginError = ref(false)

  const signup = async (signupObj) => { // 회원가입 - 입력된 이름, 이메일, 패스워드 파라미터로 받아옴
    try {
      const res = await $fetch(`${apiURL}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "username": signupObj.name,
          "email": signupObj.email,
          "password": signupObj.password
        })
      })
      console.log('User profile', res.user, 'User token', res.jwt)
      isSignup.value = false // 회원가입 폼 비노출
    } catch(error) {
      alert('정확하지 않은 정보 혹은 이미 등록된 사용자입니다. \n다시 입력하여 가입해주세요.')
    }
  }

  // const expires = 60 * 60 * 24 * 7 // 7일간 유지 
  // const accessToken = ref(useCookie('accessToken', { maxAge: expires }))
  // const accessUser = ref(useCookie('accessUser', { maxAge: expires }))
  const accessToken = ref(useCookie('accessToken'))
  const accessUser = ref(useCookie('accessUser'))
  const login = async (loginObj) => {
    try {
      const res = await $fetch(`${apiURL}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "identifier": loginObj.email,
          "password": loginObj.password
        })
      })
      const tokenJwt = ref(res.jwt) // 받아온 데이터 중 accessToken을 token에 할당
      const userInfo = ref(res.user) // 받아온 데이터 중 회원 정보를 userId에 할당
      
      accessToken.value = tokenJwt.value
      accessUser.value = userInfo.value
      // localStorage.setItem("access_token", token) // access_token 이라는 이름 설정 후 toke을 로컬스토리지에 저장
      // localStorage.setItem("access_id", userId)
      userInfo.value = res.user // 유저정보 (이름, 이메일) userInfo에 할당
      isLogin.value = true // 로그인 상태 true
      isLoginError.value = false // 로그인 에러 상태  false
      router.back() // 로그인 후 이전 컴퍼넌트로 이동
    } catch(error) {
      isLogin.value = false // 이메일, 패스워드가 틀릴 시 로그인 상태 false
      isLoginError.value = true // 이메일, 패스워드가 틀릴 시 오류 메시지 노출
      console.log('에러', error)
    }
  }

  const logout = () => {
    accessToken.value = null // 로컬스토리지의 정보 (토근, 아이디) 삭제
    accessUser.value = null // 로컬스토리지의 정보 (토근, 아이디) 삭제
    isLogin.value = false // 로그인 상태 false
    isLoginError.value = false // 로그인 에러 상태 false
    userInfo.value.username = null
    userInfo.value.email = null
    router.push('/') // 로그인 후 홈으로 이동
    console.log('logout', isLogin.value, userInfo.value)
  }

  return { signup, login, logout, isSignup, isLogin, isLoginError, userInfo, accessToken }
})