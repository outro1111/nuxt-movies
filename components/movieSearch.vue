<template>
  <div class="search_area" :class="{ active: isSearch }">
    <div class="search_in" @click.self="fnIsSearch"></div>
    <div class="search_form">
      <input type="text" class="search_input" ref="searchInput" v-model.trim="movieSearch"  @keyup.enter="fnSearch" placeholder="Search for movies">
      <button class="btn_search" @click="fnSearch">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg>
      </button>
    </div>
    
    <button class="btn_search" @click="fnIsSearch">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
      </svg>

      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"/></svg>
      background:url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"%2F%3E%3C%2Fsvg%3E')
      https://icon-sets.iconify.design/mdi/magnify/ -->

    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const router = useRouter()
const movieSearch = ref('') // input에 입력된 값
const isSearch = ref(false) // 검색 버튼 클릭 시 검색 영역 노출할 값
const searchInput = ref(null) // 포커스 할 input 엘리먼트

// 검색 버튼 클릭 시 검색 영역 노출
function fnIsSearch() {
  isSearch.value = !isSearch.value // 검색 영역 토글
  movieSearch.value = '' // 검색 입력 값 초기화
  searchInput.value.focus() //input 포커스
}

// 검색 시 라우터 쿼리 push / 검색 영역 비노출
function fnSearch() {
  if(movieSearch.value !== '') {
    router.push({ path: '/movies', query: { title: movieSearch.value } })
    isSearch.value = !isSearch.value
  } 
}
</script>