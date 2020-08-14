// Audio Setup
const audio = document.getElementById('audio');
audio.volume = '0.6';

document.getElementById('music-btn').addEventListener('click', function () {
  if (this.classList.contains('is-active')) {
    audio.pause();
    this.classList.remove('is-active');
    this.setAttribute('title', 'play');
  } else {
    audio.play();
    this.classList.add('is-active');
    this.setAttribute('title', 'pause');
  }
});

// Canvas Starts
const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

const c2 = document.getElementById('canvas2');
const ctx2 = c2.getContext('2d');

c.width = innerWidth;
c.height = innerHeight;

c2.width = innerWidth;
c2.height = innerHeight;

const pencilImg = document.getElementById('pencil');

const minmax = (min, max) => Math.floor(Math.random() * (max - min) + min);

class Walker {
  constructor() {
    this.r = 2;
    this.x = c.width / 2;
    this.y = c.height / 2;
    this.moveBy = 3;

    this.changeColor = this.changeColor.bind(this);
    this.changeColor();
  }

  reset() {
    this.x = c.width / 2;
    this.y = c.height / 2;
  }

  changeColor() {
    ctx.fillStyle = `rgb(${minmax(0, 256)}, ${minmax(0, 256)}, ${minmax(
      0,
      256
    )})`;
    setTimeout(this.changeColor, 5000);
  }

  draw() {
    ctx2.drawImage(pencilImg, this.x, this.y - 100, 55, 100);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    const rN = minmax(0, 4);
    this.r = minmax(1, 5);

    if (rN === 0) this.x += this.moveBy;
    else if (rN === 1) this.x -= this.moveBy;
    else if (rN === 2) this.y += this.moveBy;
    else this.y -= this.moveBy;

    if (this.x < 0 || this.x > c.width || this.y < 0 || this.y > innerHeight) {
      this.reset();
    }
  }
}

const walker = new Walker();

function animate() {
  ctx2.clearRect(0, 0, c2.width, c2.height);
  walker.update();
  walker.draw();

  requestAnimationFrame(animate);
}

animate();
