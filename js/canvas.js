var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');


var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function (event) {
    console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
})

function Square(x, y, dx, dy, l) {
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.l = l

    this.sqDraw = function () {
        c.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.5)`
        c.fillRect(this.x, this.y, l, l);
    }

    this.sqUpdate = function () {
        if (this.x + l > innerWidth || this.x < 0) {
            this.dx *= -1;
        }
        if (this.y + l > innerHeight || this.y < 0) {
            this.dy *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            l += 1;
        } else if (this.l > 2) {
            l -= 1;
        }

        this.sqDraw();
    }
}

let squareArray = [];

for (let i = 0; i < 75; i++) {
    let l = Math.random() * 100;
    let x = Math.random() * (innerWidth - l * 2) + l;
    let dx = (Math.random() - 0.5) * 5;
    let y = Math.random() * (innerHeight - l * 2) + l;
    let dy = (Math.random() - 0.5) * 5;
    squareArray.push(new Square(x, y, dx, dy, l));
}



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

        // Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            this.radius += 1;
        } else if (this.radius > 2) {
            this.radius -= 1;
        }


        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let circleArray = [];

for (let i = 0; i < 75; i++) {
    let radius = Math.random() * 50;
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
    for (let j = 0; j < squareArray.length; j++) {
        squareArray[j].sqUpdate();
    }
}

animate();


