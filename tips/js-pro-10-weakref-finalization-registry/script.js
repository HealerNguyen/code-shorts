const logEl = document.getElementById('log');
const objCard = document.getElementById('objCard');
const derefResult = document.getElementById('derefResult');
const statusBadge = document.getElementById('statusBadge');

function addLog(type, op, msg) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerHTML = `<span class="op">${op}</span><span class="msg">${msg}</span>`;
    logEl.prepend(entry);
    while (logEl.children.length > 6) logEl.removeChild(logEl.lastChild);
}

// Simulated WeakRef lifecycle
let objectAlive = true;

const registry = new FinalizationRegistry(key => {
    addLog('gc', 'GC', `"${key}" garbage collected!`);
});

let obj = { name: 'Alice', role: 'Dev' };
const ref = new WeakRef(obj);
registry.register(obj, 'userObject');

addLog('info', 'NEW', 'WeakRef created — obj alive');
addLog('deref', 'DEREF', `ref.deref()?.name → "Alice"`);

document.getElementById('btnDeref').addEventListener('click', () => {
    if (objectAlive) {
        addLog('deref', 'DEREF', `ref.deref()?.name → "${obj.name}"`);
        derefResult.textContent = `"${obj.name}"`;
        derefResult.style.color = '#34d399';
    } else {
        addLog('deref', 'DEREF', 'ref.deref() → undefined');
        derefResult.textContent = 'undefined';
        derefResult.style.color = '#f87171';
    }
});

document.getElementById('btnGC').addEventListener('click', () => {
    if (!objectAlive) return;
    objectAlive = false;
    obj = null; // release strong reference
    objCard.classList.remove('alive');
    objCard.classList.add('dead');
    statusBadge.className = 'badge dead';
    statusBadge.textContent = '✕ collected';
    addLog('gc', 'GC', 'strong ref released → eligible for GC');
    // FinalizationRegistry fires asynchronously in real JS,
    // simulate the callback here for demo purposes
    setTimeout(() => {
        addLog('gc', 'GC', '"userObject" garbage collected!');
    }, 600);
});
