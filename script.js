// const canvas = document.getElementById("myCanvas");
// const topScoreElement = document.getElementById("topScore");
// const bottomScoreElement = document.getElementById("bottomScore");

// const ctx = canvas.getContext("2d");


// let playerScore = 0; 
// let enemyScore = 0;

// let playerPaddle = {
//     x: canvas.width / 2 - 50,
//     y: canvas.height - 30,
//     width: 100,
//     height: 10,
//     speed: 3,
//     dx: 0, 
// };

// let enemyPaddle = {
//     x: canvas.width / 2 - 50,
//     y: 20,
//     width: 100,
//     height: 10,
//     speed: 7,
//     dx: 0,
// };

// let ball = {
//     x: canvas.width / 2,
//     y: canvas.height / 2,
//     radius: 10,
//     dx: 7, 
//     dy: 7, 
// };


// function drawPaddle(paddle) {
//     ctx.fillStyle = "black";
//     ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
// }

// function moveAIPaddle() {
//     setTimeout(function() {
//         if (ball.x < enemyPaddle.x + enemyPaddle.width / 2) {
//             enemyPaddle.dx = -enemyPaddle.speed; 
//         } else if (ball.x > enemyPaddle.x + enemyPaddle.width / 2) {
//             enemyPaddle.dx = enemyPaddle.speed; 
//         } else {
//             enemyPaddle.dx = 0; 
//         }
//         enemyPaddle.x += enemyPaddle.dx;
//     }, 1000);
// }

// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
//     ctx.fillStyle = "black";
//     ctx.fill();
//     ctx.closePath();
// }

// function resetBall() {
//     const speed = 7;
//     const direction = Math.random() < 0.5 ? -1 : 1; 
//     const angle = Math.random() * 60 * Math.PI / 180; 

//     ball.x = canvas.width / 2;
//     ball.y = canvas.height / 2;

//     const dx = speed * Math.sin(angle);
//     const dy = direction * speed * Math.cos(angle);
//     ball.dx = dx;
//     ball.dy = dy;
// }


// function update() {
//     playerPaddle.x += playerPaddle.dx;

//     if (playerPaddle.x < 0) playerPaddle.x = 0;
//     if (playerPaddle.x + playerPaddle.width > canvas.width) {
//         playerPaddle.x = canvas.width - playerPaddle.width;
//     }

//     enemyPaddle.x += enemyPaddle.dx;

//     if (enemyPaddle.x < 0) enemyPaddle.x = 0;
//     if (enemyPaddle.x + enemyPaddle.width > canvas.width) {
//         enemyPaddle.x = canvas.width - enemyPaddle.width;
//     }

//     ball.x += ball.dx;
//     ball.y += ball.dy;

//     if ( ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
//         ball.dx *= -1; 
//     }
//     if ( ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
//         ball.dy *= -1; 
//     }

//     if ( ball.y + ball.radius > canvas.height) {
//         enemyScore++;
//         topScoreElement.textContent = enemyScore; 
//         resetBall();
//     }
    
//     if ( ball.y - ball.radius < 0) {
//         playerScore++; 
//         bottomScoreElement.textContent = playerScore;
//         resetBall();
//     }

    
//     if ( (ball.x > playerPaddle.x) && (ball.x < playerPaddle.x + playerPaddle.width) && (ball.y + ball.radius > playerPaddle.y)) {
//         ball.dy *= -1; 
//         ball.y = playerPaddle.y - ball.radius; 
//     }

    
//     if ( (ball.x > enemyPaddle.x ) && (ball.x < enemyPaddle.x + enemyPaddle.width) && (ball.y - ball.radius < enemyPaddle.y + enemyPaddle.height)) {
//         ball.dy *= -1;
//         ball.y = enemyPaddle.y + enemyPaddle.height + ball.radius;
//     }
// }


// function clearCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// function gameLoop() {
//     clearCanvas();
//     drawPaddle(playerPaddle);
//     drawPaddle(enemyPaddle);
//     drawBall();
//     update();

//     requestAnimationFrame(gameLoop);
// }


// document.addEventListener("keydown", (event) => {
//     if (event.key === "ArrowRight") {
//         playerPaddle.dx = playerPaddle.speed;
//     }
//     if (event.key === "ArrowLeft") {
//         playerPaddle.dx = -playerPaddle.speed;
//     }
//     if (event.key === "d") {
//         enemyPaddle.dx = enemyPaddle.speed;
//     }
//     if (event.key === "a") {
//         enemyPaddle.dx = -enemyPaddle.speed;
//     }
// });

