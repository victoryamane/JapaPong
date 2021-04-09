// Variáveis da bola
let xBall = 300;
let yBall = 200;
let diameter = 13;
let radius = diameter / 2;

// Velocidade da bola
let speedXBall = 6;
let speedYBall = 6;

// Variáveis da raquete
let xRacket = 5;
let yRacket = 150;
let lengthRacket = 10;
let heightRacket = 90;

// Variáveis da raquete do oponente
let xRacketEnemy = 585;
let yRacketEnemy = 150;
let speedYEnemy;
let chancesOfError = 0;

// Variável da função importada 
let hit = false;

// Variáveis do placar
let playerScore = 0;
let enemyScore = 0;

// Variáveis dos sons
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");  
}

function setup() {
  createCanvas(600, 400);
  //trilha.loop();
}

function draw() {
  background(0,0,0);
  showBall();
  moveBall();
  checkEdgeCollision();
  showRacket(xRacket, yRacket);
  showRacket(xRacketEnemy, yRacketEnemy);
  moveRacket();
  //checkRacketCollision();
  checkRacketCollisionLibery(xRacket, yRacket);
  checkRacketCollisionLibery(xRacketEnemy, yRacketEnemy);
  moveRakcetEnemy();
  showScore();
  scorePoint();
}

// Mosta a bola
function showBall() {
  circle(xBall,yBall,diameter);
}

// Movimenta a bola
function moveBall() {
  xBall += speedXBall;
  yBall += speedYBall;  
}

// Verifica colisão com as bordas
function checkEdgeCollision() {
    // Condição para colissão na borda no eixo X
  if (xBall + radius > width || xBall -  radius < 0){
    speedXBall *= -1;
  }
  // Condição para colissão na borda no eixo Y
  if (yBall + radius > height || yBall - radius < 0){
    speedYBall *= -1;
  }
}

// Mostra a raquete
function showRacket(x, y) {
  rect(x,y,lengthRacket,heightRacket);
}

// Movimenta a raquete
function moveRacket() {
    if (keyIsDown(UP_ARROW)) {
        yRacket -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRacket += 10;
    }  
}

// Verifica a colisão da bola na requete 
function checkRacketCollision() {
  if (xBall - radius < xRacket + lengthRacket && yBall - radius < yRacket + heightRacket && yBall + radius > yRacket + heightRacket ) {
    speedXBall *= -1;
    raquetada.play();
  }  
}

// Verifica a colisão da bola na requete (Solução de outra pessoa)
function checkRacketCollisionLibery(x, y) {
    hit = collideRectCircle(x, y, lengthRacket, heightRacket, xBall, yBall, radius);
    if (hit) {
        speedXBall *= -1;
        //raquetada.play();
    }
}

// Move a raquete do oponente
function moveRakcetEnemy() {
  speedYEnemy = yBall - yRacketEnemy - lengthRacket / 2 - 30;
  yRacketEnemy += speedYEnemy + chancesOfError; 
  calculeteChancesOfError();
}

// Calcula a chance de erro
function calculeteChancesOfError(){
  if (enemyScore >= playerScore) {
    chancesOfError += 1
    if (chancesOfError >= 39){
    chancesOfError = 40
    }
  } else {
    chancesOfError -= 1
    if (chancesOfError <= 35){
    chancesOfError = 35
    }
  }  
}

// Mostra o placar
function showScore() {
  stroke(255); // Contorno
  textAlign(CENTER); //Alinha o texto
  textSize(18); // Tamanho da fonte
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255); // Cor branca
  text(playerScore, 170,26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(enemyScore, 470,26);  
}

// Adiciona o ponto no placar
function scorePoint() {
  if(xBall > width - radius){
    playerScore += 1;
    ponto.play();
  }
  if(xBall < radius){
    enemyScore += 1;
    ponto.play();
  }
}
  