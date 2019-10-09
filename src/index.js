import Phaser from "phaser";

// INICIALIZAÇÃO
const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 450,
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
let palheta, bola, blocosVermelho, blocosAmarelo, blocosVerde, blocosAzul, blocosBranco, controleTeclado;
let pontuacao, labelPontuacao;

// RECURSOS
import spritePalheta from "./assets/images/palheta.png";
import spriteBola from "./assets/images/bola.png";
import spriteBloco1 from "./assets/images/bloco1.png";
import spriteBloco2 from "./assets/images/bloco2.png";
import spriteBloco3 from "./assets/images/bloco3.png";
import spriteBloco4 from "./assets/images/bloco4.png";
import spriteBloco5 from "./assets/images/bloco5.png";

// CENA PRINCIPAL
function preload() {
  this.load.image('palheta', spritePalheta);
  this.load.image('bola', spriteBola);
  this.load.image('bloco1', spriteBloco1);
  this.load.image('bloco2', spriteBloco2);
  this.load.image('bloco3', spriteBloco3);
  this.load.image('bloco4', spriteBloco4);
  this.load.image('bloco5', spriteBloco5);
};

function create() {
  this.cameras.main.setBackgroundColor('#312e2f');

  pontuacao = 0;
  labelPontuacao = this.add.text(15, 20, "Score:0");

  controleTeclado = this.input.keyboard.createCursorKeys();
  palheta = this.physics.add.sprite(260, 400, 'palheta');
  palheta.setImmovable(true);
  palheta.setCollideWorldBounds(true);

  bola = this.physics.add.sprite(192, 300, 'bola');
  bola.setVelocityY(200);
  bola.setVelocityX(200);
  bola.setBounce(1);
  bola.setCollideWorldBounds(true);

  blocosVermelho = this.physics.add.group({
    key: 'bloco1',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 60,
      stepX: 54
    }
  });

  blocosAmarelo = this.physics.add.group({
    key: 'bloco2',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 85,
      stepX: 54
    }
  });

  blocosVerde = this.physics.add.group({
    key: 'bloco3',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 110,
      stepX: 54
    }
  });

  blocosAzul = this.physics.add.group({
    key: 'bloco4',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 135,
      stepX: 54
    }
  });

  blocosBranco = this.physics.add.group({
    key: 'bloco5',
    repeat: 6,
    immovable: true,
    setXY: {
      x: 38,
      y: 160,
      stepX: 54
    }
  });

  this.physics.add.collider(bola, blocosVermelho, acertaBloco, null, this);
  this.physics.add.collider(bola, blocosAmarelo, acertaBloco, null, this);
  this.physics.add.collider(bola, blocosVerde, acertaBloco, null, this);
  this.physics.add.collider(bola, blocosAzul, acertaBloco, null, this);
  this.physics.add.collider(bola, blocosBranco, acertaBloco, null, this);
  this.physics.add.collider(bola, palheta, acertaPalheta, null, this);
  this.physics.world.checkCollision.down = false;

};

function update() {
  // Estado do jogo
  if (checaGameOver(this.physics.world)) {
    this.scene.restart();
  }

  // Controle
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
  return blocosVermelho.countActive() + blocosAmarelo.countActive() + blocosVerde.countActive() + blocosAzul.countActive() + blocosBranco.countActive() === 0;
}

function acertaBloco(bola, bloco) {
  pontuacao += 10;
  labelPontuacao.text = 'Score:' + pontuacao;

  bloco.disableBody(true, true);
};

function acertaPalheta(bola, jogador) {
  bola.setVelocityY(bola.body.velocity.y - 5);

  let novaVelocidadeX = Math.abs(bola.body.velocity.x) + 5;
  if (bola.x < palheta.x) {
    bola.setVelocityX(-novaVelocidadeX);
  } else {
    bola.setVelocityX(novaVelocidadeX);
  }
}