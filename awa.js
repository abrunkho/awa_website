// JS: Scroll detection

// Wait for the intro animation to finish (4 seconds)
window.addEventListener("load", () => {
    setTimeout(() => {
        document.body.classList.add("intro-complete");
    }, 4000);
});

// Scroll detection below
window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
});

let slideIndex = 0;
let isPaused = false;
let timeoutId;

showSlides();

function currentSlide(n) {
    isPaused = true;
    clearTimeout(timeoutId);
    showSlides(slideIndex = n);
    document.getElementById("pauseBtn").textContent = "▶";  // show play symbol
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");

    // If a specific slide number was passed in, use it
    if (typeof n === "number") {
        slideIndex = n;
    } else {
        // Otherwise this is an auto-advance call
        slideIndex++;
    }

    // Wrap around
    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slideIndex < 1) { slideIndex = slides.length; }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Deactivate all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show current slide + activate dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Auto-advance if not paused
    if (!isPaused) {
        timeoutId = setTimeout(() => showSlides(), 7000); // Change slide every x seconds
    }
}

// Pause/Play button logic
document.getElementById("pauseBtn").addEventListener("click", function () {
    if (isPaused) {
        // Resume slideshow
        isPaused = false;
        this.textContent = "⏸";
        timeoutId = setTimeout(showSlides, 1000);
    } else {
        // Pause slideshow
        isPaused = true;
        this.textContent = "▶";
        clearTimeout(timeoutId);
    }
});