// document.addEventListener("keyup", (event) => {
//     if (event.key === "ArrowRight" && playerPaddle.dx > 0) {
//         playerPaddle.dx = 0; 
//     }
//     if (event.key === "ArrowLeft" && playerPaddle.dx < 0) {
//         playerPaddle.dx = 0; 
//     }
//     if (event.key === "d" && enemyPaddle.dx > 0) {
//         enemyPaddle.dx = 0; 
//     }
//     if (event.key === "a" && enemyPaddle.dx < 0) {
//         enemyPaddle.dx = 0; 
//     }
// });

// gameLoop();
// Above is the old code that was a working game that was controlled by the player and the enemy paddle would simply follow the origin of the ball. 


class Pong {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.playerScore = 0;
        this.enemyScore = 0;
        this.isGameOver = false;

        this.framesSurvived = 0;
        this.framesBallInPaddleRange = 0;
        this.successfulHits = 0;
        this.stuckFrames = 0;
        this.lastPaddleX = 0;

        this.playerPaddle = {
            x: canvas.width / 2 - 50,
            y: canvas.height - 30,
            width: 100,
            height: 10,
            speed: 11,
            dx: 0
        };

        this.enemyPaddle = {
            x: canvas.width / 2 - 50,
            y: 20,
            width: 100,
            height: 10,
            speed: 3,
            dx: 0
        };

