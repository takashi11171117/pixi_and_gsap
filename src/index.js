import * as PIXI from 'pixi.js';
import _ from 'lodash';
import {
  TweenMax,
  TimelineLite
} from "gsap";

const ticker = new PIXI.ticker.Ticker();
const renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
const stage = new PIXI.Container();
let rectangles = [];

setup();
moveManyline();

function setup() {
  // Fullscreen in pixi is resizing the renderer to be window.innerWidth by window.innerHeight
  window.addEventListener("resize", function () {
    renderer.resize(window.innerWidth, window.innerHeight);
  });

  document.body.appendChild(renderer.view);

  createText();
  createParticle();
  createManyline();
  
  ticker.stop();
  ticker.add(() => {
    renderer.render(stage);
  });
  ticker.start();
}

function createText() {
  let title;
  let suffix = '';
  if (window.devicePixelRatio > 2) {
    suffix = '@3x';
  } else if (window.devicePixelRatio > 1) {
    suffix = '@2x';
  }
  let titleImageUrl = './images/title' + suffix + '.png';
  const loader = new PIXI.loaders.Loader();
  loader.add('title', titleImageUrl);
  loader.load((loader, resources) =>  {
    let titleTexture = PIXI.Texture.fromImage(titleImageUrl);
    titleTexture.baseTexture.resolution = window.devicePixelRatio;
    title = new PIXI.Sprite(titleTexture);
    title.x = 20;
    title.y = 20;
    stage.addChild(title);
  });
}

// 指定した範囲内のランダム数値を返す
function getRandomArbitrary (min, max) {
  return Math.random() * (max - min) + min;
};

// 指定した範囲内のランダム数値（整数）を返す
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function animateDropTween (element) {
  let fromX = getRandomInt(5, window.innerWidth - 10);
  let fromY = getRandomInt(0, window.innerHeight / 4);
  let distY = getRandomArbitrary(100, window.innerHeight);

  let duration = getRandomArbitrary(0.5, 1);
  let delay = getRandomArbitrary(0.3, 0.9);

  let timeline = new TimelineLite({
    delay: delay,
    paused: true,
    onComplete: () => {
      animateDropTween(element)
    }
  });

  timeline.add(
    TweenMax.fromTo(element, duration, {
      alpha: 0,
      x: fromX,
      y: fromY
    }, {
      alpha: 1,
      y: fromY + distY / 2,
      ease: Linear.easeNone,
    })
  );

  timeline.add(
    TweenMax.to(element, duration, {
      alpha: 0,
      y: fromY + distY,
      ease: Linear.easeNone,
    })
  );

  timeline.play();
};

function createManyline() {
  const colors = [
    0x1abc9c, 0x16a085,
    0x2ecc71, 0x27ae60,
    0x3498db, 0x2980b9,
    0x9b59b6, 0x8e44ad,
    0xf1c40f, 0xf39c12,
    0xe67e22, 0xd35400,
    0xe74c3c, 0xc0392b,
    0xecf0f1, 0xbdc3c7,
    0x95a5a6, 0x7f8c8d
  ];

  for (let i = 0; i < colors.length; i++) {
    let rectangle = new PIXI.Graphics();
    rectangle.beginFill(colors[i]);
    rectangle.drawRect(-5, 0, 5, 100);
    rectangle.alpha = 0;

    stage.addChild(rectangle);
    rectangles.push(rectangle);
  }
}

function moveManyline() {
  _.each(rectangles, (rectangle) => {
    animateDropTween(rectangle);
  })
}

function createParticle() {
  let particle_num = 8;
  let move = 100;

  for (let i = 0; i < particle_num; i++) {
    let rectangle = new PIXI.Graphics();
    rectangle.beginFill('0xffffff');
    rectangle.drawRect(renderer.width / 2, renderer.height / 2, 100, 100);
    rectangle.alpha = 1;

    stage.addChild(rectangle);
  }
}