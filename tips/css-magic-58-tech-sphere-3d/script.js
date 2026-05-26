const canvas = document.getElementById('sphereCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tags = [
    'React', 'Vue', 'Node.js', 'Python', 'Docker', 'AWS', 'Tailwind',
    'TypeScript', 'MongoDB', 'Redis', 'Next.js', 'Rust', 'Go', 'Git',
    'GraphQL', 'PostgreSQL', 'Firebase', 'Kubernetes', 'Svelte', 'AI'
];

let points = [];
const radius = 250;
let angleX = 0.002;
let angleY = 0.002;

// 1. Create 3D coordinates using Fibonacci Sphere
function init() {
    points = [];
    for (let i = 0; i < tags.length; i++) {
        const phi = Math.acos(-1 + (2 * i) / tags.length);
        const theta = Math.sqrt(tags.length * Math.PI) * phi;

        points.push({
            text: tags[i],
            x: Math.cos(theta) * Math.sin(phi) * radius,
            y: Math.sin(theta) * Math.sin(phi) * radius,
            z: Math.cos(phi) * radius
        });
    }
}

// 2. Rotate points in 3D space
function rotatePoints() {
    points.forEach(p => {
        // Rotate around X axis
        let y1 = p.y * Math.cos(angleX) - p.z * Math.sin(angleX);
        let z1 = p.y * Math.sin(angleX) + p.z * Math.cos(angleX);
        // Rotate around Y axis
        let x2 = p.x * Math.cos(angleY) - z1 * Math.sin(angleY);
        let z2 = p.x * Math.sin(angleY) + z1 * Math.cos(angleY);

        p.x = x2; p.y = y1; p.z = z2;
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    rotatePoints();

    // Z-sorting: draw far points first
    points.sort((a, b) => b.z - a.z);

    points.forEach(p => {
        // Perspective projection
        const perspective = 500 / (500 + p.z);
        const x = cx + p.x * perspective;
        const y = cy + p.y * perspective;

        // Depth-based alpha fading
        const alpha = (p.z + radius) / (2 * radius);
        const size = 16 * perspective;

        ctx.font = `bold ${size}px Inter`;
        ctx.fillStyle = `rgba(99, 102, 241, ${alpha + 0.2})`;
        ctx.textAlign = 'center';
        ctx.fillText(p.text, x, y);
    });

    requestAnimationFrame(draw);
}

// Mouse interaction to change rotation direction
window.addEventListener('mousemove', (e) => {
    angleY = (e.clientX - canvas.width / 2) * 0.00002;
    angleX = (e.clientY - canvas.height / 2) * 0.00002;
});

init();
draw();
