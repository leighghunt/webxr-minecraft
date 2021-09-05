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

const materialGrass = 'color: white; shader: flat; src: ' + 'https://cdn.glitch.com/ca24c99b-0f67-450c-9e50-c2124065384c%2Fgrass.png?v=1630797451891'

var world = {
  blocks: []
}

for(var xIndex = -10; xIndex <= 10; ++xIndex){

  for(var yIndex = -0.5; yIndex <= -0.5; ++yIndex){

    for(var zIndex = -10; zIndex <= 10; ++zIndex){


      world.blocks.push(
        {
          position: {
            x: xIndex,
            y: yIndex,
            z: zIndex
          },
          material: materialGrass
        }
      )
    }
  }
}

world.blocks.push(
  {
    position: {
      x: 0,
      y: 1,
      z: -5
    },
    material: 'color: blue;'
  }
)



var sceneEl = document.querySelector('a-scene');

console.log(world.blocks.length)

for(var blockIndex = 0; blockIndex < world.blocks.length; ++blockIndex){

  var entityEl = document.createElement('a-box');
  entityEl.setAttribute('geometry', {
    primitive: 'box',
    height: 1,
    width: 1
  });

//  console.log(world.blocks[blockIndex].x)

  console.log(world.blocks[blockIndex])

  
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


      // <a-box position="-1 4 -3" rotation="0 0 15" color="#4CC3D9" constraint="target: #target;" dynamic-body body="type: static; shape: cone; addCollideEventListener: true; collisionFlags: 4"></a-box>


