import * as PIXI from 'pixi.js';
import {
  TweenMax,
  TimelineMax
} from "gsap";

let canvas = document.createElement('canvas');
document.getElementById('canvas-container').appendChild(canvas);


let renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
  view: canvas,
  resolution: window.devicePixelRatio
});

let stage = new PIXI.Stage(0x263332);

let canvasScale = 1 / window.devicePixelRatio;
canvas.style.transform = 'scale3d(' + canvasScale + ',' + canvasScale + ',' + canvasScale + ')';
canvas.style.transformOrigin = '0 0';

let animate = function () {
  requestAnimationFrame(animate);
  renderer.render(stage);
};

requestAnimationFrame(animate);

window.addEventListener('resize', function () {
  renderer.resize(window.innerWidth, window.innerHeight);
}, false);

let suffix = '';
if (window.devicePixelRatio > 2) {
  suffix = '@3x';
} else if (window.devicePixelRatio > 1) {
  suffix = '@2x';
}

let titleImageUrl = './images/title' + suffix + '.png';

console.log(titleImageUrl);

PIXI.loader.add('title', titleImageUrl)
  .load(function (loader, resources) {})

assetLoader.on('onComplete', function () {
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