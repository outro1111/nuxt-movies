<template>
  <textarea class="review_input" rows="5" v-model.trim="reviewInput" ref="textareaRef" @input="autoHeight(this)" placeholder="감상평을 등록해주세요."></textarea>
  <div class="review_write">
    <div class="star_rating">
      <span class="number">{{ reviewRating }}</span>
      <NuxtRating @rating-selected="logRating" :key="ratingKey" :read-only="false" :ratingValue="reviewRating" :ratingCount="10" activeColor="red" ratingSize="min(max(18px, 2.8em), 26px)" />
    </div>
    <template v-if="isEdit">
      <button class="btn primary" @click="fnReviewPut">리뷰수정</button>
    </template>
    <template v-else>
      <button class="btn primary" @click="fnReviewPost">리뷰작성</button>
    </template>
  </div>
  <div class="review_list">
    <template v-if="reviews.length"> 
      <ul>
        <li v-for="review in reviews" :key="review.id">
          <p class="rating">{{ review.attributes.rating }}</p>
          <p class="review">{{ review.attributes.content }}</p>
          <p class="review_date">{{ formatDateHour(review.attributes.publishedAt) }}</p>
          <div class="btn_right">
            <button class="btn sub" @click="fnGetView(review.id)">수정</button>
            <button class="btn sub" @click="fnDelete(review.id)">삭제</button>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <p class="nodata">첫번째 리뷰를 남겨주세요.</p>
    </template>
  </div>
</template>

<script setup>
import qs from "qs"

const { formatDateHour } = useFormatDate()
const {id} = useRoute().params // 라우터 params의 id
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
    populate: ['reviews'],
    filters: {
      movie: {
        id: {
          $eq: id
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
    await $fetch(`${apiURL}/api/reviews`, {
      method: 'POST',
      body: {
        "data": {
          "movie": id,
          "rating": reviewRating.value,
          "content": reviewInput.value
        }
      }
    })
    reviewInput.value = '' // 리뷰 작성 시 textarea 초기화
    reviewRating.value = 1 // 리뷰 작성 시 rating 값 초기화
    ratingKey.value += 1 // star rating 키 값으로 새로고침
    refresh()  // 리뷰 작성 후 리뷰 영역 새로고침
  } else {
    alert("감상평을 등록해주세요.")
  }
}

// 리뷰 삭제
const fnDelete = async (id) => {
  if(confirm('삭제하시겠습니까?')) { 
    await $fetch(`${apiURL}/api/reviews/${id}`, {
      method: 'DELETE',
    })
  }
  refresh()  // 리뷰 작성 후 리뷰 영역 새로고침
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
  // console.log(`${apiURL}/api/reviews/${reviewId.value}`)
}

// 리뷰 수정
const fnReviewPut = async () => {
  await $fetch(`${apiURL}/api/reviews/${reviewId.value}`, {
    method: 'PUT',
    body: {
      "data": {
        "movie": id,
        "rating": reviewRating.value,
        "content": reviewInput.value
      }
    }
  })
  reviewInput.value = '' // 리뷰 작성 시 textarea 초기화
  reviewRating.value = 1 // 리뷰 작성 시 rating 값 초기화
  ratingKey.value += 1 // star rating 키 값으로 새로고침
  isEdit.value = false // 버튼 리뷰 작성으로 변경
  refresh()  // 리뷰 작성 후 리뷰 영역 새로고침
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
</script>