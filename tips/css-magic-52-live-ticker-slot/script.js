// Initialize digit carousel (0-9) for each column
const columns = document.querySelectorAll('.digit-column');
columns.forEach(col => {
    let html = '';
    for (let i = 0; i <= 9; i++) {
        html += `<div class="number">${i}</div>`;
    }
    col.innerHTML = html;
});

// Slide column to the correct digit position
// Each number is 80px tall, so digit N is at -(N * 80)px
const DIGIT_HEIGHT = 80;

function updateTicker(value) {
    // Format: always 5 integer digits + 2 decimal (e.g. "14520.50")
    const formattedValue = value.toFixed(2).padStart(8, '0');

    // Split into array and remove decimal point to match 7 column divs
    const digits = formattedValue.split('').filter(c => c !== '.');

    // Slide each column
    columns.forEach((col, index) => {
        const targetNumber = parseInt(digits[index]);
        const translateY = -(targetNumber * DIGIT_HEIGHT);
        col.style.transform = `translateY(${translateY}px)`;
    });
}

// Simulate real-time price fluctuation
let currentPrice = 14520.50; // Starting price

setInterval(() => {
    // Random price change between -$50 and +$50
    const change = (Math.random() * 100) - 50;
    currentPrice += change;

    // Prevent negative
    if (currentPrice < 0) currentPrice = 14520.50;

    updateTicker(currentPrice);
}, 1500); // Update every 1.5 seconds
