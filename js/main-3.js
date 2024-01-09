/* Globální proměnné a konstanty */
/* Proměnná pro uložení objektu kosmické lodi */
let spaceShip;
let shipImage, blastImage;

/***************************************************************************************************************************/
/* Třída SpaceShip - návrh kosmické lodi */
class SpaceShip {
  /* Konstruktor - speciální metoda, která slouží k inicializaci objektu (pomocí klíčového slova new). */
  constructor(posX, posY) {
    /* Souřadnice pozice kosmické lodi - střed obdélníku */
    this.x = posX;
    this.y = posY;
    /* Šířka lodi */
    this.w = 40;
    /* Výška lodi */
    this.h = 80; 
    /* Rychlost pohybu lodi (v pixelech) */
    this.v = 5;
    /* Úhel rotace lodi (ve stupních) */
    this.angle = 0;
  }

  /* Metoda zjišťuje změnu polohy lodi podle stisku kláves */
  /* https://p5js.org/reference/#/p5/keyCode */
  move() {
    /* Reakce na stisk kurzorových kláves */
    /* Podmínky ověřují, zda je poloha obdélníku lodi uvnitř hranic obrazovky; */
    /* jestliže ano, může být loď posunuta o počet pixelů nastavených v atributu this.v */
    if (keyIsDown(LEFT_ARROW)) {
      if (this.x > this.w / 2) this.x -= this.v;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      if (this.x < width - this.w / 2) this.x += this.v;
    }
    if (keyIsDown(UP_ARROW)) {
      if (this.y > this.h / 2) this.y -= this.v;
    }
    if (keyIsDown(DOWN_ARROW)) {
      if (this.y < height - this.h / 2) this.y += this.v;
    }
  }

  /* Metoda zjišťuje změnu úhlu natočení lodi podle stisku kláves PageDown a PageUp */  
  rotate() {
    /* Byla-li stisknuta klávesa PageDown (kód 33), loď se pootočí o 10° proti směru hodinových ručiček */
    if (keyIsDown(33)) {
      this.angle -= 10;
    }
    /* Byla-li stisknuta klávesa PageUp (kód 34), loď se pootočí o 10° ve směru hodinových ručiček */    
    if (keyIsDown(34)) {
      this.angle += 10;
    }
  }

  /* Metoda provádí vykreslení kosmické lodi */
  draw() {
    /* Nejprve je vyvolána metoda move(), aby se ověřil možný pohyb lodi */
    this.move();
    /* Vyvolána metoda rotate() kvůli ověření rotace lodi */
    this.rotate();
    /* Nastavení barvy výplně: https://p5js.org/reference/#/p5/fill */
    fill('#ff0000');
    /* Nastavení pozicování obdélníku: https://p5js.org/reference/#/p5/rectMode */
    /* V tomto případě místo standardní předvolby CORNER (levý horní roh) použijeme CENTER (střed) */
    rectMode(CENTER);
    /* Metodou push() se zahajuje nějaká transformace objektu: uloží se aktuální stav kreslicího režimu */
    /* https://p5js.org/reference/#/p5/push */
    push();
    /* Metodou translate() se přemístí střed transformace do určitého bodu na plátně. */
    /* V našem případě potřebujeme otáčet lodí přesně v jejím středu. */
    /* viz https://p5js.org/reference/#/p5/translate */
    translate(this.x, this.y);
    /* Provedeme rotaci o určený úhel, který musíme převést na radiány */
    /* viz https://p5js.org/reference/#/p5/rotate */
    rotate(((2 * PI) / 360) * this.angle);
    /* Vykreslení obdélníku: https://p5js.org/reference/#/p5/rect */
    /* Kvůli transformaci vykreslujeme obdélník na souřadnicích 0,0 */
    //rect(0, 0, this.w, this.h, 10, 10);
    /* Metoda pop() vrací kreslicí režim do původního stavu - uloženého metodou push() */
    /* https://p5js.org/reference/#/p5/pop */
    image(blastImage, -this.w / 2, this.h / 2 -20, this.w, this.w);
    image(shipImage, -this.w / 2, -this.h / 2);
    
    pop();
  }
}

class Misile {
  constructor (x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.size = 6;
    this.speed = 10;
  }

  draw() {
    stroke(255);
    fill('yellow');
    circle(this.x, this.y, this.size);
  }

}

/****************************************************************************************************************************/

function preload() {
  shipImage = loadImage('img/spaceship.png');
  blastImage = loadImage('img/blast.gif');
}

/***************************************************************************************************************************/
/* Funkce pro základní nastavení aplikace v P5 JS */
function setup() {
  /* Vytvoří plátno podle velikosti displeje: https://p5js.org/reference/#/p5/createCanvas */
  canvas = createCanvas(displayWidth, displayHeight);
  /* Vytvoření objektu kosmické lodi pomocí konstruktoru třídy SpaceShip */
  /* Souřadnice středu kosmické lodi budou nastaveny na střed obrazovky */
  spaceShip = new SpaceShip(width / 2, height / 2);
}

/* Funkce pro vykreslení plátna */
function draw() {
  /* Nastaví černou barvu pozadí: https://p5js.org/reference/#/p5/background */
  background(0);
  /* Vyvolání metody draw() provede vykreslení objektu kosmické lodi */
  spaceShip.draw();
}

/* Funkce pro změnu velikosti plátna podle velikosti okna */
function windowResized() {
  /* Změní velikost plátna podle rozměrů okna: https://p5js.org/reference/#/p5/resizeCanvas */  
  resizeCanvas(windowWidth, windowHeight);
}
