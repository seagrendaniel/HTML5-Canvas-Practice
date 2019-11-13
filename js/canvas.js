var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');

c.fillStyle = "rgba(255, 0, 0, 0.5)";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(0, 0, 255, 0.5)";
c.fillRect(200, 300, 100, 100);
c.fillStyle = "rgba(0, 255, 0, 0.5)";
c.fillRect(300, 100, 100, 100);
// c.fillRect(400, 200, 100, 100);

// Line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "#fa77ab"
c.stroke();

// Arc/Circle
for (let i = 0; i < 100; i++) {
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    c.beginPath();          // Must always precede new arcs/lines with beginPath in order to make a new path
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = `rgba(${red}, ${green}, ${blue}, 1)`;
    c.stroke();
}

