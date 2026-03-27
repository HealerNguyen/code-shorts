// AbortController — cancel previous fetch on new input

const searchInput = document.getElementById('searchInput');
const statusBar = document.getElementById('statusBar');
const statusText = statusBar.querySelector('.status-text');
const requestLog = document.getElementById('requestLog');

let currentController = null;
let requestId = 0;

function setStatus(type, text) {
    statusBar.className = 'status-bar ' + type;
    statusText.textContent = text;
}

function addLog(id, query, state) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${state}`;
    entry.id = `log-${id}`;

    const icons = { pending: '⏳', success: '✅', cancelled: '🛑' };
    entry.innerHTML = `<span class="log-icon">${icons[state]}</span> #${id} "${query}"`;

    requestLog.appendChild(entry);
    requestLog.scrollTop = requestLog.scrollHeight;
    return entry;
}

function updateLog(id, state) {
    const entry = document.getElementById(`log-${id}`);
    if (!entry) return;
    entry.className = `log-entry ${state}`;

    const icons = { pending: '⏳', success: '✅', cancelled: '🛑' };
    const icon = entry.querySelector('.log-icon');
    if (icon) icon.textContent = icons[state];
}

async function handleSearch(query) {
    // Abort previous request
    if (currentController) {
        currentController.abort();
    }

    const id = ++requestId;
    const controller = new AbortController();
    currentController = controller;

    addLog(id, query, 'pending');
    setStatus('fetching', `Fetching #${id} — "${query}"...`);

    try {
        // Simulate network request with delay
        await new Promise((resolve, reject) => {
            const timer = setTimeout(resolve, 1500);
            controller.signal.addEventListener('abort', () => {
                clearTimeout(timer);
                reject(new DOMException('Aborted', 'AbortError'));
            });
        });

        updateLog(id, 'success');
        setStatus('success', `#${id} completed ✓`);
    } catch (e) {
        if (e.name === 'AbortError') {
            updateLog(id, 'cancelled');
            setStatus('cancelled', `#${id} cancelled — new request started`);
        }
    }
}

let debounceTimer;
searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();

    if (!query) {
        if (currentController) currentController.abort();
        setStatus('', 'Idle — waiting for input');
        return;
    }

    debounceTimer = setTimeout(() => handleSearch(query), 200);
});
