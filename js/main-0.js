let ship1, ship2;

class SpaceShip {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 80;
    this.color = 'red';
  }

  draw(){
    rect(this.x, this.y, this.w, this.h);
  }
}


/* Funkce pro základní nastavení aplikace v P5 JS */
function setup() {
  /* Vytvoří plátno podle velikosti displeje: https://p5js.org/reference/#/p5/createCanvas */
  canvas = createCanvas(displayWidth, displayHeight);
  ship1 = new SpaceShip();
  ship2 = new SpaceShip(600, 400);
}

/* Funkce pro vykreslení plátna */
function draw() {
  /* Nastaví černou barvu pozadí: https://p5js.org/reference/#/p5/background */
  background(0);
  ship1.draw();
  ship2.draw();
}

/* Funkce pro změnu velikosti plátna podle velikosti okna */
function windowResized() {
  /* Změní velikost plátna podle rozměrů okna: https://p5js.org/reference/#/p5/resizeCanvas */
  resizeCanvas(windowWidth, windowHeight);
}
