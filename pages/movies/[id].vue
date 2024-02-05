<template>
  <movieDetails :movie="movie" />
</template>

<script setup>
import qs from "qs"

const router = useRouter()
const { locale } = useI18n() // 다국어 Cookie Value
const {id} = useRoute().params // 라우터 params의 id
const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL
const query = qs.stringify(
  {
    fields: ['title', 'titleOriginal', 'description', 'openingDate', 'genre'],
    populate: ['poster', 'image', 'cast', 'cast.photo', 'localizations.id'],
  },
  {
    encodeValuesOnly: true,
  }
)

const { data: movie, pending, error, refresh } = await useAsyncData('movie', () => {
  return $fetch(`${apiURL}/api/movies/${id}?${query}&locale=${locale.value}`)
}, {
  transform: (_movie) => _movie.data,
})

const enId = ref(movie.value.attributes.localizations.data[0].id) // 다국어 전환 시 사용될 movie의 id

watch(locale, async (newLocale) => {
  if (newLocale === 'en' && enId.value) { // 영문으로 전환 시 
    await router.push(`/en/movies/${enId.value}`) // 영문 movie id로 url push
  } else { // 국문으로 전환 시
    await router.push(`/movies/${enId.value}`) // 국문 movie id로 url push
  }
})

provide('koId', id) // 국문 movie 아이디 reviewList.vue로 전달
provide('enId', enId.value) // 영문  movie 아이디 reviewList.vue로 전달

useHead({
  title: `${toRaw(movie.value).attributes.title} | MovieRevue`,
  meta: [
    { name: 'description', content: `MovieRevue ${toRaw(movie.value).attributes.description}` }
  ]
})
</script>
