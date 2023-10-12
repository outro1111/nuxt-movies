<template>
  <div class="main_movie">
    <img :src="movies[0].attributes.image.data[0].attributes.url" alt="">
    <div class="feature">
      <h1>SCREENPLAY NOW!</h1>
      <strong>{{ movies[0].attributes.title }}</strong>
      <em>{{ movies[0].attributes.titleOriginal }}</em>
      <p>{{ movies[0].attributes.description }}</p>
    </div>
  </div>
  <div>
    <p v-if="pending">Loading...</p>
    <movieList v-else :movies="movies" />
  </div>
</template>

<script setup>
// useFetch
const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
const { data: movies, pending, error } = await useFetch(`${apiURL}/api/movies`, {
  transform: (_movies) => _movies.data,
  params: {
    fields: ['title', 'titleOriginal', 'description'],
    populate: ['poster', 'image'],  
    sort: 'publishedAt:desc'
  }
})

definePageMeta({
  layout: 'main'
})

useHead({
  title: 'Movies | Home',
  meta: [
    { name: 'description', content: 'Movies Homepage' }
  ]
})
</script>