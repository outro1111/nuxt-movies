<template>
    <movieList :movies="movies" />
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
        $or: [
          {
            title: { $containsi: queryTitle.value }
          },
          {
            titleOriginal: { $containsi: queryTitle.value }
          },
        ],
      },
      sort: 'publishedAt:desc'
    },
    {
      encodeValuesOnly: true,
    }
  )
})

const { data: movies, pending, error } = await useAsyncData('movies', () => {
  return $fetch(`${apiURL}/api/movies?${query.value}`)
}, {
  transform: (_movies) => _movies.data,
  watch: [queryTitle]
})

watch(() => route.query.title, () => {
  queryTitle.value = route.query.title
})

useHead({
  title: '영화 리스트 | MovieRevue',
  meta: [
    { name: 'description', content: 'MovieRevue 영화 리스트' }
  ]
})
</script>