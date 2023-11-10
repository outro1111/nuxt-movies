<template>
  <template v-if="reviews.length"> 
    <ul>
      <li v-for="review in reviews" :key="review.id">
        <p class="rating">{{ review.id }}</p>
        <p class="rating">{{ review.attributes.rating }}</p>
        <p class="review">{{ review.attributes.content }}</p>
      </li>
    </ul>
  </template>
  <template v-else>
    <p class="nodata">리뷰가 없습니다.</p>
  </template>
</template>

<script setup>
const { reviews } = defineProps(['reviews']) // 리뷰 불러온 데이터
</script>