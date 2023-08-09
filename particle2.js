class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 6;
    this.color = 'black';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const k = 2 * Math.PI / 3;
const c = Math.sqrt(9.82 / k);

function X(a, b, t, kVal = k) {
  return a + Math.exp(kVal * b) / kVal * Math.sin(kVal * (a - c * t));
}

function Y(a, b, t, kVal = k) {
  return b - Math.exp(kVal * b) / kVal * Math.cos(kVal * (a - c * t));
}

function drawWave(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let a = 0; a <= 100; a += 0.5) {
    for (let b = -.3; b >= -2; b += -0.2) {
      const x = X(a, b, t) * 50 ;
      const y = (canvas.height/2) -Y(a, b, t) * 50 ;
      const particle = new Particle(x, y);
      console.log(particle)
      particle.draw(ctx);
    }
  }
}

function animate() {
  const t = Date.now() * 0.001 % (2 * Math.PI / (k * c));
  drawWave(t);
  requestAnimationFrame(animate);
}

animate();
