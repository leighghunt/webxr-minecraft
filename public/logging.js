/* global AFRAME */

var messages = [];

// alert("Hello from logging.js")

AFRAME.registerComponent('thumbstick-logging',{
  init: function () {
    log('setting up logThumbstick listener')
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
  },
  logThumbstick: function (evt) {
    // log('logThumbstick')
    
    // var player = document.querySelector("a-entity[camera]")
    var player = document.querySelector("#cameraWrapper")
    var camera = document.querySelector("a-entity[camera]")

    var angle = camera.getAttribute("rotation")
    // log("angle")
    // log(angle)
      

    // calculate the angles
    // the camera's theta == 0 is actually 90' in the clipspace
    let theta = (angle.x * Math.PI / 180) + Math.PI / 2 
    let fi = angle.y * Math.PI / 180
    let r = .1
    // calculate the position shifts

    log('angle.y')
    log(angle.y)
    log('Math.cos(fi)')
    log(Math.cos(fi))
    let z = Math.sin(theta) * Math.cos(fi) * r * evt.detail.y
    let x = Math.sin(theta) * Math.sin(fi) * r * evt.detail.y
    
    z += Math.sin(theta) * Math.sin(fi) * -1 * r * evt.detail.x
    x += Math.sin(theta) * Math.cos(fi) * r * evt.detail.x
    
    // Don't do Y. That's too funky!
    // let y = Math.cos(theta) * r * evt.detail.y

    player.object3D.position.x += x
    // player.object3D.position.y += y
    player.object3D.position.z += z

    
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