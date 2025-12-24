// Animated Counter for Hero Section
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Initialize counters when page loads
document.addEventListener('DOMContentLoaded', function() {
    const startupsCount = document.getElementById('startups-count');
    const fundingCount = document.getElementById('funding-count');
    const mentorsCount = document.getElementById('mentors-count');
    
    if (startupsCount) animateCounter(startupsCount, 42);
    if (fundingCount) animateCounter(fundingCount, 850000000); // 850M TZS
    if (mentorsCount) animateCounter(mentorsCount, 28);
});
