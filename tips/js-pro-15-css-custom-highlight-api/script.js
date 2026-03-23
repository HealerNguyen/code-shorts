// CSS Custom Highlight API — Chrome 105+, Edge 105+
// Highlights text ranges without modifying the DOM

const content = document.getElementById('content');
const searchInput = document.getElementById('searchInput');
const matchInfo = document.getElementById('matchInfo');

function highlight(query) {
    // Clear previous highlights
    CSS.highlights.clear();
    matchInfo.textContent = '';
    matchInfo.classList.remove('has-results');

    if (!query.trim()) return;

    const text = content.textContent;
    const lower = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    const ranges = [];
    let start = 0;

    // Find all occurrences
    while (true) {
        const idx = lower.indexOf(lowerQuery, start);
        if (idx === -1) break;

        // Walk the DOM to find the exact text node and offset
        const range = findRange(content, idx, idx + query.length);
        if (range) ranges.push(range);

        start = idx + 1;
    }

    if (ranges.length === 0) {
        matchInfo.textContent = 'No matches';
        return;
    }

    // Register highlight
    const searchHighlight = new Highlight(...ranges);
    CSS.highlights.set('search-result', searchHighlight);

    matchInfo.textContent = `${ranges.length} match${ranges.length !== 1 ? 'es' : ''} found`;
    matchInfo.classList.add('has-results');
}

function findRange(root, startOffset, endOffset) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let charCount = 0;
    let startNode = null, startOff = 0, endNode = null, endOff = 0;

    while (walker.nextNode()) {
        const node = walker.currentNode;
        const len = node.textContent.length;

        if (!startNode && charCount + len > startOffset) {
            startNode = node;
            startOff = startOffset - charCount;
        }
        if (!endNode && charCount + len >= endOffset) {
            endNode = node;
            endOff = endOffset - charCount;
            break;
        }
        charCount += len;
    }

    if (!startNode || !endNode) return null;

    const range = new Range();
    range.setStart(startNode, startOff);
    range.setEnd(endNode, endOff);
    return range;
}

searchInput.addEventListener('input', (e) => highlight(e.target.value));
