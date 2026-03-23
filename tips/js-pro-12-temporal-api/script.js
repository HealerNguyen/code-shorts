// Temporal API — requires polyfill or Chrome 127+ / Node 22+
// Using @js-temporal/polyfill for demo compatibility
// In production: import { Temporal } from '@js-temporal/polyfill';

const today = Temporal.Now.plainDateISO();
const deadline = Temporal.PlainDate.from('2026-12-31');

const remaining = today.until(deadline); // Temporal.Duration
const nextWeek  = today.add({ weeks: 1 });
const lastMonth = today.subtract({ months: 1 });

const isBefore = Temporal.PlainDate.compare(today, deadline) < 0;

// ── Update UI ──
document.getElementById('todayVal').textContent = today.toString();
document.getElementById('deadlineVal').textContent = deadline.toString();

const ops = [
    { id: 'opUntil',    result: `{ days: ${remaining.total({ unit: 'days' })} }` },
    { id: 'opAdd',      result: nextWeek.toString() },
    { id: 'opSubtract', result: lastMonth.toString() },
    { id: 'opCompare',  result: isBefore ? 'true (before deadline)' : 'false' },
];

// Activate ops one by one on scroll/click or auto
let elapsed = 0;
const yearStart = Temporal.PlainDate.from(`${today.year}-01-01`);
const yearEnd   = Temporal.PlainDate.from(`${today.year}-12-31`);
const daysInYear = yearStart.until(yearEnd).total({ unit: 'days' });
const dayOfYear  = yearStart.until(today).total({ unit: 'days' });
const pct = Math.round((dayOfYear / daysInYear) * 100);

document.getElementById('barFill').style.width = `${pct}%`;
document.getElementById('barDays').textContent =
    `${remaining.total({ unit: 'days' })} days until ${deadline.toString()}`;

ops.forEach(op => {
    document.getElementById(`${op.id}Result`).textContent = op.result;
});
