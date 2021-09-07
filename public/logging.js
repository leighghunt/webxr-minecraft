/* global AFRAME */

var messages = [];


AFRAME.registerComponent('thumbstick-logging',{
  init: function () {
    log('setting up logThumbstick listener')
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
  },
  logThumbstick: function (evt) {
    log('logThumbstick')

    //log('evt')
    //log(evt)

    //log('evt.detail')
    //log(evt.detail)
    
    var player = document.querySelector("a-entity[camera]")


    
      // log("position")
      // log(player.getAttribute("position"))

      var angle = player.getAttribute("rotation")
      // log("angle")
      // log(angle)


          // calculate the angles
          // the camera's theta == 0 is actually 90' in the clipspace
          let theta = (angle.x * Math.PI / 180) + Math.PI / 2 
          let fi = angle.y * Math.PI / 180
          let r = 10
          // calculate the position shifts
          let z = Math.sin(theta) * Math.cos(fi) * r
          let x = Math.sin(theta) * Math.sin(fi) * r
          let y = Math.cos(theta) * r

          // update the position
          var pos = player.getAttribute("position")
          var newPos = {x: pos.x,
                       y: pos.y,
                       z: pos.z}
          log(pos)
    log(x)

    log(y)

    log(z)

          newPos.x -= x;
          newPos.y -= y;
          newPos.z -= z;
          log("Moving")
          log(newPos)
          player.setAttribute("position", newPos);
    
    
    if (evt.detail.y > 0.95) { 

      
          log("DOWN"); }
    
    if (evt.detail.y < -0.95) { log("UP"); }
    if (evt.detail.x < -0.95) { log("LEFT"); }
    if (evt.detail.x > 0.95) { log("RIGHT"); }
    
  }
});


log('Loaded logging.js');

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
  
}, 100);