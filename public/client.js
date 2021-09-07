/* global AFRAME */

const materialGrass = 'color: white; shader: flat; src: ' + 'https://cdn.glitch.com/ca24c99b-0f67-450c-9e50-c2124065384c%2Fgrass.png?v=1630797451891'
//const materialGrass = 'color: white; shader: flat; src: ' + 'https://cdn.glitch.com/ca24c99b-0f67-450c-9e50-c2124065384c%2Fgrass.8x8.png?v=1630989644528'
//const materialGrass = 'color: green;'




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
console.log(player)
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


AFRAME.registerComponent('thumbstick-logging',{
  init: function () {
    console.log('setting up logThumbstick listener')

    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
  },
  logThumbstick: function (evt) {
    console.log('logThumbstick')

    console.log('evt')
    console.log(evt)

    console.log('evt.detail')
    console.log(evt.detail)

    
    if (evt.detail.y > 0.95) { 
      console.log("position")
      console.log(player.getAttribute("position"))

      var angle = player.getAttribute("rotation")
      console.log("angle")
      console.log(angle)

          // calculate the angles
          // the camera's theta == 0 is actually 90' in the clipspace
          let theta = (angle.x * Math.PI / 180) + Math.PI / 2 
          let fi = angle.y * Math.PI / 180
          let r = 0.1
          // calculate the position shifts
          let z = Math.sin(theta) * Math.cos(fi) * r
          let x = Math.sin(theta) * Math.sin(fi) * r
          let y = Math.cos(theta) * r

          // update the position
          var pos = player.getAttribute("position")
          pos.x -= x;
          pos.y -= y;
          pos.z -= z;
          player.setAttribute("position", pos);
      
      console.log("DOWN"); }
    if (evt.detail.y < -0.95) { console.log("UP"); }
    if (evt.detail.x < -0.95) { console.log("LEFT"); }
    if (evt.detail.x > 0.95) { console.log("RIGHT"); }
    
  }
});

AFRAME.registerComponent('trigger-logging',{
  init: function () {
    this.el.addEventListener('triggerchanged', this.logTrigger);
  },
  logTrigger: function (evt) {
    log('logTrigger')

    log('evt')
    log(evt)

    log('evt.detail')
    log(evt.detail)

  }
});

log('remote log test 2');

function log(message){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/log", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      message: message
  }));
}