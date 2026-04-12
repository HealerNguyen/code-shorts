const canvas = document.getElementById('coreCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let time = 0;

function draw() {
    // Trail effect — semi-transparent overlay instead of clearRect
    ctx.fillStyle = "rgba(1, 2, 8, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // System pulse — simulates a breathing reactor core
    const pulse = Math.sin(time * 2) * 10 + 100;
    time += 0.02;

    ctx.lineWidth = 1.5;

    // Draw 3 rotating ring layers
    for (let j = 1; j <= 3; j++) {
        const radius = pulse * j * 0.7;
        const speed = time * (j % 2 === 0 ? -1 : 1) * 0.5;

        ctx.strokeStyle = j === 2 ? "#818cf8" : "#4f46e5";

        // Each ring is made of 4 arc segments
        for (let i = 0; i < 4; i++) {
            const startAngle = speed + (i * Math.PI) / 2;
            const endAngle = startAngle + Math.PI / 4;

            ctx.beginPath();
            ctx.arc(cx, cy, radius, startAngle, endAngle);
            ctx.stroke();

            // Bright dot at the start of each arc
            const dotX = cx + Math.cos(startAngle) * radius;
            const dotY = cy + Math.sin(startAngle) * radius;
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Glowing core center
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulse / 2);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.2)");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, pulse / 2, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
