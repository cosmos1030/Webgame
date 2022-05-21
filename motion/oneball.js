var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var gravity = 0.2;
var dx=0;

addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

addEventListener("click", function(event) {
    init();
});

addEventListener("keydown", function(event){
    console.log(event.key);
    if (event.key=='ArrowRight'){
        dx = 5;
        console.log(dx);
    }
    if (event.key == 'ArrowLeft'){
        dx = -5;
    }
});

function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        if(this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
    };
    this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	};
}

var ball;

function init() {
    var radius = 10;
    var x = 10;
    var y = 800;
    var dy = 0;
    ball = new Ball(x, y, dx, dy, radius, 'blue');
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);

    ball.update();
}

init();
animate();
