const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const properties = {
    count: 100,
    velocity: 0.5,
    lineLength: 150,
    particleRadius: 2,
    mouseRadius: 200
};

const mouse = { x: null, y: null };

window.onmousemove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
};

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dirX = (Math.random() - 0.5) * properties.velocity;
        this.dirY = (Math.random() - 0.5) * properties.velocity;
    }

    update() {
        if (this.x > canvas.width || this.x < 0) this.dirX *= -1;
        if (this.y > canvas.height || this.y < 0) this.dirY *= -1;
        this.x += this.dirX;
        this.y += this.dirY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.8)";
        ctx.fill();
    }
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < properties.count; i++) {
        particles.push(new Particle());
    }
    loop();
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < properties.lineLength) {
                const opacity = 1 - distance / properties.lineLength;
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.5})`;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }

        // Mouse interaction
        const mDx = particles[i].x - mouse.x;
        const mDy = particles[i].y - mouse.y;
        const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
        if (mDist < properties.mouseRadius) {
            const mOpacity = 1 - mDist / properties.mouseRadius;
            ctx.strokeStyle = `rgba(255, 255, 255, ${mOpacity * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    drawLines();
    requestAnimationFrame(loop);
}

init();
