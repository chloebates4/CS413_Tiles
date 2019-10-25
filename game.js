var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: 500, height: 500});
gameport.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// our menu that will offer the player to 'play', see 'instructions', or see 'credits'
var openingScene = new PIXI.Container();
openingScene.visible = true;

var howToScene = new PIXI.Container();
howToScene.visible = false;

var playScene = new PIXI.Container();
playScene.visible = false;

var creditsScene = new PIXI.Container();
creditsScene.visible = false;

var texture = PIXI.Texture.from("assets/title_screen.png")
var menu_background = new PIXI.Sprite(texture);

PIXI.loader
    .load(loadMenu)

function loadMenu()
{
    creditsScene.visible = false;
    openingScene.visible = true;

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
    // howToScene.visible = true;
    // openingScene.visible = false;
}


function onPlayButtonDown() 
{
    // playScene.visible = true;
    // openingScene.visible = false;
}

function onCredButtonDown() {
    creditsScene.visible = true;
    openingScene.visible = false;

    var credits_board = new PIXI.Sprite(PIXI.Texture.from("assets/temp_background.png"));
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




function keydownEventHandler(e)
{

}

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
    
}

document.addEventListener('keydown', keydownEventHandler);
animate();
