// Programmatic key press for demo.html
function pressKey(id, duration = 200) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('pressed');
    return new Promise(r => setTimeout(() => {
        el.classList.remove('pressed');
        r();
    }, duration));
}
