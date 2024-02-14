<template>
  <div class="search_area" :class="{ active: isSearch }">
    <div class="search_in" @click.self="fnIsSearch"></div>
    <div class="search_form">
      <input type="text" class="search_input" ref="searchInput" v-model.trim="movieSearch"  @keyup.enter="fnSearch" placeholder="Search for movies">
      <button class="btn_search" @click="fnSearch"><span class="sr_only">{{ $t('btnSearch') }}</span></button>
    </div>
    
    <button class="btn_search" @click="fnIsSearch"><span class="sr_only">{{ $t('btnSearch') }}</span></button>
  </div>
</template>

<script setup>
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
const localePath = useLocalePath() // 다국어 적용 링크
function fnSearch() {
  if(movieSearch.value !== '') { // 검색 값이 있다면 
    router.push({ path: localePath('/movies'), query: { title: movieSearch.value } }) // 검색값을 쿼리로 push
    isSearch.value = !isSearch.value // 검색 영역 토글
  } 
}
</script>