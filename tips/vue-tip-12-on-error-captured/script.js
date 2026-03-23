const { createApp, ref, onErrorCaptured } = Vue;

// Buggy child component
const BuggyChild = {
    props: ['shouldThrow'],
    setup(props) {
        if (props.shouldThrow) {
            throw new Error('Something went wrong in child!');
        }
        return {};
    },
    template: `
        <div class="child-card healthy">
            <div class="child-name">ChildComponent</div>
            <div class="child-value">✓ Rendering fine</div>
        </div>
    `
};

createApp({
    components: { BuggyChild },
    setup() {
        const error = ref(null);
        const shouldThrow = ref(false);

        onErrorCaptured((err) => {
            error.value = err.message;
            return false; // prevent propagation
        });

        function triggerError() {
            error.value = null;
            shouldThrow.value = false;
            setTimeout(() => { shouldThrow.value = true; }, 50);
        }

        function reset() {
            error.value = null;
            shouldThrow.value = false;
        }

        return { error, shouldThrow, triggerError, reset };
    },
    template: `
        <div class="boundary" :class="{ errored: error }">
            <div class="boundary-label">ErrorBoundary (parent)</div>

            <div v-if="error" class="error-banner visible">
                ⚠️ {{ error }}
            </div>
            <BuggyChild v-else :shouldThrow="shouldThrow" />

            <button v-if="!error" @click="triggerError">💥 Trigger Error</button>
            <button v-else class="reset" @click="reset">↩ Reset</button>
        </div>
    `
}).mount('#app');
