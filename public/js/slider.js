document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slider = carousel.querySelector('.list');
    const slides = carousel.querySelectorAll('.item');
    const navLinks = document.querySelectorAll('.slider-nav a');
    const totalSlides = slides.length;
    let index = 0;

    function updateNav() {
        navLinks.forEach((link, idx) => {
            if (idx === index) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function showNextSlide() {
        index = (index + 1) % totalSlides;
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${index * 100}%)`;
        updateNav();
    }

    function showSlide(idx) {
        index = idx;
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${index * 100}%)`;
        updateNav();
    }

    navLinks.forEach((link, idx) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(idx);
        });
    });

    setInterval(showNextSlide, 10000); // change slide every 10 s
    updateNav(); 
});
