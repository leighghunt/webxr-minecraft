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


    
      log("position")
      log(player.getAttribute("position"))

      var angle = player.getAttribute("rotation")
      log("angle")
      log(angle)


    
    if (evt.detail.y > 0.95) { 

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
      
          log("DOWN"); }
    
    if (evt.detail.y < -0.95) { console.log("UP"); }
    if (evt.detail.x < -0.95) { console.log("LEFT"); }
    if (evt.detail.x > 0.95) { console.log("RIGHT"); }
    
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
  
}, 5000);