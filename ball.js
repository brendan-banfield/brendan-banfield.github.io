function setup() {
  createCanvas(400, 400);
  background("#20ff41");
  fill("#ff20ec");
  noStroke();
}

balls = [{x: 200, y: 200, xm: 10, ym: 0, color: "#ff20ec"}, {x: 5, y: 5, xm: 5, ym: 5, color: "#0000ff"}];
var i;
var balldistance = [];
var selected;
var mouse = false
var prevMouse = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];

function draw() {
  clear();
  background("#20ff41");
  for (i = 0; i < balls.length; i += 1) {
    fill(balls[i].color);
    circle(balls[i].x, balls[i].y, 16);
  }
  
  
  prevMouse.pop();
  prevMouse.splice(0, 0, {x: mouseX, y: mouseY});
  if (mouse) {
    mouse.x = mouseX;
    mouse.y = mouseY;
    balls[selected] = {x: mouseX, y: mouseY, xm: 0, ym: 0, color: balls[selected].color};
  }
  physics();
  
}

function mousePressed() {
  mouse = true;
  balldistance = Infinity;
  for (i = 0; i < balls.length; i += 1) {
    if (Math.hypot(mouseX - balls[i].x, mouseY - balls[i].y) < balldistance) {
      balldistance = Math.hypot(mouseX - balls[i].x, mouseY - balls[i].y);
      selected = i;
      
    }
  }
}

function mouseReleased() {
  //using custom variables instead of isMousePressed to make sure the ball doesnt move in draw() before its momentum is changed
  mouse = false;
  balls[selected].xm = (mouseX - prevMouse[4].x) / 5;
  balls[selected].ym = (mouseY - prevMouse[4].y) / 5;
}

function physics() {
  for (i = 0; i < balls.length; i += 1) {
    balls[i].y += balls[i].ym;
    balls[i].ym += 0.5;
    if (balls[i].y > height - 8 || balls[i].y < 8) {
      //Without Math.floor, the ball's ym increases over time
      balls[i].ym = -Math.floor(balls[i].ym);
    }

    balls[i].x += balls[i].xm;
    if (balls[i].x < 8 || balls[i].x > width - 8) {
      balls[i].xm *= -1;
    }
  }
}
