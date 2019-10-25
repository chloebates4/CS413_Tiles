var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: 500, height: 500});
gameport.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// our menu that will offer the player to 'play', see 'instructions', or see 'credits'
var openingScene = new PIXI.Container();
openingScene.visible = true;

var texture = PIXI.Texture.from("assets/title_screen.png")
var menu_background = new PIXI.Sprite(texture);

PIXI.loader
    .load(loadMenu)

function loadMenu()
{
    menu_background.width = renderer.screen.width;
    menu_background.height = renderer.screen.height;
    openingScene.addChild(menu_background);

    // add play button
    var playBtn = new PIXI.Sprite(PIXI.Texture.from("assets/play_button_spooky.png"));
    playBtn.position.x = 100;
    playBtn.position.y = 400;
    playBtn.buttonMode = true;
    playBtn.interactive = true;
    playBtn.buttonMode = true;
    playBtn
        .on('pointerdown', onPlayButtonDown);

    openingScene.addChild(playBtn);

    // add credits button
    var credsBtn = new PIXI.Sprite(PIXI.Texture.from("assets/credits_button_spooky.png"));
    credsBtn.position.x = 500;
    credsBtn.position.y = 410;
    credsBtn.buttonMode = true;
    credsBtn.interactive = true;
    credsBtn.buttonMode = true;
    credsBtn
        .on('pointerdown', onCredButtonDown);

    openingScene.addChild(credsBtn);
}


function onPlayButtonDown() 
{
    // // load game background
    // var game_board = new PIXI.Sprite(PIXI.Texture.from("assets/temp_background.png"));
    // game_board.width = renderer.screen.width;
    // game_board.height = renderer.screen.height;
    // stage.addChild(game_board);

    // // add menu button
    // var menuBtn = new PIXI.Sprite(PIXI.Texture.from("assets/temp_button_menu.png"));
    // menuBtn.position.x = 20;
    // menuBtn.position.y = 520;
    // menuBtn.buttonMode = true;
    // menuBtn.interactive = true;
    // menuBtn.buttonMode = true;
    // menuBtn
    //     .on('pointerdown', loadMenu);

    // stage.addChild(menuBtn);

    // let people_text = new PIXI.Text(
    //     'How to play: use W, A, S, D keys to move the hand to gather the leaves. ',
    //     {fontFamily : "\"Courier New\", Courier, monospace",
    //         fontSize: 15,
    //         fontWeight: "bold",
    //         fill : ["#fa0"],
    //         align : 'center'});

    // people_text.x = 10;
    // people_text.y = 10;
    // stage.addChild(people_text);
}

function onCredButtonDown() {
    // var credits_board = new PIXI.Sprite(PIXI.Texture.from("assets/temp_background.png"));
    // credits_board.width = renderer.screen.width;
    // credits_board.height = renderer.screen.height;
    // stage.addChild(credits_board);
    // let people_text = new PIXI.Text(
    //     'Chloe Bates\nKyle Watson\nSamantha Muellner',
    //     {fontFamily : "\"Courier New\", Courier, monospace",
    //         fontSize: 25,
    //         fontWeight: "bold",
    //         fill : ["#fa0"],
    //         align : 'center'});

    // people_text.x = 300;
    // people_text.y = 285;
    // stage.addChild(people_text);

    // let creds_title_text = new PIXI.Text(
    //     'CREDITS',
    //     {fontFamily : "\"Courier New\", Courier, monospace",
    //         fontSize: 75,
    //         fontWeight: "bold",
    //         fill : ["#fa0"],
    //         align : 'center'});

    // creds_title_text.x = 225;
    // creds_title_text.y = 35;
    // stage.addChild(creds_title_text);

    // // add menu title
    // var menuBtn = new PIXI.Sprite(PIXI.Texture.from("assets/temp_button_menu.png"));
    // menuBtn.position.x = 20;
    // menuBtn.position.y = 520;
    // menuBtn.buttonMode = true;
    // menuBtn.interactive = true;
    // menuBtn.buttonMode = true;
    // menuBtn
    //     .on('pointerdown', loadMenu);

    // stage.addChild(menuBtn);
}



//Adds sprites to the game




function keydownEventHandler(e)
{

}

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(openingScene);
}

document.addEventListener('keydown', keydownEventHandler);
animate();
