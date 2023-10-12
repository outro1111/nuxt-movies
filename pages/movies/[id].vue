<template>
  <movieDetails :movie="movie" />
</template>

<script setup>
const {id} = useRoute().params
const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
  const {data:movie} = await useFetch(`${apiURL}/api/movies/${id}`, {
  // key: id,
  transform: (_movie) => _movie.data,
  params: { populate: "*" }
})

useHead({
  title: `Movies | ${toRaw(movie.value).attributes.title}`,
  meta: [
    { name: 'description', content: `Movies ${toRaw(movie.value).attributes.description}` }
  ]
})
</script>
