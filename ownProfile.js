const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
   const mainContent = document.querySelector('.main-content');
   canvas.width = mainContent.clientWidth;
   canvas.height = mainContent.clientHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const particleCount = 150;

function createParticle() {
   return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
   };
}

for (let i = 0; i < particleCount; i++) {
   particles.push(createParticle());
}

function animateParticles() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

   particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();

      particle.x += particle.dx;
      particle.y += particle.dy;

      // Отскок от границ canvas
      if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
         particle.dx *= -1;
         particle.x = Math.max(particle.radius, Math.min(particle.x, canvas.width - particle.radius));
      }
      if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
         particle.dy *= -1;
         particle.y = Math.max(particle.radius, Math.min(particle.y, canvas.height - particle.radius));
      }
   });

   requestAnimationFrame(animateParticles);
}

animateParticles();
