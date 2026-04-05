const container = document.getElementById('container');
const card = document.getElementById('card');

container.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = container.getBoundingClientRect();

    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    const rotateX = y * -30;
    const rotateY = x * 30;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

container.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
});
