/* Stack 0-9 in each column, clip with overflow */
.digit-window {
  height: 80px;
  overflow: hidden; /* The magic clip! */
}

/* Slide column to target digit */
function updateTicker(value) {
  const digits = value.toFixed(2)
    .padStart(8, '0')
    .split('').filter(c => c !== '.');

  columns.forEach((col, i) => {
    const n = parseInt(digits[i]);
    col.style.transform =
      `translateY(${-(n * 80)}px)`;
  });
}

/* Simulate real-time price changes */
setInterval(() => {
  price += (Math.random() * 100) - 50;
  updateTicker(price);
}, 1500);
