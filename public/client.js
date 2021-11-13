/* global AFRAME */

const materialGrass = 'color: white; shader: flat; src: ' + 'https://cdn.glitch.com/ca24c99b-0f67-450c-9e50-c2124065384c%2Fgrass.png?v=1630797451891'
//const materialGrass = 'color: white; shader: flat; src: ' + 'https://cdn.glitch.com/ca24c99b-0f67-450c-9e50-c2124065384c%2Fgrass.8x8.png?v=1630989644528'
//const materialGrass = 'color: green;'






var messages = [];


var world = {
  blocks: []
}

var worldWidth = 3
var worldLength = 3
var worldDepth = 1

for(var xIndex = -(worldWidth-1)/2; xIndex <= (worldWidth-1)/2; ++xIndex){

  for(var yIndex = -(worldDepth-1) - 0.5; yIndex <= -0.5; ++yIndex){

    // for(var zIndex = -(worldDepth-1)/2; zIndex <= (worldDepth-1)/2; ++zIndex){
    for(var zIndex = -(worldLength-1)/2; zIndex <= (worldLength-1)/2; ++zIndex){



      world.blocks.push(
        {
          position: {
            x: xIndex,
            y: yIndex,
            z: zIndex
          },
          // material: 'color: green;'

          material: materialGrass}
        )
    }
  }
}





var sceneEl = document.querySelector('a-scene');
var player = document.querySelector("a-entity[camera]")
// console.log(player)
// alert(player)
// console.log(world.blocks.length)

for(var blockIndex = 0; blockIndex < world.blocks.length; ++blockIndex){

  var entityEl = document.createElement('a-box');
  entityEl.setAttribute('geometry', {
    primitive: 'box',
    height: 1,
    width: 1
  });

//  console.log(world.blocks[blockIndex].x)

  // console.log(world.blocks[blockIndex])

  
  entityEl.setAttribute('position', world.blocks[blockIndex].position)

//  entityEl.setAttribute('material', 'color', 'red');

  entityEl.setAttribute('material', world.blocks[blockIndex].material);



  entityEl.setAttribute('dynamic-body', {
    shape: 'box',
    mass: 1.5,
    linearDamping: 0.005
  });

  // Do `.setAttribute()`s to initialize the entity.
  sceneEl.appendChild(entityEl);

}







log('Loaded client.js');

function log(message){
  console.log(message)
  messages.push(message)
}

setInterval(function(){
  console.log("timer")
  
  if(messages.length>0){
    console.log(messages)
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/log", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        messages: messages
    }));

    messages = []
    
  }
  
}, 5000);


// setInterval(function(){

//   log("Position update!")
//   log("position")
//   log(player.getAttribute("position"))

//   var angle = player.getAttribute("rotation")
//   log("angle")
//   log(angle)
// }, 10000)
