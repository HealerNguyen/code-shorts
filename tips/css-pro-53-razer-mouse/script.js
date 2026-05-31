// Programmatic key press for demo.html
function pressMouse(id, duration = 200) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('pressed');
    return new Promise(r => setTimeout(() => {
        el.classList.remove('pressed');
        r();
    }, duration));
}

function scrollWheel(duration = 300) {
    const el = document.getElementById('scroll-wheel');
    if (!el) return;
    el.classList.add('scrolled');
    return new Promise(r => setTimeout(() => {
        el.classList.remove('scrolled');
        r();
    }, duration));
}
