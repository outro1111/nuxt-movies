<template>
  <template v-if="movies.length"> 
    <ul class="list">
      <li v-for="movie in movies" :key="movie.id">
        <NuxtLink :to="localePath(`/movies/${movie.id}`)">
          <div class="thumb"><img :src="movie.attributes.image.data[0].attributes.formats.medium.url" :alt="movie.attributes.image.data[0].attributes.alternativeText"></div>
          <h2 class="title">{{ movie.attributes.title }}</h2>
          <h2 class="titleOriginal">{{ movie.attributes.titleOriginal }}</h2>
          <p class="description" v-html="movie.attributes.description"></p>
        </NuxtLink>
      </li>
    </ul>
  </template>
  <template v-else>
    <p class="nodata">{{ $t('noData') }}</p>
  </template>
</template>

<script setup>
const { movies } = defineProps(['movies']) // 무비 리스트 불러온 데이터
const localePath = useLocalePath() // 다국어 적용 링크
</script>