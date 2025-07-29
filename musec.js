document.addEventListener('DOMContentLoaded', () => {
    const scrollWrapper = document.querySelector('.studio-listings-scroll-wrapper');
    const studioListings = document.querySelectorAll('.studio-listing');
    const itemHeight = studioListings.length > 0 ? studioListings[0].offsetHeight + 15 : 0;

    let isScrolling;

    scrollWrapper.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const scrollY = scrollWrapper.scrollTop;
            const currentIndex = Math.round(scrollY / itemHeight);
            const targetScrollTop = currentIndex * itemHeight;
            scrollToPosition(scrollWrapper, targetScrollTop, 400);
        }, 150);
    });

    function scrollToPosition(element, to, duration) {
        const start = element.scrollTop;
        const change = to - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = function() {
            currentTime += increment;
            const val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        };
        animateScroll();
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
});
