document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hero-background-video');
    const centeredText = document.getElementById('centered-text');
    const locationBox = document.getElementById('location-box');
    const hero = document.getElementById('hero');
    const heroContentSticky = document.querySelector('.hero-content-sticky');
    const welcomeText = document.querySelector('.welcome-text');
    const welcomePhotos = document.querySelectorAll('.welcome-photo-placeholder');
    const newsletterText = document.querySelector('.vertical-newsletter-text');
    const arrowSymbol = document.querySelector('.arrow-circle-symbol');
    const rectanglesContainer = document.querySelector('.rectangles-container');

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

    // When video starts playing, wait 1 second and then show the text
    video.addEventListener('play', () => {
        setTimeout(() => {
            centeredText.classList.add('fade-in');
            locationBox.classList.add('fade-in');
        }, 1000); // 1000 milliseconds = 1 second
    });

    const massRectangle = document.getElementById('mass-rectangle');
    const confessionRectangle = document.getElementById('confession-rectangle');
    const adorationRectangle = document.getElementById('adoration-rectangle');

    const otherRectangles = [confessionRectangle, adorationRectangle];

    otherRectangles.forEach(rect => {
        rect.addEventListener('mouseenter', () => {
            massRectangle.classList.remove('open');
            massRectangle.classList.add('closed');
            rect.classList.add('open');
            rect.classList.remove('closed');
        });
        rect.addEventListener('mouseleave', () => {
            rect.classList.remove('open');
            rect.classList.add('closed');
            massRectangle.classList.add('open');
            massRectangle.classList.remove('closed');
        });
    });

    const container = document.querySelector('.container');

    container.addEventListener('scroll', () => {
        const scrollTop = container.scrollTop;
        const maxScrollForScale = 300; // The scroll distance over which the text scales down
        const startScrollForTranslate = 300; // The scroll position at which the text starts moving up

        let scale = 1;
        let translateY = 0;

        if (scrollTop <= maxScrollForScale) {
            // Part 1: Scaling down
            scale = 1 - (scrollTop / (maxScrollForScale * 2)); // Scale from 1 to 0.5
        } else {
            // Part 1 is done, keep scale at 0.5
            scale = 0.5;
            // Part 2: Moving up
            translateY = -(scrollTop - startScrollForTranslate) * 5;
        }

        heroContentSticky.style.transform = `scale(${scale}) translateY(${translateY}px)`;

        if (scrollTop >= 500) {
            welcomeText.classList.add('visible');
            welcomePhotos.forEach(photo => photo.classList.add('visible'));
        } else {
            welcomeText.classList.remove('visible');
            welcomePhotos.forEach(photo => photo.classList.remove('visible'));
        }

        const rectanglesBottom = rectanglesContainer.offsetTop + rectanglesContainer.offsetHeight;

        if (scrollTop > rectanglesBottom) {
            newsletterText.classList.add('newsletter-animate');
            arrowSymbol.classList.add('hidden');
        } else {
            newsletterText.classList.remove('newsletter-animate');
            arrowSymbol.classList.remove('hidden');
        }
    });

    const massTimesLink = document.querySelector('a[href="#mass-times-section"]');
    const massTimesSection = document.getElementById('mass-times-section');

    massTimesLink.addEventListener('click', (event) => {
        event.preventDefault();

        const containerRect = container.getBoundingClientRect();
        const sectionRect = massTimesSection.getBoundingClientRect();

        const offsetTop = sectionRect.top - containerRect.top + container.scrollTop;
        const containerHeight = container.clientHeight;
        const sectionHeight = massTimesSection.clientHeight;

        const scrollToPosition = offsetTop - (containerHeight / 2) + (sectionHeight / 2);

        container.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
        });
    });

    // --- UPDATED FUNCTION FOR COLLECTION FOLDER ---
    async function loadNewsletterItems() {
        const newsletterContent = document.querySelector('.newsletter-content');
        if (!newsletterContent) return;

        newsletterContent.innerHTML = '';

        // We will try to fetch items named 1.json, 2.json, etc.
        // This matches the "Collection" style where every card is a file.
        for (let i = 1; i <= 20; i++) {
            try {
                const response = await fetch(`content/newsletter/${i}.json`);
                
                // If file doesn't exist, stop the loop (or skip)
                if (!response.ok) continue; 

                const item = await response.json();

                const rect = document.createElement('div');
                rect.classList.add('newsletter-rectangle');
                
                rect.style.backgroundColor = item.backgroundColor || '#ffffff';
                rect.style.color = item.textColor || '#000000';
                rect.style.fontFamily = item.fontFamily || 'sans-serif';
                rect.style.fontSize = item.fontSize || '1rem';
                
                rect.innerHTML = item.text;
                
                newsletterContent.appendChild(rect);
            } catch (error) {
                // Ignore errors for missing files
            }
        }
    }

    loadNewsletterItems();
});
