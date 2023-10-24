<template>
  <div class="search_area" :class="{ active: isSearch }">
    <!-- <div class="search_in" :class="{ active: isSearch }"> -->
    <div class="search_in" @click.self="fnIsSearch">
      <div class="search_form">
        <input type="text" class="search_input" ref="searchInput" v-model="movieSearch"  @keyup.enter="fnSearch" placeholder="Search for movies">
        <button class="btn_search" @click="fnSearch">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
          </svg>
        </button>
      </div>
    </div>
    <button class="btn_search" @click="fnIsSearch">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const router = useRouter()
const movieSearch = ref('')
const isSearch = ref(false)
const searchInput = ref(null)

function fnIsSearch() {
  isSearch.value = !isSearch.value
  movieSearch.value = ''
  searchInput.value.focus()
}

function fnSearch() {
  if(movieSearch.value !== '') {
    router.push({ path: '/movies', query: { title: movieSearch.value } })
    isSearch.value = !isSearch.value
  } 
}
</script>