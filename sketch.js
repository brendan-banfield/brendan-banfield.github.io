function setup() {
  createCanvas(400, 400);
  background("#20ff41");
  fill("#ff20ec");
  noStroke();
}

ball = {x: 200, y: 200, xm: 10, ym: 0};
var mouse = false
var prevMouse = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];

function draw() {
  clear();
  background("#20ff41");
  circle(ball.x, ball.y, 16);
  prevMouse.pop();
  prevMouse.splice(0, 0, {x: mouseX, y: mouseY});
  if (mouse) {
    mouse.x = mouseX;
    mouse.y = mouseY;
    ball = {x: mouseX, y: mouseY, xm: 0, ym: 0};
  } else {
    physics();
  }
}

function mousePressed() {
  mouse = true;
}

function mouseReleased() {
  //using custom variables instead of isMousePressed to make sure the ball doesnt move in draw() before its momentum is changed
  mouse = false;
  ball.xm = (mouseX - prevMouse[4].x) / 5;
  ball.ym = (mouseY - prevMouse[4].y) / 5;
}

function physics() {
  ball.y += ball.ym;
  ball.ym += 0.5;
  if (ball.y > height - 8 || ball.y < 8) {
    //Without Math.floor, the ball's ym increases over time
    ball.ym = -Math.floor(ball.ym);
  }
  
  ball.x += ball.xm;
  if (ball.x < 8 || ball.x > width - 8) {
    ball.xm *= -1;
  }
}