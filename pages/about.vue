<template>
  <div>
    <h1>About</h1>
    <p>{{ aboutUs.attributes.content }}</p>
  </div>
</template>

<script setup>
// useFetch
const apiURL = useRuntimeConfig().public.apiURL
const {data: aboutUs, pending, error} = await useFetch(apiURL + '/api/about-us', {
  transform: (_aboutUs) => _aboutUs.data,
})

useHead({
  title: 'Movies | About Us',
  meta: [
    { name: 'description', content: 'Movies About Us' }
  ]
})
</script>