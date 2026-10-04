document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('sentimentChart');
    if (!canvas) return;

    // Retrieve stats directly from canvas data attributes
    const positive = Number(canvas.dataset.positive) || 0;
    const negative = Number(canvas.dataset.negative) || 0;
    const neutral = Number(canvas.dataset.neutral) || 0;
    const unprocessed = Number(canvas.dataset.unprocessed) || 0;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Positive', 'Negative', 'Neutral', 'Unprocessed'],
            datasets: [{
                data: [positive, negative, neutral, unprocessed],
                backgroundColor: ['#198754', '#dc3545', '#ffc107', '#6c757d']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
});