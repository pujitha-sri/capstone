  var PLAY =1;
 var END =0;
 var gameState = PLAY ;
 var rockectImg ;
 var space,invisableGround;
 var starsGroup,stars;
 var score =0;
 var spaceImg;
 var ashtrodesGroup,ashtrode1,ashtrode2,ashtrode3 ;
 

function preload(){
    spaceImg = loadImage("space.jpg");
    
 rockectImg= loadImage("rockect.jpg");
    
    stars = loadImage("star1.png","star2.png");
    ashtrode1 =loadImage("ashtrode1.png");
    ashtrode2 =loadImage("ashtrode2.png");
    ashtrode3 =loadImage("ashtrode3.png");

    starImg =loadAnimation("star1.png","star2.png");
    gameOverImg = loadImage("game Over.jpg");
}

function setup() {
    createCanvas(200, 200);
  
    rockect = createSprite(50,70,20,50);
  
  
    rockect.addImage(rockectImg );
    rockect.setCollider('circle',0,0,350)
    rockect.scale = 0.08

   invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  space = createSprite(width/2,height,width,2);
  space.addImage("space",spaceImg);
  space.x = width/2
 space.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  gameOver.scale = 0.5;

  gameOver.visible = false;

  starsGroup = new Group();
  ashtrodesGroup = new Group();
  
  score = 0;

}

function draw() {
    background(spaceImg);
    textSize(20);
    fill("black")
    text("Score: "+ score,30,50);
    
    
    if ( gameState === PLAY){
      score = score + Math.round(getFrameRate()/60);
      space.velocityY = -(6 + 3*score/100);
      
      if((touches.length > 0 || keyDown("SPACE")) && round.y  >= height-120) {
    
        rockect.velocityY = -10;
         touches = [];
      }

      rockect.velocityY = rockect.velocityY + 0.8
  
      if (spaceImg.x < 0){
        space.x = space.width/2;
      }
    
      rockect.collide(invisibleGround);
     
      spawnStars();
      spawnAshtrodes();
    
      if(ashtrodesGroup.isTouching(trex)){
        gameState = END;
    }
    else if (gameState === END) {
        gameOver.visible = true;
        
        //set velcity of each game object to 0
        space.velocityX = 0;
       rockect.velocityY = 0;
        ashtrodesGroup.setVelocityXEach(0);
        starsGroup.setVelocityXEach(0);

        //set lifetime of the game objects so that they are never destroyed
     ashtrodesGroup.setLifetimeEach(-1);
    starsGroup.setLifetimeEach(-1);

    if(touches.length>0 || keyDown("SPACE")) {      
        reset();
        touches = []
      }
    }
    
    
    drawSprites();
  }

  function spawnStars() {
    //write code here to spawn the stars
    if (frameCount % 60 === 0) {
      var stars= createSprite(width+20,height-300,40,10);
      stars.y = Math.round(random(100,220));
      stars.addAnimation("star",cloudImg);
      stars.scale = 0.5;
      stars.velocityX = -3;

       //assign lifetime to the variable
    stars.lifetime = 300;
    
    //adjust the depth
    stars.depth = stars.depth;
    stars.depth = stars.depth+1;
    
    //add each stars to the group
    starsGroup.add(stars);
  }

   function spawnAshtrodesGroup (){
    if(frameCount % 60 === 0) {
      var ashtrodes = createSprite(600,height-95,20,30);
      ashtrodes.setCollider('circle',0,0,45)
      // ashtorde.debug = true
    
      ashtrodes.velocityX = -(6 + 3*score/100);

      //generate random ashtrode
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ashtrodes.addImage(ashtrode1);
              break;
      case 2: ashtrodes.addImage(ashtrode2);
              break;
      case 3: ashtrodes.addImage(ashtrode3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the ashtrode          
    ashtrodes.scale = 0.3;
    ashtrodes.lifetime = 300;
    ashtrodes.depth = ashtrodes.depth;
    ashtrodes.depth +=1;
    //add each ashtrode to the group
    ashtrodesGroup.add(ashtrodes);
    
  } }}}