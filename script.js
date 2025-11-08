document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hero-background-video');
    const centeredText = document.getElementById('centered-text');
    const hero = document.getElementById('hero');

    // Create stars
    const numberOfStars = 100;
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 50}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        hero.appendChild(star);
    }

    const smoothSlowdown = (duration) => {
        let currentTime = 0;
        const interval = 10; // ms

        const timer = setInterval(() => {
            currentTime += interval;
            if (currentTime >= duration) {
                clearInterval(timer);
                video.pause();
            } else {
                video.playbackRate = 1 - (currentTime / duration);
            }
        }, interval);
    };

    video.addEventListener('timeupdate', () => {
        if (video.currentTime < 2) {
            video.playbackRate = 1.5;
        } else if (video.duration - video.currentTime <= 1) {
            smoothSlowdown(1000);
        } else {
            video.playbackRate = 1;
        }
    });

    // When video ends, show the text
    video.addEventListener('ended', () => {
        centeredText.style.opacity = 1;
    });



    const expandableRectangles = document.querySelectorAll('.expandable-rectangle');
    const massRectangle = document.getElementById('mass-rectangle');
    let hoverEnabled = false;

    const handleMouseEnter = (rect) => {
        if (hoverEnabled) {
            expandableRectangles.forEach(r => r.classList.remove('open'));
            rect.classList.add('open');
        }
    };

    const handleMouseLeave = (rect) => {
        if (hoverEnabled) {
            rect.classList.remove('open');
            massRectangle.classList.add('open');
        }
    };

    expandableRectangles.forEach(rect => {
        rect.addEventListener('mouseenter', () => handleMouseEnter(rect));
        rect.addEventListener('mouseleave', () => handleMouseLeave(rect));
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                massRectangle.classList.add('open');
                setTimeout(() => {
                    hoverEnabled = true;
                }, 2000);
            } else {
                massRectangle.classList.remove('open');
                hoverEnabled = false;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('content'));
});
