<template>
  <movieDetails :movie="movie" />
</template>

<script setup>
import qs from "qs"

const {id} = useRoute().params
const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
const query = qs.stringify(
  {
    fields: ['title', 'titleOriginal', 'description', 'openingDate', 'genre'],
    populate: ['poster', 'image', 'cast'],
  },
  {
    encodeValuesOnly: true,
  }
)

const { data: movie, pending, error } = await useAsyncData('movie', () => {
  return $fetch(`${apiURL}/api/movies/${id}?${query}`)
}, {
  transform: (_movie) => _movie.data,
})

useHead({
  title: `Movies | ${toRaw(movie.value).attributes.title}`,
  meta: [
    { name: 'description', content: `Movies ${toRaw(movie.value).attributes.description}` }
  ]
})
</script>
