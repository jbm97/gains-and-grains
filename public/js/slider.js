document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const slider = carousel.querySelector(".list");
    const slides = carousel.querySelectorAll(".item");
    const navLinks = document.querySelectorAll(".slider-nav a");
    const totalSlides = slides.length;
    let index = 0;

    function updateNav() {
        navLinks.forEach((link, idx) => {
            if (idx === index) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    function updateSlides() {
        slides.forEach((slide, idx) => {
            if (idx === index) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });
    }

    function showNextSlide() {
        index = (index + 1) % totalSlides;
        updateNav();
        updateSlides();
    }

    function showSlide(idx) {
        index = idx;
        updateNav();
        updateSlides();
    }

    navLinks.forEach((link, idx) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            showSlide(idx);
        });
    });

    setInterval(showNextSlide, 15000);
    updateNav();
    updateSlides();
});
