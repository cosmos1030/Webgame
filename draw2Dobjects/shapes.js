var canvas = document.querySelector('canvas');

//resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//how to draw rectangle
c.fillStyle = 'rgba(255, 0,0,0.5)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(0,0,255,0.5)'
c.fillRect(400, 100, 100, 100);
c.fillStyle = 'rgba(0,255,0,0.5)';
c.fillRect(300, 300, 100, 100);

//how to draw line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "#fa34a3"
c.stroke();

//how to draw circle
c.beginPath();
c.arc(300,300,30,0, Math.PI *2, false);
c.strokeStyle = 'blue';
c.stroke();
