<script setup>
import { ref, onRenderTracked, onRenderTriggered } from 'vue';

const count = ref(0);

// 🔍 Logs every time the component tracks a dependency
onRenderTracked((e) => {
  console.log('Tracked!', e.key, e.target);
});

// 🔥 Logs EXACTLY what caused the re-render!
onRenderTriggered((e) => {
  console.table({
    type: e.type, 
    key: e.key, 
    oldValue: e.oldValue, 
    newValue: e.newValue
  });
  debugger; // ⏸️ Pauses execution to inspect in devtools
});
</script>
