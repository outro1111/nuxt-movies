<template>
  <div class="detail_movie">
    <h2>{{ movie.attributes.title }}</h2>
    <p>{{ movie.attributes.description }}</p>
    <img :src="movie.attributes.poster.data.attributes.formats.small.url" :alt="movie.attributes.poster.data.attributes.alternativeText">
    <ul>
      <li v-for="image in movie.attributes.image.data" :key="image.id">
        <img :src="image.attributes.formats.small.url" :alt="image.attributes.alternativeText">
      </li>
    </ul>
    <ul>
      <li v-for="cast in movie.attributes.cast" :key="cast.id">
        <p>{{ cast.name }}</p>
      </li>
    </ul>
    <p>{{ movie.attributes.openingDate }}</p>
    <p>{{ movie.attributes.genre }}</p>
    <ul>
      <li v-for="reviews in movie.attributes.reviews.data" :key="reviews.id">{{ reviews.attributes.content }}</li>
    </ul>
  </div>
</template>

<script setup>
const {id} = useRoute().params

const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
// const {data:movies} = await useFetch(apiURL + '/api/movies/' + id, {
  const {data:movie} = await useFetch(`${apiURL}/api/movies/${id}`, {
  // key: id,
  transform: (_movie) => _movie.data,
  params: { populate: "*" }
})

console.log(movie, 'movie')
console.log(toRaw(movie.value), 'movie.value')

useHead({
  title: `Movies | ${toRaw(movie.value).attributes.title}`,
  meta: [
    { name: 'description', content: `Movies ${toRaw(movie.value).attributes.description}` }
  ]
})
</script>
