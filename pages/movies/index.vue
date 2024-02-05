<template>
  <template v-if="queryTitle && movies.length > 0">
    <h2 class="sub_title">Movies</h2>
  <div class="search_result">
    <strong>&lsquo;{{ queryTitle }}&rsquo;</strong>에 대한 검색 결과가 <strong>&lsquo;{{ movies.length }}&rsquo;</strong>개 있습니다.
  </div>
  </template>
  <template v-else>
    <h2 class="sub_title">Movies</h2>
  </template>
  <movieList :movies="movies" />
</template>

<script setup>
// useFetch
import qs from "qs"

const { locale } = useI18n() // 다국어 Cookie Value
const route = useRoute()
const queryTitle = ref(route.query.title) // url 쿼리 title
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
  return $fetch(`${apiURL}/api/movies?${query.value}&locale=${locale.value}`)
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