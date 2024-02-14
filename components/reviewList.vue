<template>
  <template v-if="isLogin">
    <textarea class="review_input" rows="5" v-model.trim="reviewInput" ref="textareaRef" @input="autoHeight(this)" :placeholder="$t('reviewGuide6')"></textarea>
  </template>
  <template v-else>
    <NuxtLink :to="localePath('/user/login')" class="review_login" @click=""><em>{{ $t('loginText') }}</em> {{ $t('reviewLogin') }}</NuxtLink>
  </template>
  <div class="review_write">
    <div class="star_rating">
      <span class="number">{{ reviewRating }}</span>
      <NuxtRating @rating-selected="logRating" :key="ratingKey" :read-only="false" :ratingValue="reviewRating" :ratingCount="10" activeColor="red" ratingSize="clamp(18px, 2.8vw, 26px)" />
    </div>
    <template v-if="isEdit">
      <button class="btn primary" @click="fnReviewPut">{{ $t('btnReviewEdit') }}</button>
    </template>
    <template v-else>
      <button class="btn primary" @click="fnReviewPost">{{ $t('btnReviewPost') }}</button>
    </template>
  </div>
  <div class="review_list">
    <template v-if="reviews.length"> 
      <ul>
        <li v-for="review in reviews" :key="review.id">
          <p class="rating">{{ review.attributes.rating }}</p>
          <p class="name">{{ review.attributes.user.data.attributes.username }}</p>
          <p class="review">{{ review.attributes.content }}</p>
          <p class="review_date">{{ formatDateHour(review.attributes.publishedAt) }}</p>
          <div class="btn_right" v-if="review.attributes.user.data.id === currentUser">
            <button class="btn sub" @click="fnGetView(review.id)">{{ $t('btnEdit') }}</button>
            <button class="btn sub" @click="fnDelete(review.id)">{{ $t('btnDelete') }}</button>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <p class="nodata">{{ $t('reviewGuide1') }}</p>
    </template>
  </div>
</template>

<script setup>
import qs from "qs"

const { t } = useI18n()
const { formatDateHour } = useFormatDate() // 리뷰 작성 날짜시간 composables
const { locale } = useI18n() // 다국어 Cookie Value
// const {id} = useRoute().params // 라우터 params의 id
const movieId = ref(0) // 리뷰 해당 movie의 id 초기화
const koId = inject('koId') // [id].vue에서 provider로 전달된 id
const enId = inject('enId') // [id].vue에서 provider로 전달된 enId
if (locale.value === 'en' && enId) { // 다국어가 영문이라면
  movieId.value = enId // 불러올 리뷰의 해당 movie의 id값을 국문으로 설정
} else {
  movieId.value = koId // 불러올 리뷰의 해당 movie의 id값을 국문으로 설정
}
const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
const reviewInput = ref('') // 리뷰 input 값
const reviewRating = ref(1) // 리뷰 점수 값 기본 1점
const reviewId = ref(0) // 리뷰 점수 값 기본 1점
const ratingValue = ref(reviewRating.value) // star rating 리뷰 점수 값
const ratingKey = ref(0) // 수정 star rating 새로고침 컴포넌트 키 값
const isEdit = ref(false) // 수정 star rating 새로고침 컴포넌트 키 값
const query = qs.stringify( // 리뷰 데이터 패치 쿼리
  {
    populate: ['reviews', 'user'],
    filters: {
      movie: {
        id: {
          $eq: movieId.value // 불러올 리뷰의 해당 movie의 id
        }
      }
    },
    sort: 'publishedAt:desc'
  },
  {
    encodeValuesOnly: true,
  }
)

// 리뷰 데이터 불러오기
const { data: reviews, pending, error, refresh } = await useAsyncData('reviews', () => {
  return $fetch(`${apiURL}/api/reviews?${query}`)
}, {
  transform: (_reviews) => _reviews.data,
})

// 리뷰 평균 점수 값 계산
let reviewSum = 0
let reviewCount = 0
for(let index in reviews._rawValue) {
  reviewSum += reviews._rawValue[index].attributes.rating
  reviewCount++
}
const average = ref(0)
onMounted(() => {
  average.value = reviewSum / reviewCount
  // console.log('The average rating value is:', average.value)
})
defineExpose({ // defineExpose를 사용하여 average를 부모 컴포넌트에 노출
  average
})

