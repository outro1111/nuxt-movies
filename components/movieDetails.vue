<template>
  <div class="detail_movie" :style="{ 'background':`url(${ movie.attributes.image.data[1].attributes.url }) no-repeat`}">
    <h2>{{ movie.attributes.title }}</h2>
    <p v-html="movie.attributes.description"></p>
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
const { movie } = defineProps(['movie'])
</script>