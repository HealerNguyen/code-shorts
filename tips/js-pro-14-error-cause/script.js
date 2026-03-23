// Error Cause — ES2022, supported in all modern browsers + Node 16.9+

// ── Layer 1: low-level error ──
class DatabaseError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'DatabaseError';
    }
}

// ── Layer 2: wrap with cause ──
async function fetchUser(id) {
    try {
        // Simulate DB failure
        throw new DatabaseError(`Connection timeout after 30s`);
    } catch (err) {
        throw new Error(`Failed to fetch user ${id}`, { cause: err });
    }
}

// ── Layer 3: handle and inspect ──
async function loadProfile(userId) {
    try {
        await fetchUser(userId);
    } catch (err) {
        console.error('Top-level error:', err.message);
        console.error('Caused by:', err.cause?.message);
        console.error('Cause type:', err.cause?.name);

        // Walk the full chain:
        let current = err;
        let depth = 0;
        while (current) {
            console.error(`[${depth}] ${current.name}: ${current.message}`);
            current = current.cause;
            depth++;
        }
    }
}

loadProfile(42);
