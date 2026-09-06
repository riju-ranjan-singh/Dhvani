gsap.registerPlugin(ScrollTrigger);

// Initialize states
gsap.set("#scene-1", { opacity: 1 });
gsap.set(".z-text", { z: 500, opacity: 0 });
gsap.set("#scene-2", { opacity: 0 });
gsap.set(".orbit-node", { scale: 0, opacity: 0, x: 0, y: 0 });
gsap.set(".core-node", { scale: 0, opacity: 0 });
gsap.set("#scene-3", { opacity: 0 });
gsap.set("#phone-mockup", { y: 800, rotationX: 45, scale: 0.8 });
gsap.set("#phone-text", { opacity: 0, x: 100 });
gsap.set("#scene-4", { opacity: 0 });
gsap.set(".horizontal-track", { x: "50vw" }); // Start off-center
gsap.set("#scene-5", { opacity: 0 });
gsap.set(".monolith-card", { scale: 0.5, rotationY: -45, opacity: 0 });

// Master Timeline tied to scroll
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-spacer",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, 
        pin: "#scroll-timeline"
    }
});

// --- SCENE 1: Z-Axis Typography ---
tl.to("#t1", { z: 0, opacity: 1, duration: 2 }, 0)
  .to("#t1", { z: -500, opacity: 0, duration: 2 }, 2)
  .to("#t2", { z: 0, opacity: 1, duration: 2 }, 1.5)
  .to("#t2", { z: -500, opacity: 0, duration: 2 }, 3.5)
  .to("#t3", { z: 0, opacity: 1, duration: 2 }, 3)
  .to("#t4", { z: 0, opacity: 1, duration: 2 }, 3)
  .to("#scene-1", { opacity: 0, duration: 2 }, 6)

// --- BACKGROUND BLOB MUTATION ---
  .to(".blob-1", { background: "radial-gradient(circle, #ff0055 0%, transparent 70%)", duration: 4 }, 2)
  .to(".blob-2", { background: "radial-gradient(circle, #00f0ff 0%, transparent 70%)", duration: 4 }, 4)

// --- SCENE 2: The Exploding Grid ---
  .to("#scene-2", { opacity: 1, duration: 1 }, 7)
  .to(".core-node", { scale: 1, opacity: 1, duration: 2, ease: "back.out(1.7)" }, 7)
  .to("#node-1", { x: -350, y: -200, scale: 1, opacity: 1, duration: 2, ease: "power3.out" }, 8)
  .to("#node-2", { x: 350, y: -150, scale: 1, opacity: 1, duration: 2, ease: "power3.out" }, 8.2)
  .to("#node-3", { x: -300, y: 250, scale: 1, opacity: 1, duration: 2, ease: "power3.out" }, 8.4)
  .to("#node-4", { x: 350, y: 200, scale: 1, opacity: 1, duration: 2, ease: "power3.out" }, 8.6)
  .to("#scene-2", { opacity: 0, duration: 2 }, 12)

// --- SCENE 3: 3D Phone Mockup ---
  .to("#scene-3", { opacity: 1, duration: 1 }, 13)
  .to("#phone-mockup", { y: 0, rotationX: 0, scale: 1, duration: 3, ease: "power2.out" }, 13)
  .to("#phone-text", { opacity: 1, x: 0, duration: 2, ease: "power2.out" }, 14)
  
  // Parallax rotation on scroll for the phone
  .to("#phone-mockup", { rotationY: 15, rotationX: -10, duration: 4 }, 16)
  
  .to("#scene-3", { opacity: 0, y: -200, duration: 2 }, 20)

// --- SCENE 4: Horizontal Deep Dive ---
  .to("#scene-4", { opacity: 1, duration: 1 }, 21)
  // Translate the horizontal track across the screen
  .to(".horizontal-track", { x: "-150vw", duration: 8, ease: "none" }, 22)
  .to("#scene-4", { opacity: 0, duration: 2 }, 30)

// --- SCENE 5: The Download Monolith ---
  .to("#scene-5", { opacity: 1, duration: 1 }, 31)
  .to(".monolith-card", { scale: 1, rotationY: 0, opacity: 1, duration: 3, ease: "power2.out" }, 31);


// --- MOUSE PARALLAX ON PHONE (when active) ---
document.addEventListener('mousemove', (e) => {
    const phone = document.getElementById('phone-mockup');
    if (phone && getComputedStyle(phone).opacity > 0) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        // Apply slight offset to existing GSAP transform using string manipulation or just direct style
        // For simplicity, we just add a gentle translate
        phone.style.transform += ` translate3d(${xAxis}px, ${yAxis}px, 0)`;
    }
});

// --- AMBIENT PARTICLES ---
const canvas = document.getElementById('ambient-particles');
const ctx = canvas.getContext('2d');
let w, h;
let particles = [];

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2;
        this.speedY = Math.random() * -0.5 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.y += this.speedY;
        if (this.y < 0) {
            this.y = h;
            this.x = Math.random() * w;
        }
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();
