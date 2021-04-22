//Create variables here
var dog, happyDog, databse, foodS, foodStock;
var dogimg, dogimg1;



function preload()
{
  //load images here

  dogimg = loadImage("images/dogImg.png");
  dogimg1 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();
  console.log(database);
  
  dog = createSprite(250,250);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readstock);

  if (keyWentDown(UP_ARROW))
  {
    writestock(foodS);
    dog.addImage(dogimg1);
  }
}

function draw() {  
  background(46, 139, 87)

  drawSprites();
  //add styles here
  fill("white")
  textSize(13);
  text("Note: Press the Up arrow key to feed Drago Milk!", 120,120);

}

function readstock(data)
{
  foodS = data.val();
}

function writeStock(x)
{

  if(x<=0)
  {
    x = 0;
  }else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}