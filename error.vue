<template>
  <div class="error">
    <h2>{{ error.statusCode }}</h2>
    <p>{{ $t('errorText') }}</p>
    <p>{{ error.statusMessage }}</p>
    <button class="btn primary" @click="handleClearError">{{ $t('btnGotoMain') }}</button>
  </div>
</template>

<script setup>
defineProps(['error'])

const handleClearError = () => clearError({ redirect: '/' })
</script>
