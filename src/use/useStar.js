import { ref } from "vue";
import BgImg from "../assets/images/bg.jpg";
export function useStar() {
  let canvas = ref(null);
  let ctx = ref(null);
  let w = ref(0);
  let h = ref(0);
  let stars = [];
  // 定义时间变量 控制星星更新频率
  let lastTime = ref(0);
  let deltaTime = ref(0);
  let timer = ref(0);
  let img = ref(new Image());

  function init(num = 50, imgUrl = BgImg) {
    // 根据 num 循环生成多个星星
    for (let i = 0; i < num; i++) {
      let obj = new Star();
      stars.push(obj);
      stars[i].init();
    }
    lastTime.value = Date.now();
    img.value.src = imgUrl;
  }

  function initCanvas(id = "canvas") {
    canvas.value = document.getElementById(id);
    ctx.value = canvas.value.getContext("2d");
    w.value = document.body.offsetWidth;
    h.value = document.body.offsetHeight;
    canvas.value.height = h.value;
    canvas.value.width = w.value;
  }
  function loop() {
    window.requestAnimationFrame(loop);
    let nowTime = Date.now();
    deltaTime.value = nowTime - lastTime.value;
    lastTime.value = Date.now();
    timer.value += deltaTime.value;
    if (timer.value > 260) {
      drawBg();
      drawStar();
      timer.value = 0;
    }
  }
  function drawStar() {
    // 向画布绘制星星
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.update();
      star.draw();
    }
  }
  // 星星类
  class Star {
    constructor() {
      this.x;
      this.y;
      this.xNum;
      this.yNum;
      this.start;
    }
    // 星星初始化方法 初始化星星基础数据
    init() {
      // Math.floor() 返回小于或等于一个给定数字的最大整数
      this.x = Math.floor(Math.random() * w.value);
      this.y = Math.floor(Math.random() * h.value - 350);
      this.start = Math.floor(Math.random() * 5);
      this.xNum = Math.random() * 3 - 1.5;
      this.yNum = Math.random() * 3 - 1.5;
    }
    // 更新星星
    update() {
      this.x += this.xNum * deltaTime.value * 0.03;
      this.y += this.yNum * deltaTime.value * 0.03;
      this.start += 1;
      this.start %= 5;
      // 当 x 或 y < 0 时 或 x > w 或 y < h 时判定星星已经超出了区域
      if (
        this.x < 0 ||
        this.y < 0 ||
        this.x > w.value ||
        this.y > h.value - 350
      ) {
        this.init();
      }
    }
    // 画星星
    draw() {
      ctx.value.save();
      ctx.value.beginPath();
      let startM = this.start / 3;
      ctx.value.lineTo(this.x + startM, this.y - startM);
      ctx.value.lineTo(this.x + this.start, this.y);
      ctx.value.lineTo(this.x + startM, this.y + startM);
      ctx.value.lineTo(this.x, this.y + this.start);
      ctx.value.lineTo(this.x - startM, this.y + startM);
      ctx.value.lineTo(this.x - this.start, this.y);
      ctx.value.lineTo(this.x - startM, this.y - startM);
      ctx.value.lineTo(this.x, this.y - this.start);
      ctx.value.strokeStyle = "#fff";
      ctx.value.fillStyle = "#fff";
      ctx.value.fill();
      ctx.value.closePath();
      ctx.value.stroke();
      ctx.value.restore();
    }
  }
  // 绘制背景
  function drawBg() {
    ctx.value.drawImage(img.value, 0, 0, w.value, h.value);
  }
  return { initCanvas, init, loop };
}
