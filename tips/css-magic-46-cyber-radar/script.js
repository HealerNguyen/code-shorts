function triggerShockwave(radarId, waveId, x, y) {
    const wave = document.getElementById(waveId);
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    wave.classList.remove('shockwave-active');
    void wave.offsetWidth; // Force reflow to restart animation
    wave.classList.add('shockwave-active');
}

function initRadar() {
    const radar = document.getElementById('radar');
    const wave = document.getElementById('wave');

    radar.addEventListener('click', (e) => {
        // Calculate click position for wave center
        const rect = radar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        triggerShockwave('radar', 'wave', x, y);
    });
}

document.addEventListener('DOMContentLoaded', initRadar);
