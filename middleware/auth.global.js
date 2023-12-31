import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
export default function () {
  const loginStore = useLoginStore() // useLoginStore 함수 호출
  const token = useCookie('accessToken', { readonly: true }) // 쿠키에서 토큰 가져오기
  const user = useCookie('accessUser', { readonly: true }) // 쿠키에서 유저 가져오기
  if (token.value && user.value) {
    loginStore.isLogin = true
    loginStore.userInfo = user.value
    console.log('쿠키있음', loginStore.isLogin, loginStore.userInfo)
  } else {
    loginStore.isLogin = false
    loginStore.userInfo.username = null
    loginStore.userInfo.email = null
    user.value = null
    console.log('쿠키없음', loginStore.isLogin, loginStore.userInfo)
  }
}
