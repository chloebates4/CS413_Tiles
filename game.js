var gameport = document.getElementById("gameport");
var gameWidth = 1000; 
var gameHeight = 800;
var renderer = PIXI.autoDetectRenderer( { width: gameWidth, height: gameHeight, backgroundColor: 0xBF4E15	} ); 
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();
var title = new PIXI.Container();
var instructions = new PIXI.Container();
var credits = new PIXI.Container();

//Adds sprites to the game 


function keydownEventHandler(e) 
{ 

}

function animate()
{
    requestAnimationFrame(animate);
    //player.rotation += 0.1;
    renderer.render(stage);
}

document.addEventListener('keydown', keydownEventHandler);
animate();