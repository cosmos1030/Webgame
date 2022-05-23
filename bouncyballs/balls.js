canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

(onresize = function(){
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
})();

nBalls = 100;
radius = 15;
nProperties = 4;
radiusSq = radius*radius
DoubleRadiusSq = 4*radiusSq;
dampeningFactor = 0.97;
hardnessFactor = 1;
balls = new Float32Array(nBalls*nProperties);

forEach = function(fn,start){
	for(var i=start||0;i<balls.length;i+=nProperties){
		fn(i);
	}
};

mouse = {
	gotBall: false,
	ball: 0,
	x: 0,
	y: 0
};

onmousemove = function(e){
	var rect = this.canvas.getBoundingClientRect();
	mouse.x = e.x-rect.left;
	mouse.y = e.y-rect.top;
};

onmousedown = function(){
	forEach(function(i){
		var dx = mouse.x-balls[i],
				dy = mouse.y-balls[i+1],
				distanceSq = dx*dx+dy*dy;
		if(distanceSq<radiusSq){
			mouse.gotBall = true;
			mouse.ball = i;
		}
	});
	console.log(mouse);
};

onmouseup = function(){
	mouse.gotBall = false;
};

ballAmountInput = document.querySelector('input');
ballAmountInput.onchange = function(){
	balls = new Float32Array(ballAmountInput.value*nProperties);
	generateBalls()
};

(generateBalls = function(){
	forEach(function(i){
		balls[i] = Math.random()*(canvas.width-radius*2)+radius;
		balls[i+1] = Math.random()*(canvas.height-radius*2)+radius;
		balls[i+2] = Math.random()*6-3;
	});
})();

requestAnimationFrame(loop = function(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	forEach(function(i){
		if(i===mouse.ball && mouse.gotBall){
			ctx.fillStyle = "#a22";
		}else{
			ctx.fillStyle = "#fff";
		}
		ctx.beginPath();
		ctx.arc(balls[i],balls[i+1],radius,0,Math.PI*2);
		ctx.fill();

		forEach(function(j){
			var dx = balls[i]-balls[j],
					dy = balls[i+1]-balls[j+1],
					distanceSq = dx*dx+dy*dy;
			if(distanceSq<DoubleRadiusSq){
				var distance = Math.sqrt(distanceSq),
						halfOverlap = distance*0.5-radius,
						ax = dx/distance*halfOverlap*hardnessFactor,
						ay = dy/distance*halfOverlap*hardnessFactor;
				balls[i+2] = (balls[i+2]-ax)*dampeningFactor;
				balls[i+3] = (balls[i+3]-ay)*dampeningFactor;
				balls[j+2] = (balls[j+2]+ax)*dampeningFactor;
				balls[j+3] = (balls[j+3]+ay)*dampeningFactor;
			}
		},i+nProperties);
	});
	
	forEach(function(i){
		balls[i] += balls[i+2];
		balls[i+1] += balls[i+3];
		balls[i+3] += 0.1;

		var bottom = balls[i+1]+radius;
		if(bottom>canvas.height){
			balls[i+3] = (balls[i+3]-bottom+canvas.height)*dampeningFactor;
		};
		
		var right = balls[i]+radius;
		if(right>canvas.width){
			balls[i+2] = (balls[i+2]-right+canvas.width)*dampeningFactor;
		};
		
		var left = balls[i]-radius;
		if(left<0){
			balls[i+2] = (balls[i+2]-left)*dampeningFactor;
		}
	});
	
	if(mouse.gotBall){
		var dx = balls[mouse.ball]-mouse.x,
				dy = balls[mouse.ball+1]-mouse.y;
		balls[mouse.ball+2] = (balls[mouse.ball+2]-dx*0.02)*dampeningFactor;
		balls[mouse.ball+3] = (balls[mouse.ball+3]-dy*0.02)*dampeningFactor;
		ctx.strokeStyle = "#a22";
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(mouse.x,mouse.y);
		ctx.lineTo(balls[mouse.ball],balls[mouse.ball+1]);
		ctx.stroke();
	}
	
	requestAnimationFrame(loop);
});
