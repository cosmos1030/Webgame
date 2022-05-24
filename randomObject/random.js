var canvas = document.querySelector('canvas');

//resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//how to draw random circles
for (var i= 0; i<50; i++){
    var x = Math.random() * window.innerWidth; // 0 ~ windowWidth
    var y = Math.random() * window.innerHeight; // 0 ~ windowHeight
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI*2, false);
    c.strokeStyle = 'blue';
    c.stroke();
}
