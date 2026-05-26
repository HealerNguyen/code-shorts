// Interactive Dynamic Island: expand/collapse on click
const island = document.getElementById('island');
let expanded = false;

island.addEventListener('click', () => {
    expanded = !expanded;
    island.style.width = expanded ? '180px' : '60px';
    island.style.height = expanded ? '40px' : '7px';
});
