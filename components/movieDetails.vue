<template>
  <div class="detail_movie">
    <div class="detail_top">
      <div class="top_bg"><img :src="movie.attributes.image.data[1].attributes.url" alt=""></div>
      <div class="top_con">
        <h2 class="title">{{ movie.attributes.title }}</h2>
        <h2 class="titleOriginal">{{ movie.attributes.titleOriginal }}</h2>
        <p class="genre">{{ movie.attributes.genre }}</p>
        <p class="openingDate">{{ movie.attributes.openingDate }}</p>
      </div>
    </div>

    <div class="detail_con">
      <div class="description">
        <h2 class="detail_title">Storyline</h2>
        <p v-html="movie.attributes.description"></p>
      </div>
      <div class="poster">
        <img :src="movie.attributes.poster.data.attributes.formats.small.url" :alt="movie.attributes.poster.data.attributes.alternativeText">
      </div>

      <div class="cast">
        <h2 class="detail_title">Cast</h2>
        <ul>
          <li v-for="cast in movie.attributes.cast" :key="cast.id">
            <p class="name">{{ cast.name }}</p>
            <p class="role">{{ cast.role }}</p>
          </li>
        </ul>
      </div>

      <div class="photos">
        <h2 class="detail_title">Photos</h2>
        <ul>
          <li v-for="image in movie.attributes.image.data" :key="image.id">
            <img :src="image.attributes.formats.small.url" :alt="image.attributes.alternativeText">
          </li>
        </ul>
      </div>
      
      <div class="reviews">
        <h2 class="detail_title">Reviews</h2>
        <reviewList :reviews="reviews" />
        <textarea class="review_input" v-model.trim="reviewInput" placeholder="감상평을 등록해주세요."></textarea>
        <div class="review_write">
          <div class="star_rating">
            <span class="number">{{ reviewRating }}</span>
            <NuxtRating @rating-selected="logRating" :read-only="false" :ratingValue="1" :ratingCount="10" ratingSize="26px" />
          </div>
          <button @click="fnReviewPost">리뷰작성</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import qs from "qs"

const { movie } = defineProps(['movie']) // 영화 상세 불러온 데이터
const {id} = useRoute().params // 라우터 params의 id
const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
const reviewInput = ref('') // 리뷰 input 값
const reviewRating = ref(1) // 리뷰 점수 값
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

// 리뷰 데이터 패치
const { data: reviews, pending, error, refresh } = await useAsyncData('reviews', () => {
  return $fetch(`${apiURL}/api/reviews?${query}`)
}, {
  transform: (_reviews) => _reviews.data,
})

// 리뷰 작성
const fnReviewPost = async () => {
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
  reviewRating.value = '' // 리뷰 작성 시 점수 초기화
  refresh()  // 리뷰 작성 후 리뷰 영역 새로고침
}

function logRating(event) { // 리뷰 점수 클릭 시 노출
  reviewRating.value = event
}
</script>