<template>
  <div class="error">
    <h2>{{ error.statusCode }}</h2>
    <p>해당 페이지를 찾을 수 없습니다.</p>
    <p>{{ error.statusMessage }}</p>
    <button @click="handleClearError">Go Home</button>
  </div>
</template>

<script setup>
defineProps(['error'])

const handleClearError = () => clearError({ redirect: '/' })
</script>
