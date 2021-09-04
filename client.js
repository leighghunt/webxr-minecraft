// var sphere = document.getElementById('sphere');

// var cylinder = document.getElementById('cylinder');

// cylinder.body.angularVelocity.set(1, 1, 1)

// console.log("el....")
// console.log(el)

// setInterval(function(){
//   var positionSphere = sphere.getAttribute('position')
//   positionSphere.y+=0.005
//   sphere.setAttribute('position', positionSphere);
  

//   var positionCylinder = cylinder.getAttribute('position')
//   positionCylinder.x-=0.001
//   cylinder.setAttribute('position', positionCylinder);


// }, 50)
//0 1.25 -5

var world = {
  blocks: []
}

for(var xIndex = -10; xIndex <= 10; ++xIndex){
  world.blocks.push(
    {
      x: xIndex,
      y:1,
      z:-5
    }
  )
}

for(var blockIndex = 0; blockIndex < world.blocks.length; ++blockIndex){
  
}

var sceneEl = document.querySelector('a-scene');
var entityEl = document.createElement('a-box');
entityEl.setAttribute('geometry', {
  primitive: 'box',
  height: 1,
  width: 1
});
entityEl.setAttribute('position', {x: 1, y: 2, z: -5})

entityEl.setAttribute('material', 'color', 'red');


entityEl.setAttribute('dynamic-body', {
  shape: 'box',
  mass: 1.5,
  linearDamping: 0.005
});

      // <a-box position="-1 4 -3" rotation="0 0 15" color="#4CC3D9" constraint="target: #target;" dynamic-body body="type: static; shape: cone; addCollideEventListener: true; collisionFlags: 4"></a-box>


// Do `.setAttribute()`s to initialize the entity.
sceneEl.appendChild(entityEl);