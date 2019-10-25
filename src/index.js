import Phaser from "phaser";

// INICIALIZAÇÃO
const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 640,
  scale: {
    autoCenter: Phaser.Scale.CENTER_VERTICALLY 
  },
  scene: {
    key: 'main',
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    gravity: false,
    default: 'arcade',
  },
};

const game = new Phaser.Game(config);

// VARIAVEIS DO JOGO
let palheta, bola, blocos1, blocos2, blocos3, blocos4, blocos5, blocos6, blocos7, blocos8;
let controleTeclado, controleToque;
let pontuacao, labelPontuacao;
let imgBotaoEsquerda, imgBotaoDireita;

// RECURSOS
import spritePalheta from "./assets/images/palheta.png";
import spriteBola from "./assets/images/bola.png";
import spriteBloco1 from "./assets/images/bloco1.png";
import spriteBloco2 from "./assets/images/bloco2.png";
import spriteBloco3 from "./assets/images/bloco3.png";
import spriteBloco4 from "./assets/images/bloco4.png";
import spriteBloco5 from "./assets/images/bloco5.png";
import buttonEsquerda from "./assets/images/esquerda.png";
import buttonDireita from "./assets/images/direita.png";

// CENA PRINCIPAL
function preload() {
  this.load.image('palheta', spritePalheta);
  this.load.image('bola', spriteBola);
  this.load.image('bloco1', spriteBloco1);
  this.load.image('bloco2', spriteBloco2);
  this.load.image('bloco3', spriteBloco3);
  this.load.image('bloco4', spriteBloco4);
  this.load.image('bloco5', spriteBloco5);
  this.load.image('esquerda', buttonEsquerda);
  this.load.image('direita', buttonDireita);
};

function create() {
  window.addEventListener('resize', resize);
  resize();

  this.cameras.main.setBackgroundColor('#312e2f');

  pontuacao = 0;
  labelPontuacao = this.add.text(15, 20, "Score:0");

  palheta = this.physics.add.sprite(game.scale.width, game.scale.height - 120, 'palheta');
  palheta.setImmovable(true);
  palheta.setCollideWorldBounds(true);

  bola = this.physics.add.sprite(192, 300, 'bola');
  bola.setVelocityY(200);
  bola.setVelocityX(200);
  bola.setBounce(1);
  bola.setCollideWorldBounds(true);

  blocos1 = this.physics.add.group({
    key: 'bloco1',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 60,
      stepX: 54
    }
  });

  blocos2 = this.physics.add.group({
    key: 'bloco2',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 85,
      stepX: 54
    }
  });

  blocos3 = this.physics.add.group({
    key: 'bloco3',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 110,
      stepX: 54
    }
  });

  blocos4 = this.physics.add.group({
    key: 'bloco4',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 135,
      stepX: 54
    }
  });

  blocos5 = this.physics.add.group({
    key: 'bloco5',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 160,
      stepX: 54
    }
  });

  blocos6 = this.physics.add.group({
    key: 'bloco1',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 185,
      stepX: 54
    }
  });

  blocos7 = this.physics.add.group({
    key: 'bloco2',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 210,
      stepX: 54
    }
  });

  blocos8 = this.physics.add.group({
    key: 'bloco3',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 235,
      stepX: 54
    }
  });

  // Controles
  controleTeclado = this.input.keyboard.createCursorKeys();
  controleToque = this.input.activePointer;
  imgBotaoEsquerda = this.physics.add.sprite(50, game.scale.height - 50, 'esquerda');
  imgBotaoDireita = this.physics.add.sprite(350, game.scale.height - 50, 'direita');

  imgBotaoEsquerda.setInteractive().on('pointerover', function () {
    controleTeclado['left'].isDown = true
  });
  imgBotaoEsquerda.setInteractive().on('pointerout', function () {
    controleTeclado['left'].isDown = false
  });

  imgBotaoDireita.setInteractive().on('pointerover', function () {
    controleTeclado['right'].isDown = true
  });
  imgBotaoDireita.setInteractive().on('pointerout', function () {
    controleTeclado['right'].isDown = false
  });

  this.physics.add.collider(bola, blocos1, acertaBloco, null, this);
  this.physics.add.collider(bola, blocos2, acertaBloco, null, this);
  this.physics.add.collider(bola, blocos3, acertaBloco, null, this);
  this.physics.add.collider(bola, blocos4, acertaBloco, null, this);
  this.physics.add.collider(bola, blocos5, acertaBloco, null, this);
  this.physics.add.collider(bola, blocos6, acertaBloco, null, this);
  this.physics.add.collider(bola, blocos7, acertaBloco, null, this);
  this.physics.add.collider(bola, blocos8, acertaBloco, null, this);
  this.physics.add.collider(bola, palheta, acertaPalheta, null, this);
  this.physics.world.checkCollision.down = false;
  

};

function update() {
  // Estado do jogo
  if (checaGameOver(this.physics.world)) {
    this.scene.restart();
  } else if (checaJogoGanho()) {
    this.scene.restart();
  }

  if (controleTeclado.left.isDown) {
    palheta.body.setVelocityX(-300);
  } else if (controleTeclado.right.isDown) {
    palheta.body.setVelocityX(300);
  } else {
    palheta.body.setVelocityX(0);
  }  

};

// FUNÇÕES
function checaGameOver(world) {
  return bola.body.y > world.bounds.height; // retorna true em positivo
}

function checaJogoGanho() {
  return blocos1.countActive() + blocos2.countActive() + blocos3.countActive() + blocos4.countActive() + blocos5.countActive() + blocos6.countActive() + blocos7.countActive() + blocos8.countActive() === 0;
}

function acertaBloco(bola, bloco) {
  pontuacao += 10;
  labelPontuacao.text = 'Score:' + pontuacao;

  bloco.disableBody(true, true);
};

function acertaPalheta(bola, jogador) {
  bola.setVelocityY(bola.body.velocity.y - 30);

  let novaVelocidadeX = Math.abs(bola.body.velocity.x) + 5;
  if (bola.x < palheta.x) {
    bola.setVelocityX(-novaVelocidadeX);
  } else {
    bola.setVelocityX(novaVelocidadeX);
  }
};

function resize() {
  var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
  var wratio = width / height, ratio = canvas.width / canvas.height;

  if (wratio < ratio) {
    canvas.style.width = width + "px";
    canvas.style.height = (width / ratio) + "px";
  } else {
    canvas.style.width = (height * ratio) + "px";
    canvas.style.height = height + "px";
  }
}