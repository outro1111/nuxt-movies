export default function () {
  const loginStore = useLoginStore() // useLoginStore 함수 호출
  if (process.client) {
    const token = localStorage.getItem('access_token');
    if (token) {
      loginStore.getUserInfo()
    }
  }
}
