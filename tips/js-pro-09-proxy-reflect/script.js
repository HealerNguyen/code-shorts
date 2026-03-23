const logEl = document.getElementById('log');

function addLog(type, key, value) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const valPart = value !== undefined
        ? ` <span class="arrow">→</span> <span class="val">${JSON.stringify(value)}</span>`
        : '';
    entry.innerHTML = `<span class="op">${type.toUpperCase()}</span><span class="key">${key}</span>${valPart}`;
    logEl.prepend(entry);
    // keep last 6 entries
    while (logEl.children.length > 6) logEl.removeChild(logEl.lastChild);
}

const handler = {
    get(target, key, receiver) {
        if (typeof key === 'string' && !key.startsWith('_')) {
            addLog('get', key, Reflect.get(target, key, receiver));
        }
        return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
        addLog('set', key, value);
        return Reflect.set(target, key, value, receiver);
    },
    deleteProperty(target, key) {
        addLog('del', key);
        return Reflect.deleteProperty(target, key);
    }
};

const state = new Proxy({}, handler);

// Wire up form inputs
document.querySelectorAll('.proxy-input').forEach(input => {
    input.addEventListener('input', e => {
        state[e.target.dataset.key] = e.target.value;
    });
    input.addEventListener('focus', e => {
        void state[e.target.dataset.key]; // trigger GET
    });
});
