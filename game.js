(function(){
	var canvas = document.getElementById('gameCanvas');
	var ctx = canvas.getContext('2d');

	// Primer ejemeplo de dibujos en el Canvas

	// ctx.beginPath();
	// ctx.rect(20, 40, 50, 50);
	// ctx.fillStyle = "#FF0000";
	// ctx.fill();
	// ctx.closePath();

	// ctx.beginPath();
	// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
	// ctx.fillStyle = "green";
	// ctx.fill();
	// ctx.closePath();

	// ctx.beginPath();
	// ctx.rect(160, 10, 100, 40);
	// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
	// ctx.stroke();
	// ctx.closePath();

	// Propiedades de movimiento
	var x = canvas.width / 2;
	var y = canvas.height -30;
	var dx = 2;
	var dy = -2;
	var ballRadius = 10;

	// Variables de la paleta
	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.height - paddleWidth)/2;

	//Variables de control
	var rightPressed = false;
	var leftPressed = false;

	// Variables de enemigos
	var brickRowCount = 3;
	var brickColumnCount = 5;
	var brickWidth = 75;
	var brickHeight = 20;
	var brickPadding = 10;
	var brickOffserTop = 30;
	var brickOffserLeft = 30;

	var bricks = [];
	for (var c = 0; c < brickColumnCount; c++){
		bricks[c] = [];
		for (var r = 0; r < brickRowCount; r++){
			bricks[c][r] = { x: 0, y: 0};
		}
	}

	document.addEventListener('keydown', keydownHandler, false);
	document.addEventListener('keyup', keyupHandler, false);

	function drawBall(){
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		ctx.fillStyle= '#0095DD';
		ctx.fill();
		ctx.closePath();
	};

	function drawPaddle(){
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
	}

	function drawBricks(){
		for(var c = 0; c < brickColumnCount; c++){
			for(var r = 0; r < brickRowCount; r++){
				var brickX = (c * (brickWidth + brickPadding)) + brickOffserLeft;
				var brickY = (r * (brickHeight + brickPadding)) + brickOffserTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}

	function keydownHandler(e){
		if (e.keyCode == 39) {
			rightPressed = true;
		}else if (e.keyCode == 37){
			leftPressed = true;
		}
	}

	function keyupHandler(e){
		if (e.keyCode == 39) {
			rightPressed = false;
		}else if (e.keyCode == 37){
			leftPressed = false;
		}	
	}

	function collisionDetection(){
		for(var c = 0; c < brickColumnCount; c++){
			for(var r = 0; r < brickRowCount; r++){
				var brick = bricks[c][r];
				if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight){
					dy = -dy;
				}
			}
		}
	}

	function draw(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBricks();
		drawBall();
		drawPaddle();
		collisionDetection();

		// Colisión top
		// if (y + dy < 0) {
		// 	dy = -dy;
		// }

		// Colisión bot
		// if (y + dy > canvas.height) {
		// 	dy = -dy;
		// }

		// if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
		// 	dy = -dy;	
		// }

		if (y + dy < ballRadius) {
			dy = -dy;
		} else if(y + dy > canvas.height - ballRadius) {
			if (x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
			}else{
				alert("Game Over");
				document.location.reload();
			}			
		}

		if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}		

		if (rightPressed && paddleX < canvas.width - paddleWidth) {
			paddleX += 7;
		}

		if (leftPressed && paddleX > 0) {
			paddleX -= 7;
		}

		x += dx;
		y += dy; 
	};
	setInterval(draw, 10);	

}());




















