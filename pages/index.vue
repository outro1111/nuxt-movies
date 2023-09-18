<template>
  <div>
    <h1>Home</h1>
    <!-- <p v-if="pending">Loading...</p> -->
    <!-- <ul v-else> -->
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <NuxtLink :to="`/movies/${movie.id}`">
          <h2>{{ movie.attributes.title }}</h2>
          <p>{{ movie.attributes.description }}</p>
          <img :src="movie.attributes.poster.data.attributes.formats.small.url" :alt="movie.attributes.poster.data.attributes.alternativeText">
        </NuxtLink>
        <!-- <ul>
          <li v-for="image in movie.attributes.image.data" :key="image.id">
            <img :src="apiURL + image.attributes.formats.small.url" :alt="image.attributes.alternativeText">
          </li>
        </ul>
        <ul>
          <li v-for="cast in movie.attributes.cast" :key="cast.id">
            <p>{{ cast.name }}</p>
          </li>
        </ul>
        <p v-for="reviews in movie.attributes.reviews.data" :key="reviews.id">{{ reviews.attributes.content }}</p>
        <p>{{ movie.attributes.openingDate }}</p>
        <p>{{ movie.attributes.genre }}</p> -->
      </li>
    </ul>
  </div>
</template>

<script setup>
if (process.client) {
  console.log('Client-side rendering');
} else if (process.server) {
  console.log('Server-side rendering');
}

// useFetch
const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
const { data: movies, pending, error } = await useFetch(apiURL + '/api/movies', {
  // server: false,
  transform: (_movies) => _movies.data,
  params: { populate: "*" }
})

console.log(movies, 'movies')
console.log(toRaw(movies.value), 'movies.value')

// $fetch
// const res = await $fetch('http://localhost:1337/api/movies').catch((error) => error.data)
// const movies = res

// useAsyncData
// const { data: movies, error } = await useAsyncData('movies', () => $fetch('http://localhost:1337/api/movies'))

// @nuxtjs/strapi
// import type { Movie } from '~/types'
// const { find, findOne, create, update, delete: remove } = useStrapi()
// const { data: movies, pending, refresh, error } = await useAsyncData('movies', () => find<Movie>('movies'), {
//   transform: (_movies) => _movies.data
// })
// if (error.value) console.log('ERROR from useFetch: ', error.value)
// if (movies.value) console.log('data returned from useFetch: ', movies)

useHead({
  title: 'Movies | Home',
  meta: [
    { name: 'description', content: 'Movies Homepage' }
  ]
})
</script>