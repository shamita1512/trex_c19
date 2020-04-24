var trex, trex_Animation, ground, ground_Image,invGround,clouds_Image,clouds,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obs,cloudsGroup, obstacleGroup,end_trex,gameOver_image,restart_image,gameOver,restart;
var PLAY = 1;
var END = 0;
var gameState= PLAY;
function preload(){
  
  trex_Animation = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_Image = loadImage("ground2.png");
  clouds_Image= loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  end_trex=loadImage("trex_collided.png");
  gameOver_image = loadImage("gameOver.png");
  restart_image = loadImage("restart.png");
}
function setup() {
  createCanvas(400, 400);
  trex = createSprite(30,370,20,20);
  trex.scale = 0.5;
  trex.addAnimation("trex",trex_Animation);
  trex.debug = true;
  ground = createSprite(200,380,20,20);
  ground.addImage("ground",ground_Image);
  invGround = createSprite(200,390,400,20);
  invGround.visible = false;
  cloudsGroup = new Group();
  obstacleGroup = new Group();
  gameOver = createSprite(200,200,20,20);
  gameOver.addImage("gameOver", gameOver_image);
  gameOver.visible=false;
  gameOver.scale=0.5;
  restart=createSprite(200,250,20,20);
  restart.addImage("restart", restart_image);
  restart.scale=0.5;
  restart.visible=false;
  
}

function draw() {
  background("blue");
  
  if(gameState === PLAY){
  if(keyDown("space")){
    trex.velocityY= -2;
  }
  trex.velocityY = trex.velocityY + 0.3;
  
  ground.velocityX = -2;
  if(ground.x<0){
    ground.x = ground.width/2;
  }
    spawnClouds();
  spawnObstacles();
    if(obstacleGroup.isTouching(trex)){
      gameState = END;
    }
  }
  else if(gameState === END){
   trex.addImage("trex", end_trex);
    ground.velocityX=0;
    trex.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    restart.visible=true;
    gameOver.visible=true;
    
  }
  trex.collide(invGround);
  if(mousePressedOver(restart)){
    
  reset();
  }
  drawSprites();
}
function spawnClouds(){
   if(frameCount % 60 ===0){
    clouds = createSprite(390,150,20,20);
     clouds.scale = 0.5;
    clouds.velocityX=-5;
    clouds.addImage  ("clouds",clouds_Image);
     clouds.lifetime=134;
     clouds.y= random(50,150);
     cloudsGroup.add(clouds);
   }
  }
function spawnObstacles(){
  if(frameCount % 45 === 0){
  obs=createSprite(390,360,20,20);
  
  obs.velocityX=-5;
    var rand = Math.round( random(1,6));
    switch(rand){
      case 1: obs.addImage("1",obstacle1);
        break;
        case 2: obs.addImage("2",obstacle2);
        break;
        case 3: obs.addImage("3", obstacle3);
        break;
        case 4: obs.addImage("4", obstacle4);
        break;
        case 5: obs.addImage("5", obstacle5);
        break;
        case 6: obs.addImage("6",obstacle6);
        break;
        default: break;
        
    }
    obs.scale = 0.5;
    obs.lifetime = 134;
    obstacleGroup.add(obs);
  }
}
function reset(){
  gameState = PLAY;
  restart.visible=false;
  gameOver.visible=false;
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.addAnimation("trex",trex_Animation);
}
