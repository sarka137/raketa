/* Globální proměnné a konstanty */
/* Proměnná pro uložení objektu kosmické lodi */
let spaceShip;
/* Proměnné pro uložení rastrových obrázků spojených s objektem kosmické lodi */
let shipImage, blastImage, asteroidImage;
/* Proměnná typu pole pro uložení objektů střel vypouštěných z kosmické lodi */
let missiles = [];
let asteroids = [];
/* Proměnná frame slouží počítá snímků */
let frame = 0

/********************************************************************************************************/
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

  /* Metoda provede vypuštění střel po stisku klávesy Space (mezerník) - kód 32 */  
  fire() {
    /* Jestliže hráč stiskl klávesu mezerník (kód 32) */
    if (keyIsDown(32)) {
      /* Nastavuje kadenci vypouštění střel - každý pátý snímek (frame) */
      //if (frame % 5 == 0)
        /* Do pole missiles se přidá nový prvek - objekt střely */
        /* Počáteční bod střely je nastaven na střed kosmické lodi */
        /* Úhel výstřelu vychází z úhlu, pod kterým je natočena kosmická loď - 90° */
        missiles.push(new Missile(this.x, this.y, this.angle - 90));
    }
  }

  /* Metoda provádí vykreslení kosmické lodi */
  draw() {
    /* Nejprve je vyvolána metoda move(), aby se ověřil možný pohyb lodi */
    this.move();
    /* Vyvolána metoda rotate() kvůli ověření rotace lodi */
    this.rotate();
    /* Kontrola, zda došlo k vypuštění nějaké střely z lodi */
    this.fire();
    /* Nastavení barvy výplně: https://p5js.org/reference/#/p5/fill */
    fill('#ff0000');
    /* Nastavení pozicování obdélníku: https://p5js.org/reference/#/p5/rectMode */
    /* V tomto případě místo standardní předvolby CORNER (levý horní roh) použijeme CENTER (střed) */
    rectMode(CENTER);
    /* Metodou push() se zahajuje transformace objektu: uloží se aktuální stav kreslicího režimu */
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
    /* Vykreslí animovaný blast.gif ve spodní části kosmické lodi */
    image(blastImage, -20, 20, 40, 40);
    /* Vykreslí obrázek kosmické lodi od bodu -20, -40 vůči středu obdélníku */
    image(shipImage, -20, -40);
    /* Metoda pop() vrací kreslicí režim do původního stavu - uloženého metodou push() */
    /* https://p5js.org/reference/#/p5/pop */
    pop();
  }
}

/********************************************************************************************************/
/* Třída Missile - návrh střely */
class Missile {
  /* Při vytváření objektu střely předáme souřadnice jejího středu a úhel */
  constructor(x, y, angle) {
    /* Pozicové souřadnice - střed střely */
    this.y = y;
    this.x = x;
    /* Úhel střely */
    this.angle = angle;
    /* Velikost střely */
    this.size = 6;
    /* Rychlost střely */
    this.speed = 10;
  }

  /* Metoda move() vypočítává posun pozice střely při zadané rychlosti a pod daným úhlem */
  move() {
    /* https://www.matweb.cz/goniometrie/ */
    this.x += this.speed * Math.cos((this.angle * Math.PI) / 180);
    this.y += this.speed * Math.sin((this.angle * Math.PI) / 180);
  }

  /* Metoda draw() vykresluje střelu jako kruh */  
  draw() {
    /* Nejprve se provede aktualizace pozice */
    this.move();
    /* Nastaví bílý obrys a žlutou výplň */ 
    stroke(255);
    fill('yellow');
    /* Vykreslí se kruh se středem v bodě this.x, this.y a o průměru this.size */
    /* https://p5js.org/reference/#/p5/circle */
    circle(this.x, this.y, this.size);
  }
}

class Asteroid {
  constructor() {
    this.size = random(20,50);
    this.x = random(0, width - this.size);
    this.y = -this.size;
    this.speed = random(1,3);
    this.angle = random(0,359);
    
  }

  move () {
    this.y += this.speed;
  }

  rotate() {
    this.angle += this.speed;
  }

  draw() {
    this.move();
    this.rotate();
    push();
    translate(this.x + this.size / 2, this.y + this.size / 2);
    rotate((this.angle * PI) / 180);
    fill('red');
    image(asteroidImage, -this.size / 2, -this.size / 2, this.size, this.size);
    pop();
  }
}

/*******************************************************************************************************/
/* Funkce preload() je provedena před načtením aplikace. */
/* Jde o tzv. asynchronní funkci; až po jejím dokončení je provedena funkce setup(). */
/* Měla by sloužit výhradně k načítání externích zdrojů - tj. obrázků, fontů nebo datových souborů. */
/* https://p5js.org/reference/#/p5/preload. */
function preload() {
  /* Načtení grafických souborů do proměnných */
  /* https://p5js.org/reference/#/p5/loadImage */
  shipImage = loadImage("img/spaceship.png");
  blastImage = loadImage("img/blast.gif");
  asteroidImage = loadImage("img/asteroid.png");
}

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
  /* Provede navýšení počtu snímků v proměnné frame */
  frame++;
  /* Nastaví černou barvu pozadí: https://p5js.org/reference/#/p5/background */
  background(0);
  /* Vyvolání metody draw() provede vykreslení objektu kosmické lodi */
  spaceShip.draw();
  /* Vykreslí všechny objekty střel uložené v poli missiles */
  /* missile = aktuálně načtený prvek-objekt pole */
  /* idx = index aktuálně načteného prvku */
  /* arr = proměnná zastupující celé pole - v tomto případě missiles */
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach */
  missiles.forEach((missile, idx, arr) => {
    /* Střela se vykreslí s použitím metody draw() */
    missile.draw();
    /* Ověření, zda souřadnice středu střely nejsou mimo zobrazovanou oblast (0, 0, canvas.width, canvas.height) */
    if (
      missile.y > height ||
      missile.y < 0 ||
      missile.x < 0 ||
      missile.x > width
    ) {
      /* Pokud je střela mimo oblast plátna, provede se její odstranění z pole */
      /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice */
      arr.splice(idx, 1);
    }    
  });
  if (frame % 60 == 0) asteroids.push(new Asteroid());
  
  
  asteroids.forEach((asteroid, idx, arr) =>{
    if (asteroid.y > height) arr.splice(idx, 1);
    asteroid.draw();
    missiles.forEach((missiles, index, array) => {
      if (collideRectCircle(asteroid.x, asteroid.y, asteroid.size, asteroid.size, missiles.x, missiles.y, missiles.size /2)){
        arr.splice(idx, 1);
        array.splice(index, 1);
      }
    })
  })
}

/* Funkce pro změnu velikosti plátna podle velikosti okna */
function windowResized() {
  /* Změní velikost plátna podle rozměrů okna: https://p5js.org/reference/#/p5/resizeCanvas */  
  resizeCanvas(windowWidth, windowHeight);
}
