var GAME_WIDTH = 500;
var GAME_HEIGHT = 500;
var GAME_SCALE = 4;

// Character movement constants:
var MOVE_LEFT = 1;
var MOVE_RIGHT = 2;
var MOVE_UP = 3;
var MOVE_DOWN = 4;
var MOVE_NONE = 0;
var DIM = 16;

var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: GAME_WIDTH, height: GAME_HEIGHT});
gameport.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// our menu that will offer the player to 'play', see 'instructions', or see 'credits'
var openingScene = new PIXI.Container();
openingScene.visible = true;
openingScene.interactive = true;

var howToScene = new PIXI.Container();
howToScene.visible = false;
howToScene.interactive = false;

var playScene = new PIXI.Container();
playScene.x = GAME_SCALE;
playScene.y = GAME_SCALE;
playScene.visible = false;
playScene.interactive = false;

var creditsScene = new PIXI.Container();
creditsScene.visible = false;
creditsScene.interactive = false;

var texture = PIXI.Texture.from("assets/title_screen.png")
var menu_background = new PIXI.Sprite(texture);

var lava, brick, grass, pumpkinHead;

PIXI.loader
    .add('assets/test_map.json')
    .add('assets/tiles.png')
    .add('assets/pumpkin_man.png')
    .load(loadMenu)

function loadMenu()
{
    creditsScene.visible = false;
    creditsScene.interactive = false;
    openingScene.visible = true;
    openingScene.interactive = true;

    menu_background.width = renderer.screen.width;
    menu_background.height = renderer.screen.height;
    openingScene.addChild(menu_background);

    let title_text = new PIXI.Text(
        'Halloween\nSpook-Tacular',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 50,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});
    title_text.x = 250;
    title_text.y = 200;
    title_text.anchor.x = .5;
    title_text.anchor.y = .5;
    openingScene.addChild(title_text);

    // add play button
    var playBtn = new PIXI.Sprite(PIXI.Texture.from("assets/Sprite_Start_Button.png"));
    playBtn.position.x = 180;
    playBtn.position.y = 350;
    playBtn.anchor.x = .5;
    playBtn.anchor.y = .5;
    playBtn.buttonMode = true;
    playBtn.interactive = true;
    playBtn.buttonMode = true;
    playBtn.on('pointerdown', onPlayButtonDown);

    openingScene.addChild(playBtn);

    // add credits button
    var credsBtn = new PIXI.Sprite(PIXI.Texture.from("assets/Sprite_Credits_Button.png"));
    credsBtn.position.x = 320;
    credsBtn.position.y = 350;
    credsBtn.anchor.x = .5;
    credsBtn.anchor.y = .5;
    credsBtn.buttonMode = true;
    credsBtn.interactive = true;
    credsBtn.buttonMode = true;
    credsBtn.on('pointerdown', onCredButtonDown);

    openingScene.addChild(credsBtn);

    var howToBtn = new PIXI.Sprite(PIXI.Texture.from("assets/Sprite_How_To_Play.png"));
    howToBtn.position.x = 250;
    howToBtn.position.y = 400;
    howToBtn.anchor.x = .5;
    howToBtn.anchor.y = .5;
    howToBtn.buttonMode = true;
    howToBtn.interactive = true;
    howToBtn.buttonMode = true;
    howToBtn.on('pointerdown', onHowTo);

    openingScene.addChild(howToBtn);
}

function onHowTo()
{
    howToScene.visible = true;
    howToScene.interactive = true;
    openingScene.visible = false;
    openingScene.interactive = false;

 
    var instructions = new PIXI.Sprite(PIXI.Texture.from("assets/title_screen.png"));
    instructions.width = renderer.screen.width;
    instructions.height = renderer.screen.height;
    howToScene.addChild(instructions);

    // add menu title
    var quit = new PIXI.Sprite(PIXI.Texture.from("assets/Sprite_Quit.png"));
    quit.position.x = 450;
    quit.position.y = 20;
    quit.anchor.x = .5;
    quit.anchor.y = .5;
    quit.buttonMode = true;
    quit.interactive = true;
    quit.buttonMode = true;
    quit.on('pointerdown', loadMenu);

    howToScene.addChild(quit);
}

function onPlayButtonDown() 
{
    playScene.visible = true;
    playScene.interactive = true;
    openingScene.visible = false;
    openingScene.interactive = false;

    createjs.Ticker.setFPS(60);
    var tu = new TileUtilities(PIXI);
    world = tu.makeTiledWorld("assets/test_map.json", "assets/tiles.png");
    playScene.addChild(world);

    lava = world.getObject("Lava").data;

    var pumpkinHead = new PIXI.Sprite(PIXI.loader.resources["assets/pumpkin_man.png"].texture);
    pumpkinHead.gx = 9;
    pumpkinHead.gy = 5;
    pumpkinHead.x = pumpkinHead.gx*DIM;
    pumpkinHead.y = pumpkinHead.gx*DIM;
    pumpkinHead.anchor.x = .5;
    pumpkinHead.anchor.y = 1;

    // add menu title
    var quit = new PIXI.Sprite(PIXI.Texture.from("assets/Sprite_Quit.png"));
    quit.position.x = 450;
    quit.position.y = 20;
    quit.anchor.x = .5;
    quit.anchor.y = .5;
    quit.buttonMode = true;
    quit.interactive = true;
    quit.buttonMode = true;
    quit.on('pointerdown', loadMenu);

    pumpkinHead.moving = false;
    pumpkinHead.direction = MOVE_NONE;

    playScene.addChild(quit);
}

