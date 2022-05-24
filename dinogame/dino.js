var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        c.fillStyle = 'green';
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}
dino.draw();

class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}

var timer = 0;
var cactuses = [];
var jumpTimer = 0;

function animate() {
    requestAnimationFrame(animate);
    timer++;

    c.clearRect(0, 0, canvas.width, canvas.height);

    if (timer % 120 === 0) {
        var cactus = new Cactus();
        cactuses.push(cactus);
    }

    cactuses.forEach((a, i, o) => {
        if (a.x < 0) {
            o.splice(i, 1);
        }
        a.x--;
        a.draw();
    })

    if (jumping == true) {
        dino.y -= 2;
        jumpTimer++;
    }
    if (jumping == false) {
        if (dino.y < 200) {
            dino.y += 2;
        }
    }

    if (jumpTimer > 60) {
        jumping = false;
        jumpTimer = 0;
    }
    dino.draw();
}

animate();

var jumping = false;

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        jumping = true;
    }
})
