<template>
  <div>
    <movieList :movies="movies" />
  </div>
</template>

<script setup>
// useFetch
import qs from "qs"

const route = useRoute()
const queryTitle = ref(route.query.title)
const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
const query = computed(() => {
	return qs.stringify(
    {
      fields: ['title', 'titleOriginal', 'description'],
      populate: ['poster', 'image'],
      filters: {
        title: { $contains: queryTitle.value },
      },
      sort: 'publishedAt:desc'
    },
    {
      encodeValuesOnly: true,
    }
  )
})

const { data: movies, pending, error } = await useAsyncData(() => {
  return $fetch(`${apiURL}/api/movies?${query.value}`)
}, {
  transform: (_movies) => _movies.data,
  watch: [queryTitle]
})

// const { data: movies, pending, error, refresh, execute } = await useFetch(`${apiURL}/api/movies?${query.value}`, {
//   transform: (_movies) => _movies.data,
//   watch: [queryTitle]
// })

watch(() => route.query.title, () => {
  queryTitle.value = route.query.title
})

useHead({
  title: 'Movies | Home',
  meta: [
    { name: 'description', content: 'Movies Homepage' }
  ]
})
</script>