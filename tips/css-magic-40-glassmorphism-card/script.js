// Optional: subtle parallax on mouse move
const card = document.querySelector('.glass-card');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
});

document.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
});
