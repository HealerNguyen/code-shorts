const colors = ['#a855f7', '#06b6d4', '#ec4899', '#fbbf24', '#22c55e', '#f97316'];
const container = document.getElementById('confetti');

for (let i = 0; i < 60; i++) {
    const piece = document.createElement('span');
    piece.className = 'piece';
    piece.style.cssText = `
        --x: ${(Math.random() * 100).toFixed(1)}vw;
        --w: ${(6 + Math.random() * 10).toFixed(1)}px;
        --color: ${colors[Math.floor(Math.random() * colors.length)]};
        --dur: ${(3 + Math.random() * 4).toFixed(2)}s;
        --delay: -${(Math.random() * 6).toFixed(2)}s;
    `;
    container.appendChild(piece);
}
