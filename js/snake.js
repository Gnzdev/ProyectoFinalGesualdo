const tablero = document.querySelector(".tablero");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const tiempoJugado = document.querySelector(".contador");

let gameOver = false;
let frutaX, frutaY;
let snakeX = 5, snakeY = 10;
let cuerpoSnake = [];
let speedX = 0, speedY = 0;
let setIntervalId;
let score = 0;
let segundero = 0;
let intervalSpeed = 125;

// let level = prompt("¿Qué nivel tenés? \n1) Fácil \n2) Normal \n3) Avanzado \n4) Experto")
// if (level == 1){
//     intervalSpeed = 200;
// } else if (level == 2){
//     intervalSpeed = 150;
// }else if (level == 3){
//     intervalSpeed = 100;
// }else if (level == 4){
//     intervalSpeed = 50;
// }

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

const nuevaFruta = () => {
    frutaX = Math.floor(Math.random() * 30) + 1;
    frutaY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    location.reload();
}

const cambiarDireccion = (e) => {
    if (e.key === "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.key === "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.key === "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.key === "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="fruta" style="grid-area: ${frutaY} / ${frutaX}"></div>`;

    if(snakeX === frutaX && snakeY === frutaY) {
        nuevaFruta();
        cuerpoSnake.push([frutaX, frutaY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`
    }

    for(let i = cuerpoSnake.length - 1; i > 0; i--){
        cuerpoSnake[i] = cuerpoSnake[i - 1];
    };

    cuerpoSnake[0] = [snakeX, snakeY];
    snakeX += speedX;
    snakeY += speedY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        snakeX = 15; snakeY = 15;
        speedX = 0; speedY = 0;
        intervalSpeed = 0;
// No logro que se quede la alerta cuando el score es 1 o más. No estoy seguro de qué es lo que está fallando
        Swal.fire({
            title: `Lamentablemente perdiste, la próxima será.
            Tu puntaje: ${score}. El récord mundial: ${highScore}`,
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `
          }).then(okay => {
            if (okay) {
                gameOver = true;
            }
          });
    }

    for(let i = 0; i < cuerpoSnake.length; i++){
        htmlMarkup += `<div class="cabeza" style="grid-area: ${cuerpoSnake[i][1]} / ${cuerpoSnake[i][0]}"></div>`;
        if(i !== 0 && cuerpoSnake[0][1] === cuerpoSnake[i][1] && cuerpoSnake[0][0] === cuerpoSnake[i][0]) {
            gameOver = true;
        }
    };
    tablero.innerHTML = htmlMarkup;
}

nuevaFruta();
// initGame();
setIntervalId = setInterval(initGame, intervalSpeed);
document.addEventListener("keydown", cambiarDireccion);