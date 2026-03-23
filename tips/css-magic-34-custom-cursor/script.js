const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Dot follows exactly
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

// Ring lerps behind (smooth lag)
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effects
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.classList.add('hovering');
    ring.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    dot.classList.remove('hovering');
    ring.classList.remove('hovering');
  });
});
