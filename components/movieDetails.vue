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
      <p class="average" v-if="average">{{ (average).toFixed(1) }}</p>
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
        <!-- <reviewList :reviews="reviews" /> -->
        <!-- <reviewList :reviews="reviews" @modifyId="modifyId" /> -->
        <reviewList ref="childAverage" />
      </div>
    </div>

  </div>
</template>

<script setup>
const { movie } = defineProps(['movie']) // 영화 상세 불러온 데이터
const { formatDate } = useFormatDate()
const childAverage = ref(null)
const average = ref(null)
watchEffect(() => {
  if (childAverage.value) {
    average.value = childAverage.value.average
  }
})
</script>