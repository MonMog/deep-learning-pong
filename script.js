const canvas = document.getElementById("myCanvas");
const firstPong = canvas.getContext("2d");
const secondPong = canvas.getContext("2d");
const ball = canvas.getContext("2d");

firstPongX = 110;
firstPongY = 135;

secondPongX = 110;
secondPongY = 10;

bothPongWidth = 75;
bothPongHeight = 5;

firstPong.rect(firstPongX, firstPongY, bothPongWidth, bothPongHeight);
firstPong.fillStyle = "black";
firstPong.fill();

secondPong.rect(secondPongX, secondPongY, bothPongWidth, bothPongHeight);
secondPong.fillStyle = "black";
secondPong.fill();

ball.arc(150, 70, 3, 0, 2 * Math.PI);
ball.fillStyle = "black";
ball.fill();


function movePaddleRight() {
    firstPongX += 5;
    firstPong.clearRect(firstPongX-5, firstPongY, bothPongWidth-5, bothPongHeight);
    firstPong.fillRect(firstPongX, firstPongY, bothPongWidth, bothPongHeight);
}

function movePaddleLeft() {
    firstPongX -= 5;
    firstPong.clearRect(firstPongX+5, firstPongY, bothPongWidth+5, bothPongHeight);
    firstPong.fillRect(firstPongX, firstPongY, bothPongWidth, bothPongHeight);
}

document.addEventListener("keydown", (event) => {
    console.log(event.key);
    if (event.key === "ArrowRight") {
        requestAnimationFrame(movePaddleRight); 
    }
    if (event.key === "ArrowLeft") {
        requestAnimationFrame(movePaddleLeft); 
    }
});


