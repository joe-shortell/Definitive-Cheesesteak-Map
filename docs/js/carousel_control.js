document.addEventListener('click', function (e) {
    if (e.target.classList.contains('next-btn') || e.target.classList.contains('prev-btn')) {
        handleImageChange(e.target);
    }
});

function handleImageChange(button) {
    const container = button.closest('.image-carousel');
    const img = container.querySelector('.carousel-img');
    const images = JSON.parse(container.dataset.images);
    let index = parseInt(container.dataset.index || 0);

    if (button.classList.contains('next-btn')) {
        index = (index + 1) % images.length;
    } else {
        index = (index - 1 + images.length) % images.length;
    }

    container.dataset.index = index;
    img.src = images[index];
}

// Add swipe support
let xStart = null;

document.addEventListener('touchstart', function (e) {
    const container = e.target.closest('.image-carousel');
    if (!container) return;
    xStart = e.touches[0].clientX;
    container.dataset.swipe = "true";
}, false);

document.addEventListener('touchend', function (e) {
    const container = e.target.closest('.image-carousel');
    if (!container || container.dataset.swipe !== "true") return;

    const xEnd = e.changedTouches[0].clientX;
    const diff = xStart - xEnd;

    if (Math.abs(diff) > 30) {
        const direction = diff > 0 ? 'next' : 'prev';
        const button = container.querySelector(direction === 'next' ? '.next-btn' : '.prev-btn');
        if (button) handleImageChange(button);
    }

    container.dataset.swipe = "false";
}, false);