// 리뷰 작성
const fnReviewPost = async () => {
  if(reviewInput.value !== '') {
    try {
      const response = await $fetch(`${apiURL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}` // 토큰을 headers에 담아 전달
        },
        body: JSON.stringify({
          "data": {
            "movie": movieId.value,
            "rating": reviewRating.value,
            "content": reviewInput.value,
            "user": currentUser.value
          }
        })
      })
      if (!response.ok) { // 응답 상태가 성공적이지 않을 때
        if (response.error === 'already review') { // strapi controllers의 error 메시지 비교
          alert(t('reviewGuide2')) // 중복체크 에러 메시지가 동일 할때 alert
        }
      }
      reviewInput.value = '' // 리뷰 작성 시 textarea 초기화
      reviewRating.value = 1 // 리뷰 작성 시 rating 값 초기화
      ratingKey.value += 1 // star rating 키 값으로 새로고침
      refresh()  // 리뷰 작성 후 리뷰 영역 새로고침하여 리뷰 데이터 다시 불러오기
    } catch (error) {
      alert(error); // 에러 메시지를 alert로 출력
    }
  } else {
    alert(t('reviewGuide3'))
  }
}

// 리뷰 삭제
const fnDelete = async (id) => {
  if(confirm(t('reviewGuide4'))) { 
    await $fetch(`${apiURL}/api/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userToken}` // 토큰을 headers에 담아 전달
      }
    })
  }
  refresh()  // 리뷰 작성 후 리뷰 영역 새로고침하여 리뷰 데이터 다시 불러오기
}

// 리뷰 수정 데이터 가져오기 - 해당 리뷰
const fnGetView = async (n) => {
  const { data: review, error } = await useFetch(`${apiURL}/api/reviews/${n}`, {
    transform: (_review) => _review.data,
  })
  reviewId.value = n
  reviewInput.value = review.value.attributes.content // 해당리뷰 글
  reviewRating.value = review.value.attributes.rating //해달 리뷰 점수
  ratingValue.value = reviewRating.value // 해당 리뷰 점수 star rating에 할당
  ratingKey.value += 1 // star rating 키 값으로 새로고침
  isEdit.value = true // 버튼 리뷰 수정으로 변경
  textareaRef.value.focus() // textarea에 포커스
  // console.log(`${apiURL}/api/reviews/${reviewId.value}`)
}

// 리뷰 수정
const fnReviewPut = async () => {
  await $fetch(`${apiURL}/api/reviews/${reviewId.value}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${userToken}` // 토큰을 headers에 담아 전달
    },
    body: JSON.stringify({
      "data": {
        "movie": movieId.value,
        "rating": reviewRating.value,
        "content": reviewInput.value
      }
    })
  })
  reviewInput.value = '' // 리뷰 작성 시 textarea 초기화
  reviewRating.value = 1 // 리뷰 작성 시 rating 값 초기화
  ratingKey.value += 1 // star rating 키 값으로 새로고침
  isEdit.value = false // 버튼 리뷰 작성으로 변경
  refresh()  // 리뷰 작성 후 리뷰 영역 새로고침하여 리뷰 데이터 다시 불러오기
  alert(t('reviewGuide5'))
}

// star rating 점수 적용
function logRating(event) { // 리뷰 점수 클릭 시 노출
  reviewRating.value = event
}

// 리뷰 글쓰기 textarea 여러 줄
const textareaRef = ref(null)
const autoHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = '75px'
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight + 5}px`
  }
}
watchEffect(autoHeight)

// 로그인 시 review 폼 및 본인이 쓴 글 수정 삭제 버튼 노출
import { useLoginStore } from '@/stores/login' // login.js 에서 useLoginStore 함수 import
const loginStore = useLoginStore() // useLoginStore 함수 호출
const isLogin = loginStore.isLogin // 로그인 상태
const userToken = loginStore.accessToken // 토근 정보 가져오기
const currentUser = ref(null) // 로그인 한 유저 id값 초기화
const getUser = async () => { // 유저 id 가져오기 함수
  const response = await $fetch(`${apiURL}/api/users/me`, { // 로그인한 유저 정보 가져오기
    headers: {
      'Authorization': `Bearer ${userToken}` // 토큰을 headers에 담아 전달
    }
  });
  currentUser.value = response.id // 응답받은 유저 id를 currentUser에 할당
}
if(isLogin === true) { // 로그인 한 상태일 때만 유저 id 가져오기
  getUser()
}
</script>