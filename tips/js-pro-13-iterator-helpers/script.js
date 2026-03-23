// Iterator Helpers — requires Chrome 122+ / Node 22+

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Each step is lazy — only processes what's needed
const result = Iterator.from(nums)
    .filter(n => n % 2 === 0)   // [2, 4, 6, 8, 10] — lazy
    .map(n => n * n)             // [4, 16, 36, 64, 100] — lazy
    .take(3)                     // stop after 3 items!
    .toArray();
// → [4, 16, 36]

// Also useful:
const firstEven = Iterator.from(nums)
    .filter(n => n % 2 === 0)
    .next().value;               // 2 — stops immediately

// Count with reduce:
const count = Iterator.from(nums)
    .filter(n => n > 5)
    .reduce((acc) => acc + 1, 0); // 5

console.log('Result:', result);
console.log('First even:', firstEven);
console.log('Count > 5:', count);
