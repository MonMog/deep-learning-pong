const canvas = document.getElementById("myCanvas");
const topScoreElement = document.getElementById("topScore");
const bottomScoreElement = document.getElementById("bottomScore");

const ctx = canvas.getContext("2d");


let playerScore = 0; 
let enemyScore = 0;

let playerPaddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    width: 100,
    height: 10,
    speed: 7,
    dx: 0, 
};

let enemyPaddle = {
    x: canvas.width / 2 - 50,
    y: 20,
    width: 100,
    height: 10,
    speed: 7,
    dx: 0,
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 7, 
    dy: 7, 
};


function drawPaddle(paddle) {
    ctx.fillStyle = "black";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function resetBall() {
    const speed = 7;
    const direction = Math.random() < 0.5 ? -1 : 1; 
    const angle = Math.random() * 60 * Math.PI / 180; 

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    const dx = speed * Math.sin(angle);
    const dy = direction * speed * Math.cos(angle);
    ball.dx = dx;
    ball.dy = dy;
}


function update() {
    playerPaddle.x += playerPaddle.dx;

    if (playerPaddle.x < 0) playerPaddle.x = 0;
    if (playerPaddle.x + playerPaddle.width > canvas.width) {
        playerPaddle.x = canvas.width - playerPaddle.width;
    }

    enemyPaddle.x += enemyPaddle.dx;

    if (enemyPaddle.x < 0) enemyPaddle.x = 0;
    if (enemyPaddle.x + enemyPaddle.width > canvas.width) {
        enemyPaddle.x = canvas.width - enemyPaddle.width;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if ( ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1; 
    }
    if ( ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1; 
    }

    if ( ball.y + ball.radius > canvas.height) {
        enemyScore++;
        topScoreElement.textContent = enemyScore; 
        resetBall();
    }
    
    if ( ball.y - ball.radius < 0) {
        playerScore++; 
        bottomScoreElement.textContent = playerScore;
        resetBall();
    }

    
    if ( (ball.x > playerPaddle.x) && (ball.x < playerPaddle.x + playerPaddle.width) && (ball.y + ball.radius > playerPaddle.y)) {
        ball.dy *= -1; 
        ball.y = playerPaddle.y - ball.radius; 
    }

    
    if ( (ball.x > enemyPaddle.x ) && (ball.x < enemyPaddle.x + enemyPaddle.width) && (ball.y - ball.radius < enemyPaddle.y + enemyPaddle.height)) {
        ball.dy *= -1;
        ball.y = enemyPaddle.y + enemyPaddle.height + ball.radius;
    }
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearCanvas();
    drawPaddle(playerPaddle);
    drawPaddle(enemyPaddle);
    drawBall();
    update();

    requestAnimationFrame(gameLoop);
}


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        playerPaddle.dx = playerPaddle.speed;
    }
    if (event.key === "ArrowLeft") {
        playerPaddle.dx = -playerPaddle.speed;
    }
    if (event.key === "d") {
        enemyPaddle.dx = enemyPaddle.speed;
    }
    if (event.key === "a") {
        enemyPaddle.dx = -enemyPaddle.speed;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight" && playerPaddle.dx > 0) {
        playerPaddle.dx = 0; 
    }
    if (event.key === "ArrowLeft" && playerPaddle.dx < 0) {
        playerPaddle.dx = 0; 
    }
    if (event.key === "d" && enemyPaddle.dx > 0) {
        enemyPaddle.dx = 0; 
    }
    if (event.key === "a" && enemyPaddle.dx < 0) {
        enemyPaddle.dx = 0; 
    }
});

gameLoop();
