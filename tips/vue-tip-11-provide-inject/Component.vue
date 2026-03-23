<!-- Parent -->
<script setup>
import { provide, ref } from 'vue'
const theme = ref('dark')
provide('theme', theme)
</script>

<!-- DeepChild (any level) -->
<script setup>
import { inject } from 'vue'
const theme = inject('theme')
</script>
