const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isShoot = false;

const spaceImage = new Image();
      spaceImage.src = "space.png";

const fireImage = new Image();
      fireImage.src = "fire.gif";



class Circle {
  constructor() {
    this.x = Math.random() * window.innerWidth + 3;
    this.y = -10;
    this.radius = 30;
    this.velocity = 0.9;
    this.width = 20;
    this.height = 25;
    this.draw();
  }

  draw() {
    // context.beginPath();
    // context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    // context.fillStyle = "blue";
    
    // context.fill();

    context.drawImage(fireImage, this.x, this.y , this.width,this.height);
  }

  update() {
    this.y++;
    this.velocity *= 0.9;
    this.draw();
  }
}

class ShootCircle {
  constructor( x ) {
    this.x = x;
    this.y = window.innerHeight - 30;
    this.radius = 6;
    this.velocity = 0.9;
    this.draw();
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = "blue";
    context.fill();
    
  }

  update() {
    if (isShoot) {
      this.y -= 1;
      this.velocity += 0.9;
    }
    this.draw();
  }
}

class Controller {
  constructor() {

    this.width = 50;
    this.height = 70;

    this.x = window.innerWidth / 2 - 25;
    this.y = window.innerHeight - this.height
    ;
 
  }

  draw() {
    context.beginPath();
    // context.fillStyle = "red";
    // context.fillRect(this.x, this.y, this.width, this.height);
    // context.fill();
    context.drawImage(spaceImage, this.x, this.y , this.width,this.height);
  }

  update(increment , is) {

  
    console.log( window.innerWidth) 

    if( this.x + this.width >= window.innerWidth && is)
        return;
    else if( this.x  <= 0 && is == false)
        return;

    

    this.x += increment;
    this.draw();
  }
}

const circles = [];
const controller = new Controller();

const bullets = [];


console.log(controller);

setInterval(() => {
  circles.push(new Circle());
}, 1000);

const animate = () => {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.fillStyle = "rgba(0,0,0,.1)";
  context.fillRect(0, 0, window.innerWidth, window.height);
  context.fill();

  controller.draw();
  

  circles.forEach((circle, idx) => {
    circle.update();

    if (circle.y === window.innerHeight + circle.radius) {
      circles.splice(idx, 1);
    }

      const x1 = circle.x;
      const y1 = circle.y;

      bullets.forEach( (shootCircle , index)=>{

          shootCircle.update();

          const x2 = shootCircle.x;
          const y2 = shootCircle.y;


          const isIntersectValue = Math.sqrt((x1 - x2) * (x1 - x2)  + (y1 - y2) * (y1 - y2) );

        

          if(Math.floor(isIntersectValue)  <= circle.radius + shootCircle.radius){
            circles.splice(idx, 1);
            bullets.splice(index,1);
          }

    })




  });

  requestAnimationFrame(animate);
};


window.addEventListener("keydown", (event) => {


  switch(event.code){

      case "ArrowRight":
        controller.update(20 , true) ;
        return;
      case "ArrowLeft":
        controller.update(-20 , false);
        return;
      case "Enter":
        const shootCircle = new ShootCircle(controller.x + controller.width / 2);
        bullets.push(shootCircle);
        isShoot = true;
        return;


  }




});

animate();
