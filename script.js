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

    function loadNewsletterItems() {
        const newsletterContent = document.querySelector('.newsletter-content');
        if (!newsletterContent) return;

        // Clear existing content
        newsletterContent.innerHTML = '';

        fetch('content/newsletter/newsletter.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.items) {
                    data.items.forEach(item => {
                        const rect = document.createElement('div');
                        rect.classList.add('newsletter-rectangle');
                        
                        // Apply styles from CMS
                        rect.style.backgroundColor = item.backgroundColor || '#ffffff';
                        rect.style.color = item.textColor || '#000000';
                        rect.style.fontFamily = item.fontFamily || 'sans-serif';
                        rect.style.fontSize = item.fontSize || '1rem';
                        
                        // Set text
                        rect.innerHTML = item.text;
                        
                        newsletterContent.appendChild(rect);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching newsletter items:', error);
                newsletterContent.innerHTML = '<p>Check back soon for updates.</p>';
            });
    }

    // loadNewsletterItems();

    const verses = [
        "Matthew 26:26-30: Jesus takes bread, gives thanks, breaks it, and says, \"Take, eat; this is my body,\" and takes the cup, saying, \"This is my blood of the covenant, which is poured out for many for the forgiveness of sins\".",
        "Mark 14:22-26: During the meal, Jesus takes bread, gives thanks, breaks it, and says, \"Take it; this is my body.\" He then takes the cup and says, \"This is my blood of the covenant, which is poured out for many\".",
        "Luke 22:14-20: Jesus says, \"This is my body which is given for you. Do this in remembrance of me.\" He then takes the cup and says, \"This cup is the new covenant in my blood, which is poured out for you\".",
        "1 Corinthians 11:23-26: Paul recounts the Lord's Supper, including Jesus's words about his body and blood being given for many, and commands believers to \"do this in remembrance of me\". He also states that \"as often as you eat this bread and drink this cup, you proclaim the death of the Lord until he comes\".",
        "1 Corinthians 10:17: \"Because there is one loaf, we who are many are one body, for we all share in the one loaf\".",
        "John 6:54-57: Jesus states, \"Whoever eats my flesh and drinks my blood has eternal life, and I will raise him on the last day. For my flesh is true food and my blood is true drink\"."
    ];

    const eucharistVerse = document.getElementById('eucharist-verse');
    if (eucharistVerse) {
        const randomIndex = Math.floor(Math.random() * verses.length);
        let verseText = verses[randomIndex];
        const verseReferenceRegex = /([A-Za-z]+\s\d+:\d+(-\d+)?)/; // Matches patterns like "Book 00:00-00" or "Book 00:00"
        verseText = verseText.replace(verseReferenceRegex, '<span class="verse-reference-box">$&</span>');
        eucharistVerse.innerHTML = verseText;
    }
});
