import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
export default function () {
  const loginStore = useLoginStore() // useLoginStore 함수 호출
  const token = ref(useCookie('accessToken')) // 쿠키에서 토큰 가져오기
  const user = ref(useCookie('accessUser')) // 쿠키에서 토큰 가져오기

  if (token.value) {
    loginStore.isLogin = true
    loginStore.userInfo = user.value
    console.log('토근있음', loginStore.isLogin)
  } else {
    loginStore.isLogin = false
    // loginStore.userInfo = null
    console.log('토근없음', loginStore.isLogin)
  }
}
