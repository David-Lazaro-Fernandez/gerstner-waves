class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 6;
        this.color = 'white';
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Obtén el contexto de dibujo 2D del lienzo
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const trailCanvas = document.createElement("canvas");
trailCanvas.width = window.innerWidth;
trailCanvas.height = window.innerHeight;
const trailCtx = trailCanvas.getContext("2d");

// Dibuja la función en un momento específico
function draw(t) {
    // Limpia el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Llena el lienzo de rastro con un color blanco semitransparente

    //Dibuja la función
    let b = 3
    let k = (Math.PI * 2) / b
    const phaseSpeed = Math.sqrt(9.82/k) 

    for (let x = 0; x < canvas.width; x += 10) {
        b+=0.00001
        k = (Math.PI * 2) / b
        // a +(exp(kb)/k)*(sin(k*(a+ct)))
        const xPos = (dif) => x + ((Math.exp(k * b))/ k) * Math.sin(k * ((x) - (phaseSpeed*t)));
        const yPos = (dif) => b - ((Math.exp(k * b)) / k) * Math.cos(k * ((x) - (phaseSpeed*t)));
        const particle = new Particle(xPos(x), (canvas.height / 2) - yPos(b)+100); // Posición y escala
        particle.draw(ctx);
    }

    // const k = 1; // Constante para determinar la forma de la onda
    // const c = 0.5; // Velocidad de propagación de la onda

    // for (let x = 0; x < 10; x += 1) {
    //     const a = x;
    //     const b = canvas.height / 2; // Puedes ajustar este valor según sea necesario

    //     const xPos = a + (Math.exp(k * b) / k) * Math.sin(k * (a + c * t));
    //     const yPos = b - (Math.exp(k * b) / k) * Math.cos(k * (a + c * t));
    //     console.log(xPos)
    //     const particle = new Particle(xPos*100, yPos*30); // Posición
    //     particle.draw(ctx);
    // }

    // for (let x = 0; x < canvas.width; x += 0.8) {
    //     const xPos =(dif)=> Math.cos((x-dif) - t*1.5) + x;
    //     const yPos =(dif)=> Math.sin((x-dif) - t*1.5);
    //     const particle2 = new Particle(xPos(0.2)*40, (canvas.height / 2) - yPos(0.2) * 30+120); // Posición y escala
    //     const particle3 = new Particle(xPos(0.4)*40, (canvas.height / 2) - yPos(0.4) * 30+140); // Posición y escala
    //     const particle4 = new Particle(xPos(0.6)*40, (canvas.height / 2) - yPos(0.6) * 30+160); // Posición y escala
    //     const particle5 = new Particle(xPos(0.8)*40, (canvas.height / 2) - yPos(0.8) * 30+180); // Posición y escala
    //     const particle6 = new Particle(xPos(1)*40, (canvas.height / 2) - yPos(1) * 30+200); // Posición y escala
    //     const particle7 = new Particle(xPos(1)*40, (canvas.height / 2) - yPos(1) * 30+220); // Posición y escala

    //     particle2.draw(ctx);
    //     particle3.draw(ctx);
    //     particle4.draw(ctx);
    //     particle5.draw(ctx);
    //     particle6.draw(ctx);
    //     particle7.draw(ctx);
    // }
    // ctx.drawImage(trailCanvas, 0, 0);



}

// Anima la función a lo largo del tiempo
let t = 0;
function animate() {
    requestAnimationFrame(animate);
    draw(t);
    // Velocidad de animación
    t += 0.05;
}

animate();
