<template>
  <div>
    <h1>About</h1>
    <template v-if="!pending">
      <p>{{ aboutUs.attributes.content }}</p>
    </template>
  </div>
</template>

<script setup>
// const apiURL = useRuntimeConfig().public.apiURL
// const {data: aboutUs, pending, error} = await useFetch(apiURL + '/api/about-us', {
//   transform: (_aboutUs) => _aboutUs.data,
// })

const runtimeConfig = useRuntimeConfig()
const apiURL = runtimeConfig.public.apiURL

const { data: aboutUs, pending, error } = await useLazyAsyncData('aboutUs', () => {
  return $fetch(`${apiURL}/api/about-us`)
}, {
  transform: (_aboutUs) => _aboutUs.data,
})

useHead({
  title: 'About Us | MovieRevue',
  meta: [
    { name: 'description', content: 'Movies About Us' }
  ]
})
</script>