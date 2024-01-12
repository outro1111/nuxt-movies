<template>
  <div class="main_movie">
    <img :src="movies[0].attributes.image.data[1].attributes.url" alt="">
    <div class="border"><span></span></div>
    <div class="feature">
      <h1>Screenplay Now!</h1>
      <strong>{{ movies[0].attributes.title }}</strong>
      <em>{{ movies[0].attributes.titleOriginal }}</em>
      <p  v-html="movies[0].attributes.description"></p>
    </div>
  </div>
  <!-- <div class="list"> -->
    <!-- <p v-if="pending">Loading...</p> -->
    <movieList :movies="movies" />
  <!-- </div> -->
</template>

<script setup>
import qs from "qs"

const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
const query = qs.stringify(
  {
    fields: ['title', 'titleOriginal', 'description'],
    populate: ['poster', 'image'],
    sort: 'publishedAt:desc',
    pagination: {
      page: 1,
      pageSize: 6,
    },
  },
  {
    encodeValuesOnly: true,
  }
)
// const { data: movies, pending, error } = await useLazyFetch(`${apiURL}/api/movies?${query}`, {
//   transform: (_movies) => _movies.data,
// })

const { data: movies, pending, error } = await useLazyAsyncData(() => {
  return $fetch(`${apiURL}/api/movies?${query}`)
}, {
  transform: (_movies) => _movies.data,
})

definePageMeta({
  layout: 'main'
})

useHead({
  title: 'Home | MovieRevue',
  meta: [
    { name: 'description', content: 'MovieRevue Homepage' }
  ]
})
</script>