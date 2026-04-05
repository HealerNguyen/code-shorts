const wrap = document.querySelector('.magnetic-wrap');
const btn = document.querySelector('.magnetic-btn');
const text = document.querySelector('.btn-text');

const lerp = (current, target, factor) => current * (1 - factor) + target * factor;

let state = { x: 0, y: 0 };
let target = { x: 0, y: 0 };

wrap.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = wrap.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    target.x = x * 0.5;
    target.y = y * 0.5;
});

wrap.addEventListener('mouseleave', () => {
    target.x = 0;
    target.y = 0;
});

const render = () => {
    state.x = lerp(state.x, target.x, 0.1);
    state.y = lerp(state.y, target.y, 0.1);

    const stretchX = 1 + Math.abs(state.x) * 0.002;
    const stretchY = 1 - Math.abs(state.x) * 0.002;

    btn.style.transform = `translate(${state.x}px, ${state.y}px) scale(${stretchX}, ${stretchY})`;
    text.style.transform = `translate(${state.x * 0.2}px, ${state.y * 0.2}px)`;

    requestAnimationFrame(render);
};

render();
