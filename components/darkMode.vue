<template>
  <button class="btn_darkmode" @click="toggleDarkMode">
    <span class="sr_only">{{ colorModeText }}</span>
  </button>
</template>

<script setup>
const { t } = useI18n()
const colorMode = useColorMode() // @nuxtjs/color-mode 가져오기
const colorModeText = ref('') // dark mode에 따른 텍스트 변경
const toggleDarkMode = () => {
  if (colorMode.value === 'light') { // nuxt-color-mode (local storage) 가 light일 경우
    colorMode.preference = 'dark' // html class를 dark-mode로 변경
    colorModeText.value = t('btnLightmode') // 텍스트 라이트 모드로 변경
  } else {
    colorMode.preference = 'light'
    colorModeText.value = t('btnDarkmode')
  }
}
onMounted(() => {
  if (colorMode.value === 'light') { // nuxt-color-mode (local storage) 가 light일 경우
    colorMode.preference = 'light' // html class를 light-mode로 변경
    colorModeText.value = t('btnDarkmode') // 텍스트 다크 모드로 변경
  } else {
    colorMode.preference = 'dark'
    colorModeText.value = t('btnLightmode')
  }
})
</script>