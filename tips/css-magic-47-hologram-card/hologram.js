// 3D Tilt: Calculate rotation from mouse position
const rotateX = ((y - centerY) / centerY) * -20;
const rotateY = ((x - centerX) / centerX) * 20;
wrapper.style.transform =
  `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

// Hologram Glare: Moves with cursor
const glareX = (x / rect.width) * 100 - 50;
glare.style.transform = `translate(${glareX}%, ${glareY}%)`;

// Glass Effect (CSS)
// backdrop-filter: blur(15px);
// mix-blend-mode: overlay; /* Rainbow glare */
