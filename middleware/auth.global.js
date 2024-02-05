import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
export default function () {
  const loginStore = useLoginStore() // useLoginStore 함수 호출
  const token = useCookie('accessToken', { readonly: true }) // 쿠키에서 토큰 가져오기
  const user = useCookie('accessUser', { readonly: true }) // 쿠키에서 유저 가져오기
  if (token.value && user.value) { // 토큰 및 유저 정보 있을 시
    loginStore.isLogin = true // 로그인 상태 true
    loginStore.userInfo = user.value // 토큰의 유저 정보를 피니아 유저 정보 상태에 담기
  } else {
    loginStore.isLogin = false // 로그인 상태 false
    loginStore.userInfo.username = null // 피니아 상태 유저 이름 null로 설정
    loginStore.userInfo.email = null // 피니아 상태 유저 이메일 null로 설정
    user.value = null // 쿠키의 유저정보 null로 설정
  }
}
