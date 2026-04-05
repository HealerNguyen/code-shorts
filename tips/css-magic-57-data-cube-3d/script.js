const scene = document.getElementById('scene');
let isDragging = false;
let startX, startY;
let rotateX = 0, rotateY = 0;

// Mouse interaction to rotate the cube
document.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    scene.style.animation = 'none'; // Tắt auto-rotate khi kéo
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    rotateY += dx * 0.5;
    rotateX -= dy * 0.5;

    // Apply rotation to the scene
    scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});
