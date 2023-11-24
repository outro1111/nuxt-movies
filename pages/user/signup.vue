<template>
  <div class="login">
    <h2 class="sub_title">회원가입</h2>
    <form @submit.prevent="userRegister">
      <!-- autoComplete="off" -->
      <p>
        <input v-model="user.name" type="text" id="userName" placeholder="이름" ref="name" autoComplete="off" />
        <label for="userName"><span>이름</span></label>
      </p>
      <p>
        <input v-model="user.email" type="email" id="userEmail" placeholder="이메일" ref="email" autoComplete="off" />
        <label for="userEmail"><span>이메일</span></label>
      </p>
      <p>
        <input v-model="user.password" type="password" id="userPassword" placeholder="비밀번호" ref="password" autoComplete="off" />
        <label for="userPassword"><span>비밀번호</span></label>
      </p>
      <button class="btn primary" @click="submitSignup">회원가입</button>
    </form>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
const user = ref({
  name: null,
  email: null,
  password: null,
})
// const name = ref(null)
// const email = ref(null)
// const password = ref(null)

// const submitSignup = async () => {
//   try {
//     const response = await $fetch(`${apiURL}/api/auth/local/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         "username": "goo",
//         "email": "goo@naver.com",
//         "password": "111111"
//       })
//     });

//     // Handle success.
//     console.log('Well done!');
//     console.log('User profile', response.user);
//     console.log('User token', response.jwt);
//   } catch (error) {
//     // Handle error.
//     console.log('An error occurred:', error);
//   }
// }

const submitSignup = async () => {
  try {
    const res = await $fetch(`${apiURL}/api/auth/local/register`, {
      method: 'POST',
      body: {
        "username": user.value.name,
        "email": user.value.email,
        "password": user.value.password
      },
      // cache: 'no-cache',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // body: JSON.stringify({ //body 옵션에는 문자열이 들어가야 함 /JSON.stringify() 메서드를 이용해 문자열로 변환
      //   "username": user.value.name,
      //   "email": user.value.email,
      //   "password": user.value.password
      // })
    })
    console.log('User profile', res.user, 'User token', res.jwt)
  } catch (error) {
    console.log('An error occurred:', error);
  }
}

useHead({
  title: '회원가입 | MovieRevue',
  meta: [
    { name: 'description', content: 'Movies 회원가입' }
  ]
})
</script>