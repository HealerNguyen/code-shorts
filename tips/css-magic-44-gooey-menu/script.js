function toggleMenu() {
    const container = document.getElementById('gooey-container');
    container.classList.toggle('open');
}

function resetMenu() {
    const container = document.getElementById('gooey-container');
    container.classList.remove('open');
}
