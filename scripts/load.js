document.body.style.overflow = "hidden";

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");

        loader.addEventListener("transitionend", () => {
            loader.remove();

            document.body.style.overflow = "";

            const popups = document.querySelectorAll(".popup");
            popups.forEach((popup, index) => {
                setTimeout(() => {
                    popup.classList.add("show");
                }, index * 50);
            });
        }, { once: true });

    }, 2000);
});

// initialize Lenis smooth scroll
const lenis = new Lenis({
    duration: 1.5,        // how long the scroll glide lasts
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // ease out feel
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);