function onCredButtonDown() {
    creditsScene.visible = true;
    creditsScene.interactive = true;
    openingScene.visible = false;
    openingScene.interactive = false;

    var credits_board = new PIXI.Sprite(PIXI.Texture.from("assets/title_screen.png"));
    credits_board.width = renderer.screen.width;
    credits_board.height = renderer.screen.height;
    creditsScene.addChild(credits_board);
    let people_text = new PIXI.Text(
        'Chloe Bates\nKyle Watson\nSamantha Muellner',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 25,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    people_text.x = 250;
    people_text.y = 260;
    people_text.anchor.x = .5;
    people_text.anchor.y = .5;
    creditsScene.addChild(people_text);

    let creds_title_text = new PIXI.Text(
        'CREDITS',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 75,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    creds_title_text.x = 250;
    creds_title_text.y = 125;
    creds_title_text.anchor.x = .5;
    creds_title_text.anchor.y = .5;
    creditsScene.addChild(creds_title_text);

    // add menu title
    var quit = new PIXI.Sprite(PIXI.Texture.from("assets/Sprite_Quit.png"));
    quit.position.x = 450;
    quit.position.y = 20;
    quit.anchor.x = .5;
    quit.anchor.y = .5;
    quit.buttonMode = true;
    quit.interactive = true;
    quit.buttonMode = true;
    quit.on('pointerdown', loadMenu);

    creditsScene.addChild(quit);
}

//Adds sprites to the game

/***************** CODE BETWEEN THESE LINES IS FROM PALMERS *******************/


// The move function starts or continues movement
function move() {

//   if (pumpkinHead.direction == MOVE_NONE) {
//     pumpkinHead.moving = false;
//     return;
//   }

//   var dx = 0;
//   var dy = 0;

//   if (pumpkinHead.direction == MOVE_LEFT) dx -= 1;
//   if (pumpkinHead.direction == MOVE_RIGHT) dx += 1;
//   if (pumpkinHead.direction == MOVE_UP) dy -= 1;  
//   if (pumpkinHead.direction == MOVE_DOWN) dy += 1;

//   if (lava[(pumpkinHead.gy+dy-1)*12 + (pumpkinHead.gx+dx)] != 0) {
//     pumpkinHead.moving = false;
//     return;
//   }

//   pumpkinHead.gx += dx;
//   pumpkinHead.gy += dy;

//   pumpkinHead.moving = true;
  
//   createjs.Tween.get(pumpkinHead).to({x: pumpkinHead.gx*DIM, y: pumpkinHead.gy*DIM}, 250).call(move);

}

// Keydown events start movement
window.addEventListener("keydown", function (e) {
    // e.preventDefault();
    // if (!pumpkinHead) return;
    // if (pumpkinHead.moving) return;
    // if (e.repeat == true) return;
    
    // pumpkinHead.direction = MOVE_NONE;
  
    // if (e.keyCode == 87)
    //   pumpkinHead.direction = MOVE_UP;
    // else if (e.keyCode == 83)
    //   pumpkinHead.direction = MOVE_DOWN;
    // else if (e.keyCode == 65)
    //   pumpkinHead.direction = MOVE_LEFT;
    // else if (e.keyCode == 68)
    //   pumpkinHead.direction = MOVE_RIGHT;
  
    // move();
});

// Keyup events end movement
window.addEventListener("keyup", function onKeyUp(e) {
//   e.preventDefault();
//   if (!pumpkinHead) return;
//   pumpkinHead.direction = MOVE_NONE;
});

function update_camera() {
//   playScene.x = -pumpkinHead.x*GAME_SCALE + GAME_WIDTH/2 - pumpkinHead.width/2*GAME_SCALE;
//   playScene.y = -pumpkinHead.y*GAME_SCALE + GAME_HEIGHT/2 + pumpkinHead.height/2*GAME_SCALE;
//   playScene.x = -Math.max(0, Math.min(world.worldWidth*GAME_SCALE - GAME_WIDTH, -playScene.x));
//   playScene.y = -Math.max(0, Math.min(world.worldHeight*GAME_SCALE - GAME_HEIGHT, -playScene.y));
}

/***************** CODE BETWEEN THESE LINES IS FROM PALMERS *******************/



function animate()
{
    requestAnimationFrame(animate);

    if(openingScene.visible)
    {
        renderer.render(openingScene);
    }
    else if(creditsScene.visible)
    {
        renderer.render(creditsScene);
    }
    else if(howToScene.visible)
    {
        renderer.render(howToScene);
    }
    else if(playScene.visible)
    {
        renderer.render(playScene);
        update_camera();
    }
}

animate();
