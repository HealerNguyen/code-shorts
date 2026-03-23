const { createApp, provide, inject, ref } = Vue;

// Deep grandchild — only uses inject
const GrandChild = {
    setup() {
        const theme = inject('theme');
        const color = inject('accentColor');
        return { theme, color };
    },
    template: `
        <div class="node consumer">
            <div class="node-label">GrandChild</div>
            <div class="node-name">ComponentC</div>
            <div class="node-value">theme: {{ theme }}</div>
        </div>
    `
};

// Middle — passes nothing, doesn't use it either
const MiddleChild = {
    components: { GrandChild },
    template: `
        <div class="node skip">
            <div class="node-label">Child (skipped)</div>
            <div class="node-name">ComponentB</div>
        </div>
        <div class="spacer"></div>
        <div class="tree-row">
            <GrandChild />
        </div>
    `
};

createApp({
    components: { MiddleChild },
    setup() {
        const theme = ref('dark');

        provide('theme', theme);
        provide('accentColor', '#a78bfa');

        function setTheme(t) { theme.value = t; }

        return { theme, setTheme };
    },
    template: `
        <div class="tree">
            <div class="tree-row">
                <div class="node provider">
                    <div class="node-label">Parent (provider)</div>
                    <div class="node-name">ComponentA</div>
                    <div class="node-value">provide('theme', '{{ theme }}')</div>
                </div>
            </div>
            <div class="spacer"></div>
            <MiddleChild />
        </div>
        <div class="theme-switcher">
            <button class="theme-btn" :class="{active: theme==='dark'}" @click="setTheme('dark')">dark</button>
            <button class="theme-btn" :class="{active: theme==='light'}" @click="setTheme('light')">light</button>
            <button class="theme-btn" :class="{active: theme==='purple'}" @click="setTheme('purple')">purple</button>
        </div>
    `
}).mount('#app');
