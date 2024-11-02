class BackgroundEffect {
    constructor() {
        this.canvas = document.getElementById('particles-bg');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const numberOfParticles = Math.min(
            Math.floor((this.canvas.width * this.canvas.height) / 20000),
            100
        );

        for (let i = 0; i < numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.particles = [];
            this.createParticles();
        });

        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`; // Purple color
        this.ctx.fill();
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            // Mouse interaction
            const dx = this.mousePosition.x - particle.x;
            const dy = this.mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 100;
                particle.speedX -= Math.cos(angle) * force * 0.02;
                particle.speedY -= Math.sin(angle) * force * 0.02;
            }

            // Add some randomness to movement
            particle.speedX += (Math.random() - 0.5) * 0.01;
            particle.speedY += (Math.random() - 0.5) * 0.01;

            // Limit speed
            const maxSpeed = 0.5;
            const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
            if (speed > maxSpeed) {
                particle.speedX = (particle.speedX / speed) * maxSpeed;
                particle.speedY = (particle.speedY / speed) * maxSpeed;
            }
        });
    }

    animate() {
        if (document.visibilityState === 'visible') {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.updateParticles();
            this.drawConnections();
            this.particles.forEach(particle => this.drawParticle(particle));
        }
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BackgroundEffect();
}); 