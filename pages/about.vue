<template>
  <div>
    <h1>About</h1>
    <p>{{ aboutUs.attributes.content }}</p>
  </div>
</template>

<script setup>
if (process.client) {
  console.log('Client-side rendering');
} else if (process.server) {
  console.log('Server-side rendering');
}

// useFetch
const apiURL = useRuntimeConfig().public.apiURL
const {data: aboutUs, pending, error, refresh} = await useFetch(apiURL + '/api/about-us', {
  // server: false,
  transform: (_aboutUs) => _aboutUs.data,
})
console.log(aboutUs)
console.log(toRaw(aboutUs.value))

useHead({
  title: 'Movies | About Us',
  meta: [
    { name: 'description', content: 'Movies About Us' }
  ]
})
</script>