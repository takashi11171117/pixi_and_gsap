import * as PIXI from 'pixi.js';
import {
  TweenMax,
  TimelineLite
} from "gsap";

let canvas = document.createElement('canvas');
document.getElementById('canvas-container').appendChild(canvas);


let renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
  view: canvas,
  resolution: window.devicePixelRatio
});

// 端末のピクセル比に合わせて Canvas 縮小
if(navigator.isCocoonJS) {
  // CocoonJS の ScreenCanvas（Canvas+ 用の爆速 Canvas）を オン
  canvas.screencanvas = true;
  // CocoonJS ならこれでスクリーンにフィットされる
  canvas.style.cssText = 'idtkscale:ScaleToFill';
} else {
  // ブラウザでは CSS Transform でフィットさせる（縮小）
  let canvasScale = 1 / window.devicePixelRatio;
  canvas.style.webkitTransform = 'scale3d(' + canvasScale + ',' + canvasScale + ',' + canvasScale + ')';
  canvas.style.webkitTransformOrigin = '0 0';
  canvas.style.transform = 'scale3d(' + canvasScale + ',' + canvasScale + ',' + canvasScale + ')';
  canvas.style.transformOrigin = '0 0';
}

let stage = new PIXI.Stage(0x263332);

let animate = () => {
  requestAnimationFrame(animate);
  renderer.render(stage);
};

requestAnimationFrame(animate);

window.addEventListener('resize', () => {
  renderer.resize(window.innerWidth, window.innerHeight);
}, false);

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
  // 画像リソースからテクスチャー生成
  let titleTexture = PIXI.Texture.fromImage(titleImageUrl);

  // テクスチャーのデバイスピクセル比対応
  titleTexture.baseTexture.resolution = window.devicePixelRatio;

  // 表示要素を生成
  title = new PIXI.Sprite(titleTexture);

  // タイトルを左上に配置
  title.x = 20;
  title.y = 20;

  // ステージに配置して表示
  stage.addChild(title);
});

// 指定した範囲内のランダム数値を返す
const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

// 指定した範囲内のランダム数値（整数）を返す
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const animateDropTween = (element) => {
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

var colors = [
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

for(let i = 0; i < colors.length; i++) {
  let rectangle = new PIXI.Graphics();
  rectangle.beginFill(colors[i]);
  rectangle.drawRect(-5, 0, 5, 100);
  rectangle.alpha = 0;

  stage.addChild(rectangle);

  animateDropTween(rectangle);
}

let particle_num = 8;
let x = 100;

for (let i = 0; i < particle_num; i++) {
  let rectangle = new PIXI.Graphics();
  rectangle.beginFill('0xffffff');
  rectangle.drawRect(x, 0, 5, 100);
  rectangle.alpha = 1;

  stage.addChild(rectangle);
  x = 100 * (i + 1);
}