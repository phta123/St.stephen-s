function fitLayoutToScreen() {
    const designWidth = 1920;
    const currentWidth = window.innerWidth;
    const scaleRatio = currentWidth / designWidth;
    document.body.style.zoom = scaleRatio;
}

document.addEventListener('DOMContentLoaded', () => {
    fitLayoutToScreen();
    window.addEventListener('resize', fitLayoutToScreen);

    // --- BENTO STRUCTURE GENERATORS ---
    const createBentoLayout = (title, intro, imgUrl, quote, quoteSource, detailsHTML) => {
        return `
            <div class="sacrament-bento-grid">
                <div class="bento-box hero-box">
                    <h2>${title}</h2>
                    <p>${intro}</p>
                </div>
                
                <div class="bento-box img-box">
                    <img src="${imgUrl}" alt="${title}">
                </div>

                <div class="bento-box detail-box">
                    ${detailsHTML}
                </div>

                <div class="bento-box quote-box">
                    <blockquote>"${quote}"</blockquote>
                    <cite>${quoteSource}</cite>
                </div>
            </div>
        `;
    };

    // --- Data: Sacrament Content (Structured for Bento) ---
    const sacramentData = {
        baptism: createBentoLayout(
            "Holy Baptism",
            "The gateway to life in the Spirit and the door to other sacraments.",
            "image/baptism.jpg",
            "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
            "Matthew 28:19",
            `
            <h3>Foundations</h3>
            <p>Through Baptism we are freed from sin and reborn as sons of God; we become members of Christ and are incorporated into the Church.</p>
            <h3>Key Aspects</h3>
            <ul>
                <li><strong>Regeneration:</strong> A washing of renewal by the Holy Spirit.</li>
                <li><strong>The Rite:</strong> To "baptize" (Greek: <em>baptizein</em>) means to plunge or immerse.</li>
                <li><strong>Effect:</strong> Forgiveness of original and personal sin, and becoming a new creature in Christ.</li>
            </ul>
            `
        ),
        confirmation: createBentoLayout(
            "Confirmation",
            "Completion of baptismal grace and the seal of the Holy Spirit.",
            "image/Logo1.png",
            "You shall receive power when the Holy Spirit has come upon you.",
            "Acts 1:8",
            `
            <h3>The Seal of the Spirit</h3>
            <p>Confirmation binds the baptized more perfectly to the Church and enriches them with a special strength of the Holy Spirit.</p>
            <h3>Effects</h3>
            <ul>
                <li><strong>Deepening:</strong> Roots us more deeply in divine filiation.</li>
                <li><strong>Union:</strong> Unites us more firmly to Christ.</li>
                <li><strong>Mission:</strong> Gives us strength to spread and defend the faith by word and action.</li>
            </ul>
            `
        ),
        eucharist: createBentoLayout(
            "The Eucharist",
            "The source and summit of the Christian life.",
            "image/Mass.jpg",
            "This is my body given for you; do this in remembrance of me.",
            "Luke 22:19",
            `
            <h3>The Sacramental Sacrifice</h3>
            <p>In the blessed Eucharist is contained the whole spiritual good of the Church, namely Christ himself.</p>
            <h3>Dimensions</h3>
            <ul>
                <li><strong>Thanksgiving:</strong> Praise to the Father for all creation.</li>
                <li><strong>Memorial:</strong> The sacrificial memorial of Christ's death and resurrection.</li>
                <li><strong>Presence:</strong> Christ is present by the power of his word and Spirit.</li>
            </ul>
            `
        ),
        penance: createBentoLayout(
            "Reconciliation",
            "Restoring us to God's grace and joining us with Him in intimate friendship.",
            "image/confession.jpeg",
            "Whose sins you forgive are forgiven them.",
            "John 20:23",
            `
            <h3>The Acts of the Penitent</h3>
            <p>The new life received in initiation has not abolished the frailty of human nature. We are called to constant conversion.</p>
            <h3>Essential Elements</h3>
            <ul>
                <li><strong>Contrition:</strong> Sorrow of the soul and detestation of sin.</li>
                <li><strong>Confession:</strong> Disclosure of sins to a priest.</li>
                <li><strong>Satisfaction:</strong> Penance to repair the harm caused by sin.</li>
            </ul>
            `
        ),
        anointing: createBentoLayout(
            "Anointing of the Sick",
            "Commending those who are ill to the suffering and glorified Lord.",
            "image/Logo1.png",
            "Is any among you sick? Let him call for the elders of the church.",
            "James 5:14",
            `
            <h3>Grace for the Sick</h3>
            <p>This sacrament is not only for those at the point of death, but for anyone in danger of death from sickness or old age.</p>
            <h3>Effects</h3>
            <ul>
                <li><strong>Strengthening:</strong> Peace and courage to endure suffering.</li>
                <li><strong>Union:</strong> Uniting the sick person to the Passion of Christ.</li>
                <li><strong>Preparation:</strong> A final fortification for the journey home.</li>
            </ul>
            `
        ),
        'holy-orders': createBentoLayout(
            "Holy Orders",
            "The mission entrusted by Christ to his apostles continues to be exercised.",
            "image/Logo1.png",
            "Follow me, and I will make you fishers of men.",
            "Matthew 4:19",
            `
            <h3>Apostolic Ministry</h3>
            <p>Through the ordained ministry, especially that of bishops and priests, the presence of Christ as head of the Church is made visible.</p>
            <h3>Three Degrees</h3>
            <ul>
                <li><strong>Episcopate:</strong> Bishops (Fullness of Orders).</li>
                <li><strong>Presbyterate:</strong> Priests (Co-workers of the Bishop).</li>
                <li><strong>Diaconate:</strong> Deacons (Service).</li>
            </ul>
            `
        ),
        matrimony: createBentoLayout(
            "Matrimony",
            "A partnership of the whole of life raised to the dignity of a sacrament.",
            "image/Logo1.png",
            "What therefore God has joined together, let no man put asunder.",
            "Matthew 19:6",
            `
            <h3>The Covenant</h3>
            <p>God who created man out of love also calls him to love. The vocation to marriage is written in the very nature of man and woman.</p>
            <h3>Grace of the Sacrament</h3>
            <ul>
                <li><strong>Perfection:</strong> Perfects the couple's love.</li>
                <li><strong>Unity:</strong> Strengthens their indissoluble unity.</li>
                <li><strong>Sanctification:</strong> Helps them attain holiness in married life.</li>
            </ul>
            `
        )
    };

    // --- Interactive Logic ---
    
    const modalOverlay = document.getElementById('sacrament-modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('close-modal-btn');
    const squares = document.querySelectorAll('.sacrament-square');

    // Open Modal
    squares.forEach(square => {
        square.addEventListener('click', () => {
            const id = square.getAttribute('data-id');
            const content = sacramentData[id];
            
            if (content) {
                modalBody.innerHTML = content;
                modalOverlay.classList.remove('hidden');
                setTimeout(() => modalOverlay.classList.add('active'), 10);
            }
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        setTimeout(() => modalOverlay.classList.add('hidden'), 400);
    };

    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) { closeModal(); }
    });

    // Video & Parallax Logic
    const video = document.getElementById('hero-background-video');
    const heroText = document.getElementById('hero-main-text');
    const nav = document.getElementById('glass-nav');
    
    video.addEventListener('timeupdate', () => {
        if (video.currentTime < 1) { video.playbackRate = 1; }
    });

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (heroText) {
            heroText.style.transform = `translateY(-${scrollY * 0.5}px)`;
            heroText.style.opacity = 1 - (scrollY / 600);
        }
        if (scrollY > 100) {
            nav.style.background = 'rgba(11, 30, 59, 0.9)';
            nav.style.borderColor = 'rgba(212, 175, 55, 0.3)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.05)';
            nav.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });

    // Mass Card Expansion
    const rectangles = document.querySelectorAll('.expandable-rectangle');
    rectangles.forEach(rect => {
        rect.addEventListener('mouseenter', () => {
            rectangles.forEach(r => { r.classList.remove('open'); r.classList.add('closed'); });
            rect.classList.remove('closed'); rect.classList.add('open');
        });
    });

    // Verse Generator
    const verses = [
        "Matthew 26:26: Take, eat; this is my body.",
        "John 6:54: Whoever eats my flesh and drinks my blood has eternal life.",
        "1 Corinthians 11:24: Do this in remembrance of me."
    ];
    const eucharistVerse = document.getElementById('eucharist-verse');
    if (eucharistVerse) {
        const randomIndex = Math.floor(Math.random() * verses.length);
        let verseText = verses[randomIndex];
        const verseReferenceRegex = /([A-Za-z0-9\s]+:\d+(-\d+)?)/; 
        verseText = verseText.replace(verseReferenceRegex, '<span class="verse-reference-box">$&</span>');
        eucharistVerse.innerHTML = verseText;
    }
});