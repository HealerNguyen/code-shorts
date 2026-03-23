const { createApp, ref, TransitionGroup } = Vue;

let nextId = 5;
const names = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Henry'];

createApp({
    components: { TransitionGroup },
    setup() {
        const items = ref([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Carol' },
            { id: 4, name: 'Dave' },
        ]);

        function addItem() {
            const name = names[nextId % names.length];
            items.value.push({ id: nextId++, name });
        }

        function removeItem(id) {
            items.value = items.value.filter(i => i.id !== id);
        }

        function removeFirst() {
            if (items.value.length) items.value.shift();
        }

        return { items, addItem, removeItem, removeFirst };
    },
    template: `
        <div class="controls">
            <button @click="addItem">+ Add</button>
            <button class="danger" @click="removeFirst">− Remove</button>
        </div>
        <TransitionGroup name="list" tag="ul">
            <li v-for="item in items" :key="item.id">
                {{ item.name }}
                <button class="remove-btn" @click="removeItem(item.id)">✕</button>
            </li>
        </TransitionGroup>
    `
}).mount('#app');
