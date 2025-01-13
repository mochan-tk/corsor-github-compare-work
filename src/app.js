const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

let ripples = [];
const maxRippleSize = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 0.4;

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 0;
        this.opacity = 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        this.size += 2;
        this.opacity -= 0.01;
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }

    isAlive() {
        return this.opacity > 0 && this.size < maxRippleSize;
    }
}

function createRipple(x, y) {
    for (let i = 0; i < 3; i++) {
        ripples.push(new Ripple(x, y));
    }
}

function handleMouseMove(event) {
    createRipple(event.clientX, event.clientY);
}

function handleTouch(event) {
    event.preventDefault();
    const touch = event.touches[0];
    createRipple(touch.clientX, touch.clientY);
}

function animate() {
    ctx.fillStyle = 'rgba(17, 17, 17, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ripples = ripples.filter(ripple => ripple.isAlive());
    ripples.forEach(ripple => {
        ripple.update();
        ripple.draw();
    });

    requestAnimationFrame(animate);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('touchstart', handleTouch);
window.addEventListener('touchmove', handleTouch);

resizeCanvas();
for (let i = 0; i < 5; i++) {
    createRipple(Math.random() * canvas.width, Math.random() * canvas.height);
}
animate();