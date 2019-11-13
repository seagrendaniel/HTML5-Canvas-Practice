var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');

// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect(200, 300, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(300, 100, 100, 100);
// // c.fillRect(400, 200, 100, 100);

// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa77ab"
// c.stroke();

// // Arc/Circle
// for (let i = 0; i < 100; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.beginPath();          // Must always precede new arcs/lines with beginPath in order to make a new path
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = `rgba(${red}, ${green}, ${blue}, 1)`;
//     c.stroke();
// }

function Circle(x, y, dx, dy, radius) {
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
        c.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.5)`
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x < this.radius) {
            this.dx *= -1;
        }
        if (this.y + this.radius > innerHeight || this.y < this.radius) {
            this.dy *= -1;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }


}

let circleArray = [];

for (let i = 0; i < 100; i++) {
    let radius = 50;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 5;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dy = (Math.random() - 0.5) * 5;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();


