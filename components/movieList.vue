<template>
  <ul class="list">
    <li v-for="movie in movies" :key="movie.id">
      <NuxtLink :to="`/movies/${movie.id}`">
        <div class="thumb"><img :src="movie.attributes.poster.data.attributes.formats.small.url" :alt="movie.attributes.poster.data.attributes.alternativeText"></div>
        <h2 class="title">{{ movie.attributes.title }}</h2>
        <p class="description">{{ movie.attributes.description }}</p>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
const { movies } = defineProps(['movies'])
</script>