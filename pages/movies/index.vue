<template>
  <div>
    <movieList :movies="movies" />
  </div>
</template>

<script setup>
// useFetch
import qs from "qs";

const route = useRoute()
const queryTitle = route.query.title
const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
const query = qs.stringify(
  {
    fields: ['title', 'titleOriginal', 'description'],
    populate: ['poster', 'image'],
    filters: {
      title: { $contains: queryTitle },
    },
    sort: 'publishedAt:desc'
  },
  {
    encodeValuesOnly: true,
  }
)
const { data: movies, pending, error, refresh } = await useFetch(`${apiURL}/api/movies?${query}`, {
  transform: (_movies) => _movies.data,
})

watch(() => route.fullPath, () => {
  console.log(route.query.title)
  refresh()
})
// watch(() => route.query, () => refresh(), console.log(route.query))
// watch(
//   [ queryTitle ], (to, from) => {
//     console.log(from, to);
//   }
// )


useHead({
  title: 'Movies | Home',
  meta: [
    { name: 'description', content: 'Movies Homepage' }
  ]
})
</script>