        this.ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 10,
            dx: 5,
            dy: 5,
            maxSpeed: 4
        };
    }

    drawPaddle(paddle) {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }

    moveAIPaddle() {
        if (this.ball.x < this.enemyPaddle.x + this.enemyPaddle.width / 2) {
            this.enemyPaddle.dx = -this.enemyPaddle.speed * 2;
        } else if (this.ball.x > this.enemyPaddle.x + this.enemyPaddle.width / 2) {
            this.enemyPaddle.dx = this.enemyPaddle.speed * 2;
        } else {
            this.enemyPaddle.dx = 0;
        }
        this.enemyPaddle.x += this.enemyPaddle.dx;
    }

    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
    }

    resetBall() {
        this.isGameOver = true;
        const speed = 3;
        const angle = Math.random() * Math.PI / 3 + Math.PI / 3; 

        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;

        const dx = speed * Math.cos(angle);
        const dy = speed * Math.sin(angle);
        this.ball.dx = dx;
        this.ball.dy = dy;

        if (Math.abs(this.ball.dx) > this.ball.maxSpeed) {
            this.ball.dx = this.ball.maxSpeed * (this.ball.dx > 0 ? 1 : -1);
        }

        if (Math.abs(this.ball.dy) > this.ball.maxSpeed) {
            this.ball.dy = this.ball.maxSpeed * (this.ball.dy > 0 ? 1 : -1);
        }

        // this.playerPaddle.x = this.canvas.width / 2 - this.playerPaddle.width / 2;
    }

    resetGame() {
        this.isGameOver = false;
        this.playerScore = 0;
        this.enemyScore = 0;
        this.framesSurvived = 0;
        this.framesBallInPaddleRange = 0;
        this.successfulHits = 0;
        this.stuckFrames = 0;
        this.lastPaddleX = 0;
    
        this.playerPaddle.x = this.canvas.width / 2 - this.playerPaddle.width / 2;
        this.playerPaddle.dx = 0;
    
        this.enemyPaddle.x = this.canvas.width / 2 - this.enemyPaddle.width / 2;
        this.enemyPaddle.dx = 0;
        }

    resetBallIfPlayerWon() {
        const speed = 3;
        const angle = Math.random() * Math.PI / 3 + Math.PI / 3;

        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;

        const dx = speed * Math.cos(angle);
        const dy = speed * Math.sin(angle);
        this.ball.dx = dx;
        this.ball.dy = dy;

        if (Math.abs(this.ball.dx) > this.ball.maxSpeed) {
            this.ball.dx = this.ball.maxSpeed * (this.ball.dx > 0 ? 1 : -1);
        }

        if (Math.abs(this.ball.dy) > this.ball.maxSpeed) {
            this.ball.dy = this.ball.maxSpeed * (this.ball.dy > 0 ? 1 : -1);
        }
    }


    processNetworkOutput() {
        const inputs = [
            this.ball.x / this.canvas.width,
            this.ball.y / this.canvas.height,
            this.ball.dx / this.ball.maxSpeed,
            this.ball.dy / this.ball.maxSpeed,
            this.playerPaddle.x / this.canvas.width,
            this.enemyPaddle.x / this.canvas.width,
            this.enemyPaddle.dx / this.enemyPaddle.speed
        ];

        const output = this.network.activate(inputs);

        const decision = (output[0])
        console.log(decision);

        if (decision < 0.3) {
            this.playerPaddle.dx = -this.playerPaddle.speed; // go left
        } else if (decision < 0.6) {
            this.playerPaddle.dx = 0; // stay
        } else {
            this.playerPaddle.dx = this.playerPaddle.speed; // go right
        }
    }

    calculateFitness() {
        let fitness = 0;
    
        fitness += this.playerScore * 1; // 1 point per player point
        fitness -= this.enemyScore * 0.5;  // -0.5 points per enemy point
    
        fitness += (this.framesSurvived / 60) * 0.1; // 0.1 points per second survived
        fitness += this.framesBallInPaddleRange * 0.1; // 0.1 points per frame in range
    
        fitness += this.successfulHits * 0.5; // 0.5 points per successful hit
    
        if (this.stuckFrames > 270) { // 60 frames is 1 second i think, so this should be 4ish seconds
            fitness -= 20; 
        }
        // just please move
    
        return fitness;
    }

 

    update() {

        if (this.isGameOver) return;
    
        this.framesSurvived++;

    
        this.playerPaddle.x += this.playerPaddle.dx;

        // Determine if the ball is in the paddle's range
        if (this.ball.x > this.playerPaddle.x &&
            this.ball.x < this.playerPaddle.x + this.playerPaddle.width) {
            this.framesBallInPaddleRange++;
        }

        // I hate this
        if (this.lastPaddleX === this.playerPaddle.x) {
            this.stuckFrames++;
        } else {
            this.stuckFrames = 0;
        }

        this.lastPaddleX = this.playerPaddle.x;
    
        if (this.playerPaddle.x < 0) this.playerPaddle.x = 0;
        if (this.playerPaddle.x + this.playerPaddle.width > this.canvas.width) {
            this.playerPaddle.x = this.canvas.width - this.playerPaddle.width;
        }
    
        this.enemyPaddle.x += this.enemyPaddle.dx;
    
        if (this.enemyPaddle.x < 0) this.enemyPaddle.x = 0;
        if (this.enemyPaddle.x + this.enemyPaddle.width > this.canvas.width) {
            this.enemyPaddle.x = this.canvas.width - this.enemyPaddle.width;
        }
    
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;
    
        // collision with left and right wall
        if (this.ball.x + this.ball.radius > this.canvas.width) {
            this.ball.x = this.canvas.width - this.ball.radius; 
            this.ball.dx *= -1; 
        }
        if (this.ball.x - this.ball.radius < 0) {
            this.ball.x = this.ball.radius; 
            this.ball.dx *= -1; 
        }
    
        // collision with bottom
        if (this.ball.y + this.ball.radius > this.canvas.height) {
            this.ball.y = this.canvas.height - this.ball.radius; 
            this.ball.dy *= -1; 
            this.enemyScore++; 
            this.resetBall(); 
        }
        // collision with top
        if (this.ball.y - this.ball.radius < 0) {
            this.ball.y = this.ball.radius; 
            this.ball.dy *= -1; 
            this.playerScore++; 
            this.resetBallIfPlayerWon(); 
        }
    
        // player paddle collision
        if (this.ball.x > this.playerPaddle.x && this.ball.x < this.playerPaddle.x + this.playerPaddle.width &&
            this.ball.y + this.ball.radius > this.playerPaddle.y) {
            const paddleCenter = this.playerPaddle.x + this.playerPaddle.width / 2;
            const hitPosition = (this.ball.x - paddleCenter) / (this.playerPaddle.width / 2);
            this.successfulHits++;
    
            this.ball.dy = -Math.abs(this.ball.dy); 
            this.ball.dx = this.ball.dx + hitPosition * 3 + this.playerPaddle.dx * 0.5;
    
            this.ball.y = this.playerPaddle.y - this.ball.radius; 
        }
    
        // enemy paddle collision
        if (this.ball.x > this.enemyPaddle.x && this.ball.x < this.enemyPaddle.x + this.enemyPaddle.width &&
            this.ball.y - this.ball.radius < this.enemyPaddle.y + this.enemyPaddle.height) {
            const paddleCenter = this.enemyPaddle.x + this.enemyPaddle.width / 2;
            const hitPosition = (this.ball.x - paddleCenter) / (this.enemyPaddle.width / 2);
    
            this.ball.dy = Math.abs(this.ball.dy); 
            this.ball.dx = this.ball.dx + hitPosition * 3 + this.enemyPaddle.dx * 0.5;
    
            this.ball.y = this.enemyPaddle.y + this.enemyPaddle.height + this.ball.radius; 
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    gameLoop() {
        this.clearCanvas();
        this.drawPaddle(this.playerPaddle);
        this.drawPaddle(this.enemyPaddle);
        this.drawBall();
        this.moveAIPaddle();
        this.processNetworkOutput(); 
        this.update();

        if (this.isGameOver) {
            this.ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.font = "64px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText("Game over", this.canvas.width / 2 - 150, this.canvas.height / 2 + 20);
            return;
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    start() {
        this.gameLoop();
    }
}




class Runner {
    constructor({ neat, numGames, onEndGeneration }) {
        this.neat = neat;
        this.games = [];
        this.gamesFinished = 0;
        this.onEndGeneration = onEndGeneration;

        for (let i = 0; i < numGames; i++) {
            this.games.push(
                new Pong (document.getElementById(`game${this.games.length + 1}`))
            );
        }

    }

    startGeneration() {
        this.gamesFinished = 0;
    
        for (let i = 0; i < this.games.length; i++) {
            const game = this.games[i];
            game.resetGame();
            game.network = this.neat.population[i]; 
            game.network.score = 0; 
            game.start();
        }
    
        const checkGamesOver = () => {
            this.gamesFinished = this.games.filter(game => game.isGameOver).length;
            if (this.gamesFinished === this.games.length) {
                this.endGeneration();
            } else {
                requestAnimationFrame(checkGamesOver);
            }
        };
    
        requestAnimationFrame(checkGamesOver);
    }

    endGeneration() {

        const fitnessList = [];
        for (let i = 0; i < this.games.length; i++) {
            const game = this.games[i];
            const fitness = game.calculateFitness(); 
            game.network.score = fitness; 
            fitnessList.push(fitness);
        }

        document.getElementById("fitnessList").innerHTML = `${fitnessList.join(", ")}`;


        this.neat.sort();

        let sum = 0;
        for (let i = 0; i < this.neat.population.length; i++) {
            sum += this.neat.population[i].score;
        }

        let fittest = this.neat.population[0];
        let lowest = this.neat.population[0];
        for (let i = 1; i < this.neat.population.length; i++) {
            if (this.neat.population[i].score > fittest.score) {
                fittest = this.neat.population[i];
            }
            if (this.neat.population[i].score < lowest.score) {
                lowest = this.neat.population[i];
            }
        }

        this.onEndGeneration({
            generation: this.neat.generation,
            max: fittest.score,
            avg: Math.round(sum / this.neat.popsize),
            min: lowest.score
        });

        

        const newGeneration = [];

        for (let i = 0; i < this.neat.elitism; i++) {
            newGeneration.push(this.neat.population[i]);
        }

        for (let i = 0; i < this.neat.popsize - this.neat.elitism; i++) {
            newGeneration.push(this.neat.getOffspring())
        }

        this.neat.population = newGeneration;
        this.neat.mutate();
        this.neat.generation++;
        this.startGeneration();
    }


    start() {
        this.startGeneration();
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("game-container");
    const AmountofGames = 50;


    function createNeat(popsize) {
        return new neataptic.Neat(7, 1, null, {
            popsize: popsize,
            elitism: Math.floor(popsize * 0.2),
            mutationRate: .5,
            mutationAmount: 3
          }
        );
    }

    function createCanvases(numGames) {
        for (let i = 0; i < numGames; i++) {
            const canvas = document.createElement("canvas");
            canvas.id = `game${i + 1}`;
            canvas.width = 800;
            canvas.height = 800;
            gameContainer.appendChild(canvas);
        }
    }

    function setupNeat(neat) {
        const runner = new Runner({
            neat,
            numGames: AmountofGames,
            onEndGeneration: (stats) => {
                document.getElementById("generation").innerHTML = `Generation: ${stats.generation}`;
                document.getElementById("highestFittestScore").innerHTML = `Highest Fittest Score: ${stats.max}`;
                document.getElementById("AverageFittestScore").innerHTML = `Average Fittest Score: ${stats.avg}`;
                document.getElementById("lowestFittestScore").innerHTML = `Lowest Fittest Score: ${stats.min}`;
            }
        });
        runner.start();
    }

    createCanvases(AmountofGames);
    const neat = createNeat(AmountofGames);
    setupNeat(neat);
});






