document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('backgroundCanvas');
    if (!canvas) return; // Do not run if canvas is not present
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const colors = ['#FFD700', '#FFC300', '#FFBF00', '#F9A602', '#C5A334', '#DAA520', '#FFA500', '#FFC107', '#FFB300', '#FFAB00', '#FFC400', '#FFCA28', '#FFD600', '#FFEA00', '#F4D03F', '#4169E1', '#1E90FF', '#6495ED'];
    const numberOfCrosses = 200;
    const crosses = [];

    class Cross {
        constructor() {
            this.reset();
            this.x = Math.random() * canvas.width; // Start at a random x position
            this.y = Math.random() * canvas.height; // Start at a random y position
        }

        reset() {
            this.x = Math.random() * -canvas.width; // Start off-screen to the left
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 20 + 10; // Random size
            this.vx = Math.random() * 0.5 + 0.2; // Horizontal velocity
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.3 + 0.1; // Low opacity
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.size / 10;
            ctx.beginPath();
            // Vertical line (longer bottom arm)
            ctx.moveTo(this.x, this.y - this.size * 0.4); // Top of vertical line
            ctx.lineTo(this.x, this.y + this.size * 0.6); // Bottom of vertical line
            // Horizontal line (centered on the top part of the vertical line)
            ctx.moveTo(this.x - this.size * 0.25, this.y - this.size * 0.1);
            ctx.lineTo(this.x + this.size * 0.25, this.y - this.size * 0.1);
            ctx.stroke();
            ctx.restore();
        }

        update() {
            this.x += this.vx;
            if (this.x > canvas.width + this.size) {
                this.reset();
            }
        }
    }

    for (let i = 0; i < numberOfCrosses; i++) {
        crosses.push(new Cross());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const cross of crosses) {
            cross.update();
            cross.draw();
        }

        requestAnimationFrame(animate);
    }

    animate();
});
