const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gap = 30; // Khoảng cách giữa các hạt
const rows = 40;
const cols = 50;
let count = 0;

function draw() {
    ctx.fillStyle = "#010208";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Tâm của canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // Tọa độ gốc
            let x = (i - cols / 2) * gap;
            let z = (j - rows / 2) * gap;

            // Phương trình sóng Sine kết hợp x và z
            // y = A * sin(khoảng cách + thời gian)
            let dist = Math.sqrt(x * x + z * z);
            let y = Math.sin(dist * 0.02 + count) * 50;

            // Phép chiếu Perspective đơn giản (3D to 2D)
            let perspective = 600 / (600 + z);
            let screenX = centerX + x * perspective;
            let screenY = centerY + (y + 100) * perspective;

            // Vẽ hạt
            let size = 2 * perspective;
            let opacity = (perspective - 0.5) * 2;

            ctx.beginPath();
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.fill();
        }
    }
    count += 0.05; // Tốc độ sóng
    requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
