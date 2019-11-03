window.addEventListener('load', function() {
    document.getElementById('tedy-bear').appendChild(app.view);
})

window.addEventListener('resize', function() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  
    dude.x = app.screen.width / 2;
    dude.y = app.screen.height / 2;
})

const app = new PIXI.Application({
    transparent: true,
    width: window.innerWidth,
    height: window.innerHeight 
});

//app.renderer.resize(window.innerWidth, window.innerHeight);

let tapCounter = 0;

// create a texture from an image path
const texture = PIXI.Texture.from('images/bunny1.png');

// create a second texture
const secondTexture = PIXI.Texture.from('images/bunny2.png');

// create a new Sprite using the texture
const dude = new PIXI.Sprite(texture);

dude.interactive = true;
dude.buttonMode = true;
dude.scale.set(1);
dude.anchor.set(0.5);
dude.x = app.screen.width / 2;
dude.y = app.screen.height / 2;



 dude.on('pointertap', onPointerTap)
  // events for drag start
 dude.on('mousedown', onDragStart)
 dude.on('touchstart', onDragStart)
 // events for drag end
 dude .on('mouseup', onDragEnd)
 dude .on('mouseupoutside', onDragEnd)
 dude.on('touchend', onDragEnd)
 dude.on('touchendoutside', onDragEnd)
 // events for drag move
 dude.on('mousemove', onDragMove)
 dude .on('touchmove', onDragMove);

 app.stage.addChild(dude);

 app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    dude.rotation += 0.1;
});


// ----------------- helper functions --------------------------------

let switchTexture = false;

function onPointerTap() {
    if(tapCounter == 0){
        // first click, start timer
        setTimeout(resetCounter, 300)
    }

    if(++tapCounter >= 2){
        // second click, change dude texture
        changeTexture();
        tapCounter = 0;
    }
}

function resetCounter(){
    tapCounter = 0;
}

function changeTexture() {
    switchTexture = !switchTexture;
    if (switchTexture) {
        dude.texture = secondTexture;
    } else {
        dude.texture = texture;
    }
}

function animate() {

    requestAnimationFrame(animate);

    // render the stage
    renderer.render(stage);
}

function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd()
{
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}