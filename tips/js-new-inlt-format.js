// ❌ The Old Way (Regex Magic)
const price = 1234567.89;
const oldWay = price.toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// Result: "1,234,567.89"

// ✅ The Modern Way (Intl API)
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const newWay = formatter.format(price);
// Result: "$1,234,567.89" 🎉
