<template>
  <div class="lang_area">
    <button class="btn_lang" @click="langOpen = !langOpen"><em><span class="sr_only">{{ $t('btnLang') }}</span></em><span class="arrow"></span></button>
    <transition name="langLayerfade">
      <div class="lang_layer" v-if="langOpen" :class="{ active: langOpen }">
        <div class="lang_layer_in" @click.self="langOpen = !langOpen"></div>
        <div class="lang_menu">
          <NuxtLink :to="switchLocalePath('ko')" @click.self="langOpen = !langOpen">한국어</NuxtLink>
          <NuxtLink :to="switchLocalePath('en')" @click.self="langOpen = !langOpen">English</NuxtLink>
        </div>
      </div>
    </transition>  
  </div>
</template>

<script setup>
const switchLocalePath = useSwitchLocalePath() // 다국어 스위치
const langOpen = ref(false) // 다국어 메뉴 toggle
</script>