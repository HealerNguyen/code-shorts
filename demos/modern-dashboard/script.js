document.addEventListener('DOMContentLoaded', () => {
    // 1. Configure gradient color for Chart.js to create a "Premium" feel (Modern Web Design)
    const ctx = document.getElementById('revenueChart').getContext('2d');

    // Create Linear Gradient under the line chart
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, 'rgba(99, 102, 241, 0.4)'); // Indigo 500
    gradientFill.addColorStop(1, 'rgba(99, 102, 241, 0)');

    // 2. Create line chart
    const revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [{
                label: 'Revenue ($)',
                data: [42000, 38000, 55000, 48000, 68000, 72000, 64000, 85000, 92000, 110000],
                borderColor: '#6366f1',
                borderWidth: 3,
                backgroundColor: gradientFill,
                fill: true,
                pointBackgroundColor: '#0f172a',
                pointBorderColor: '#6366f1',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4 // Smooth line
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Hide legend to make UI cleaner
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                    titleColor: '#94a3b8',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false,
                    },
                    ticks: {
                        color: '#94a3b8',
                        callback: function (value) {
                            return '$' + value / 1000 + 'k'; // Format $10k, $20k...
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });


    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 4. Custom Select Logic
    const customSelect = document.getElementById('timeFilter');
    const selected = customSelect.querySelector('.select-selected');
    const items = customSelect.querySelector('.select-items');
    const options = customSelect.querySelectorAll('.select-items div');

    selected.addEventListener('click', function (e) {
        e.stopPropagation();
        closeAllSelect(this);
        items.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
    });

    options.forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            // Update selected text
            const textHTML = this.innerHTML;
            selected.innerHTML = textHTML + ' <i class="ph ph-caret-down"></i>';

            // Remove active class from all options
            options.forEach(opt => opt.classList.remove('same-as-selected'));
            // Add active class to current option
            this.classList.add('same-as-selected');

            // Close dropdown
            items.classList.add('select-hide');
            selected.classList.remove('select-arrow-active');
        });
    });

    function closeAllSelect(elmnt) {
        const selects = document.querySelectorAll('.select-selected');
        const itemsLists = document.querySelectorAll('.select-items');

        selects.forEach(sel => {
            if (elmnt !== sel) {
                sel.classList.remove('select-arrow-active');
            }
        });

        itemsLists.forEach(list => {
            if (elmnt !== list.previousElementSibling) {
                list.classList.add('select-hide');
            }
        });
    }

    document.addEventListener('click', function () {
        closeAllSelect();
    });

    // 5. Modal Logic
    const premiumCard = document.getElementById('upgradeBtn');
    const modalOverlay = document.getElementById('upgradeModal');
    const closeModalBtn = document.getElementById('closeModal');

    premiumCard.addEventListener('click', () => {
        modalOverlay.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

});
