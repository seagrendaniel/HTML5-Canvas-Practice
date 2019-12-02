var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');


var mouse = {
    x: undefined,
    y: undefined
}

// Event Listeners
window.addEventListener('mousemove', function (event) {
    console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

const maxRadius = 40;
// const minRadius = 5;
const maxSqLen = 40;
// const minSqLen = 5;

const colorArray = [
    '#ff33da',
    '#de32ff',
    '#dd1100',
    '#f3d4e2',
    '#ff22aa',
];

function Square(x, y, dx, dy, l) {
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.l = l;
    this.minL = l;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.sqDraw = function () {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.l, this.l);
    }

    this.sqUpdate = function () {
        if (this.x + this.l > innerWidth || this.x < 0) {
            this.dx *= -1;
        }
        if (this.y + this.l > innerHeight || this.y < 0) {
            this.dy *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.l < maxSqLen) {
                this.l += 1;
            }
        } else if (this.l > this.minL) {
            this.l -= 1;
        }


        this.sqDraw();
    }
}

let squareArray = [];



function Circle(x, y, dx, dy, radius) {
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x < this.radius) {
            this.dx *= -1;
        }
        if (this.y + this.radius > innerHeight || this.y < this.radius) {
            this.dy *= -1;
        }

        // Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }


        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let circleArray = [];

function init() {
    squareArray = [];
    for (let i = 0; i < 400; i++) {
        let l = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - l * 2) + l;
        let dx = (Math.random() - 0.5) * 2;
        let y = Math.random() * (innerHeight - l * 2) + l;
        let dy = (Math.random() - 0.5) * 2;
        squareArray.push(new Square(x, y, dx, dy, l));
    }

    circleArray = [];

    for (let i = 0; i < 400; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 2;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dy = (Math.random() - 0.5) * 2;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    for (let j = 0; j < squareArray.length; j++) {
        squareArray[j].sqUpdate();
    }
}

animate();


