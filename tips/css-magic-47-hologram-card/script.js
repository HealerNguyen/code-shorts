function initHologramCard(wrapperId, glareId) {
    const wrapper = document.getElementById(wrapperId);
    const glare = document.getElementById(glareId);

    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();

        // Calculate mouse position relative to card center
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation angles (max 20 degrees)
        const rotateX = ((y - centerY) / centerY) * -20;
        const rotateY = ((x - centerX) / centerX) * 20;

        // Apply rotation to card
        wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Calculate hologram glare position
        const glareX = (x / rect.width) * 100 - 50; // -50% to 50%
        const glareY = (y / rect.height) * 100 - 50;
        glare.style.transform = `translate(${glareX}%, ${glareY}%)`;
    });

    // On mouse leave, card smoothly returns to neutral position
    wrapper.addEventListener('mouseleave', () => {
        wrapper.style.transition = 'transform 0.5s ease-out';
        glare.style.transition = 'transform 0.5s ease-out';

        wrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
        glare.style.transform = `translate(0%, 0%)`;

        // Reset transition for smooth re-entry
        setTimeout(() => {
            wrapper.style.transition = 'transform 0.1s';
            glare.style.transition = 'transform 0.1s';
        }, 500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initHologramCard('wrapper', 'glare');
});
