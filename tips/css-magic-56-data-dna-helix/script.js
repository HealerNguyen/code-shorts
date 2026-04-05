const canvas = document.getElementById('dnaCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const count = 60; // Số lượng cặp hạt
const radius = 120; // Bán kính vòng xoắn
const speed = 0.02;
let rotation = 0;

function draw() {
    // Tạo hiệu ứng mờ dần để có "trail" (đuôi sáng)
    ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < count; i++) {
        // Tính toán góc và độ cao cho từng hạt
        // Dùng hàm Sine/Cosine để tạo vòng tròn
        let angle = rotation + (i * 0.2);
        let y = (i - count / 2) * 15;

        // Sợi thứ nhất
        let x1 = Math.cos(angle) * radius;
        let z1 = Math.sin(angle) * radius;

        // Sợi thứ hai (đối xứng 180 độ)
        let x2 = Math.cos(angle + Math.PI) * radius;
        let z2 = Math.sin(angle + Math.PI) * radius;

        // Phép chiếu 3D to 2D
        let p1 = 600 / (600 + z1);
        let p2 = 600 / (600 + z2);

        // Vẽ đường kết nối (Liên kết Hydro)
        ctx.beginPath();
        ctx.moveTo(centerX + x1 * p1, centerY + y * p1);
        ctx.lineTo(centerX + x2 * p2, centerY + y * p2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * p1})`;
        ctx.stroke();

        // Vẽ hạt sáng sợi 1
        ctx.beginPath();
        ctx.arc(centerX + x1 * p1, centerY + y * p1, 3 * p1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p1})`;
        ctx.fill();

        // Vẽ hạt sáng sợi 2
        ctx.beginPath();
        ctx.arc(centerX + x2 * p2, centerY + y * p2, 3 * p2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p2})`;
        ctx.fill();
    }

    rotation += speed;
    requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
