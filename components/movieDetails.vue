<template>
  <div class="detail_movie">
    <div class="detail_top">
      <div class="top_bg"><img :src="movie.attributes.image.data[1].attributes.url" alt=""></div>
      <div class="top_con">
        <h2 class="title">{{ movie.attributes.title }}</h2>
        <h2 class="titleOriginal">{{ movie.attributes.titleOriginal }}</h2>
        <p class="genre">{{ movie.attributes.genre }}</p>
        <p class="openingDate">{{ formatDate(movie.attributes.openingDate) }}</p>
      </div>
      <p class="average" v-if="average"><span>{{ (average).toFixed(1) }}</span></p> <!-- 리뷰 평균 점수 toFixed로 소수점 처리 -->
    </div>

    <div class="detail_con">
      <div class="description">
        <h2 class="detail_title">Storyline</h2>
        <p v-html="movie.attributes.description"></p>
      </div>
      <div class="poster">
        <img :src="movie.attributes.poster.data.attributes.formats.medium.url" :alt="movie.attributes.poster.data.attributes.alternativeText">
      </div>

      <div class="cast">
        <h2 class="detail_title">Cast</h2>
        <ul>
          <li v-for="cast in movie.attributes.cast" :key="cast.id">
            <p class="photo"><img :src="cast.photo.data.attributes.url" :alt="cast.photo.data.attributes.alternativeText"></p>
            <p class="name">{{ cast.name }}</p>
            <p class="role">{{ cast.role }}</p>
          </li>
        </ul>
      </div>

      <div class="photos">
        <h2 class="detail_title">Photos</h2>
        <ul>
          <li v-for="image in movie.attributes.image.data" :key="image.id">
            <img :src="image.attributes.formats.medium.url" :alt="image.attributes.alternativeText">
          </li>
        </ul>
      </div>
     
      <div class="reviews">
        <h2 class="detail_title">Reviews</h2>
        <reviewList ref="childAverage" />
      </div>
    </div>

  </div>
</template>

<script setup>
const { movie } = defineProps(['movie']) // 영화 상세 불러온 데이터
const { formatDate } = useFormatDate() // 개봉일 날짜 composables
const childAverage = ref(null) // reviewList.vue 에서 defineExpose로 넘긴 ref 값 초기화
const average = ref(null) // 평균 리뷰 점수 초기화
watchEffect(() => {
  if (childAverage.value) {
    average.value = childAverage.value.average // 평균 리뷰 점수에 childAverage 값 설정
  }
})
</script>