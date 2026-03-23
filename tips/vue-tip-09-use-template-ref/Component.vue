<script setup>
import { useTemplateRef, onMounted } from 'vue'

// ✅ variable name can be ANYTHING
const inputEl = useTemplateRef('searchBox')

onMounted(() => {
  inputEl.value.focus()
})
</script>

<template>
  <input ref="searchBox" />
</template>
