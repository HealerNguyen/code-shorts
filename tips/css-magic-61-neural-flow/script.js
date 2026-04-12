const canvas = document.getElementById('flowCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 800;
const noiseScale = 0.008;
let time = 0;

// Gradient palette — indigo → violet → cyan
const palette = ['#6366f1', '#8b5cf6', '#a78bfa', '#7c3aed', '#06b6d4'];

// Mouse attractor
let mouse = { x: canvas.width / 2, y: canvas.height / 2, active: false };

class Particle {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.prevX = this.x;
        this.prevY = this.y;
        this.speed = Math.random() * 2 + 0.8;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.life = Math.random() * 120 + 80;
    }

    update() {
        this.prevX = this.x;
        this.prevY = this.y;

        // Flow field angle from layered sin/cos
        const angle = (
            Math.sin(this.x * noiseScale + time) +
            Math.cos(this.y * noiseScale * 1.3 - time * 0.7) +
            Math.sin((this.x + this.y) * noiseScale * 0.5 + time * 0.4)
        ) * Math.PI;

        let vx = Math.cos(angle) * this.speed;
        let vy = Math.sin(angle) * this.speed;

        // Mouse attraction when active
        if (mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 250) {
                const force = (1 - dist / 250) * 0.8;
                vx += (dx / dist) * force;
                vy += (dy / dist) * force;
            }
        }

        this.x += vx;
        this.y += vy;

        this.life--;
        if (this.life <= 0 || this.x < 0 || this.x > canvas.width ||
            this.y < 0 || this.y > canvas.height) {
            this.init();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    // Long-exposure trail effect
    ctx.fillStyle = 'rgba(1, 2, 8, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    time += 0.002;
    requestAnimationFrame(animate);
}

animate();

// Mouse events
canvas.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
});

canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
});
