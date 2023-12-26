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
        body: {
          "username": signupObj.name,
          "email": signupObj.email,
          "password": signupObj.password
        }
      })
      console.log('User profile', res.user, 'User token', res.jwt)
      isSignup.value = false // 회원가입 폼 비노출
    } catch(error) {
      alert('정확하지 않은 정보 혹은 이미 등록된 사용자입니다. \n다시 입력하여 가입해주세요.')
    }
  }

  const login = async (loginObj) => {
    try {
      const res = await $fetch(`${apiURL}/api/auth/local`, {
        method: 'POST',
        body: {
          "identifier": loginObj.email,
          "password": loginObj.password
        }
      })
      let token = res.jwt // 받아온 데이터 중 accessToken을 token에 할당
      let userId = res.user.id // 받아온 데이터 중 회원 id를 userId에 할당
      localStorage.setItem("access_token", token) // access_token 이라는 이름 설정 후 toke을 로컬스토리지에 저장
      localStorage.setItem("access_id", userId)
      getUserInfo()
      router.back() // 로그인 후 이전 컴퍼넌트로 이동
    } catch(error) {
      isLogin.value = false // 이메일, 패스워드가 틀릴 시 로그인 상태 false
      isLoginError.value = true // 이메일, 패스워드가 틀릴 시 오류 메시지 노출
      console.log('에러', error)
    }
  }

  const getUserInfo = async () => { // 로그인 혹은 새로고침 시 로컬스토로지 저장된 토근을 헤더에 포함시켜 유저 정보를 요청
    let token = localStorage.getItem("access_token") // 로컬스토리지 저장된 토큰 반환
    let userId = localStorage.getItem("access_id") // 로컬스토리지 저장된 id 반환
    let config = { // config header에 access-token이라는 이름으로 토큰을 포함
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // "access-token": token,
        Authorization: `Bearer ${token}`,
      }
    }
    if(token !== null && userId !== null) { // 토큰이 없거나 유저 id가 없을 시 (로그인 안된 상태)
      try {
        const res = await $fetch(`${apiURL}/api/users/${userId}`, config)
        userInfo.value =res // 유저정보 (이름, 이메일) userInfo에 할당
        isLogin.value = true // 로그인 상태 true
        isLoginError.value = false // 로그인 에러 상태  false
        console.log('User profile', 'User token', res.jwt, res, isLogin.value)
      } catch(error) {
        console.log('에러', error)
      }
    }
  }

  const logout = () => {
    console.log('logout', isLogin.value)
    localStorage.clear() // 로컬스토리지의 정보 (토근, 아이디) 삭제
    isLogin.value = false // 로그인 상태 false
    isLoginError.value = false // 로그인 에러 상태 false
    userInfo.value.username = null // userInfo 데이터 null로 설정
    userInfo.value.email = null // userInfo 데이터 null로 설정
    router.push('/') // 로그인 후 홈으로 이동
  }

  return { signup, login, logout, getUserInfo, isSignup, isLogin, isLoginError, userInfo }
})