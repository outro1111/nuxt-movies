<template>
  <template v-if="queryTitle && movies.length > 0">
    <h2 class="sub_title">Movies</h2>
  <div class="search_result">
    <strong>&lsquo;{{ queryTitle }}&rsquo;</strong> {{ $t('movieResultGuide1') }} 
    <strong>&lsquo;{{ movies.length }}&rsquo;</strong> {{ $t('movieResultGuide2') }}
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

const { t } = useI18n()
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
  title: `${t('movieListText')} | MovieRevue`,
  meta: [
    { name: 'description', content: `movieListText ${t('loginText')}` }
  ]
})
</script>