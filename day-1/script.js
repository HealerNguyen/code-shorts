const { createApp, ref, computed, onMounted } = Vue;

const app = createApp({
    setup() {
        // Mock product data
        const product = ref({
            name: "Sony WH-1000XM5",
            description: "Wireless Noise Cancelling Headphones",
            price: 398.00,
            colors: [
                { id: 'black', name: 'Midnight Black', hex: '#1a1a1a', image: 'img/black.png', theme: 'rgba(26, 26, 26, 0.4)' },
                { id: 'silver', name: 'Platinum Silver', hex: '#e2dfd9', image: 'img/silver.png', theme: 'rgba(226, 223, 217, 0.4)' },
                { id: 'blue', name: 'Midnight Blue', hex: '#1d263b', image: 'img/blue.png', theme: 'rgba(29, 38, 59, 0.4)' }
            ],
            sizes: ['One Size'] // Mock size for realism
        });

        // State ref variables
        const currentColor = ref(product.value.colors[0]);
        const currentSize = ref(product.value.sizes[0]);
        const cartState = ref('idle'); // 'idle', 'loading', 'added'
        const isWishlisted = ref(false);

        // Methods
        const selectColor = (color) => {
            if (currentColor.value.id !== color.id) {
                currentColor.value = color;
                // Update CSS variable for ambient card glow
                document.documentElement.style.setProperty('--theme-color', color.theme);
            }
        };

        const selectSize = (size) => {
            currentSize.value = size;
        };

        const toggleWishlist = () => {
            isWishlisted.value = !isWishlisted.value;
        };

        const addToCart = () => {
            if (cartState.value !== 'idle') return;

            // 1. Transition to loading state
            cartState.value = 'loading';

            // 2. Mock network request delay
            setTimeout(() => {
                cartState.value = 'added';
                
                // 3. Reset back to idle after showing success
                setTimeout(() => {
                    cartState.value = 'idle';
                }, 2500);
            }, 800);
        };

        onMounted(() => {
            // Set initial theme color
            document.documentElement.style.setProperty('--theme-color', currentColor.value.theme);
        });

        return {
            product,
            currentColor,
            currentSize,
            cartState,
            isWishlisted,
            selectColor,
            selectSize,
            toggleWishlist,
            addToCart
        };
    }
});

app.mount('#app');
