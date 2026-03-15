const { createApp, ref, computed, onMounted, watch } = Vue;

createApp({
    setup() {
        const balance = ref(12450.75);
        const displayValue = ref(12450.75);
        const isUp = ref(true);
        const changePercent = ref(2.45);
        const history = ref([40, 35, 45, 30, 50, 42, 58]);

        // Animated Value Logic
        const animatedDisplayValue = computed(() => {
            return displayValue.value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        });

        const animateValue = (start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                displayValue.value = progress * (end - start) + start;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        // Chart Logic
        const chartPath = computed(() => {
            const width = 200;
            const height = 60;
            const points = history.value.map((v, i) => {
                const x = (i / (history.value.length - 1)) * width;
                const y = height - (v / 100) * height;
                return `${x},${y}`;
            });
            return `M ${points.join(' L ')}`;
        });

        // Dynamic Theme Color (used via CSS variable in style.css or v-bind)
        const themeColor = computed(() => isUp.value ? '#00ffaa' : '#ff3e3e');

        // Simulation Loop
        onMounted(() => {
            // Set dynamic variable on root
            document.documentElement.style.setProperty('--theme-color', themeColor.value);

            setInterval(() => {
                const change = (Math.random() - 0.45) * 500; // Small upward bias
                const oldVal = balance.value;
                balance.value += change;
                isUp.value = change > 0;
                
                changePercent.value = ((Math.random() * 5) + 1).toFixed(2);
                
                // Add new history point
                history.value.push(Math.max(10, Math.min(90, history.value[history.value.length-1] + (Math.random()*20 - 10))));
                if (history.value.length > 12) history.value.shift();

                animateValue(oldVal, balance.value, 800);
            }, 3000);
        });

        // Watch color to update CSS var
        watch(themeColor, (val) => {
            document.documentElement.style.setProperty('--theme-color', val);
        });

        return {
            balance,
            displayValue,
            animatedDisplayValue,
            isUp,
            changePercent,
            chartPath,
            themeColor
        };
    }
}).mount('#app');
