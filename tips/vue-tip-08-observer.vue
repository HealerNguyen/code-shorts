<script setup>
import { ref, onMounted } from 'vue';

const boxes = ref([]);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // 🎯 When the box enters the screen, add 'visible' class
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

// ✨ Auto-observe all boxes on mount
onMounted(() => {
  boxes.value.forEach(box => {
    observer.observe(box);
  });
});
</script>

<template>
  <!-- 📌 Bind the ref to an array -->
  <div 
    v-for="i in 10"
    ref="boxes" 
    class="box"
  >
    Scroll Me 👇
  </div>
</template>
