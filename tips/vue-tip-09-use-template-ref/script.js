const { createApp, ref, useTemplateRef, onMounted } = Vue;

createApp({
    setup() {
        const chars = ref(0);
        const focused = ref(false);

        // ✅ Variable name decoupled from template ref string
        const inputEl = useTemplateRef('searchBox');

        onMounted(() => {
            inputEl.value.focus();
        });

        return { chars, focused, inputEl };
    },
    template: `
        <div class="app">
            <div class="label">Search</div>
            <input
                ref="searchBox"
                class="search-box"
                type="text"
                placeholder="Auto-focused via useTemplateRef..."
                @focus="focused = true"
                @blur="focused = false"
                @input="chars = $event.target.value.length"
            />
            <div class="info">
                <span>Element: <code>{{ inputEl?.tagName?.toLowerCase() ?? '—' }}</code></span>
                <span>Chars: <code>{{ chars }}</code></span>
                <span v-if="focused" class="badge">● focused</span>
            </div>
        </div>
    `
}).mount('#app');
