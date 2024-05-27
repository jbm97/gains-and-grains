document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider img');
    const intervalTime = 7000;
    let currentIndex = 0;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        slider.scrollTo({
            left: slider.clientWidth * currentIndex,
            behavior: 'smooth'
        });
    }

    setInterval(nextSlide, intervalTime);
});