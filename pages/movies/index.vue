<template>
  <div>
    <movieList :movies="movies" />
  </div>
</template>

<script setup>
// useFetch
const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
const { data: movies, pending, error } = await useFetch(apiURL + '/api/movies', {
  // server: false,
  transform: (_movies) => _movies.data,
  params: { populate: '*',  sort: 'publishedAt:desc'}
})

useHead({
  title: 'Movies | Home',
  meta: [
    { name: 'description', content: 'Movies Homepage' }
  ]
})
</script>