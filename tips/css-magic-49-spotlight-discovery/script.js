window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    document.documentElement.style.setProperty('--x', `${clientX}px`);
    document.documentElement.style.setProperty('--y', `${clientY}px`);
});
