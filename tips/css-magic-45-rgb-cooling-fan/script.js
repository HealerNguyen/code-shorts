function boostFan() {
    const frame = document.getElementById('fan-frame');
    frame.classList.add('boosted');
}

function resetFan() {
    const frame = document.getElementById('fan-frame');
    frame.classList.remove('boosted');
}
