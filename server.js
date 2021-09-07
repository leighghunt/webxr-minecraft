
const express = require('express');
var Sequelize = require('sequelize');
const {Op} = require('sequelize');
const axios = require('axios');

const moment = require('moment');

const app = express();

// Setup SocketIO
var server = require('http').Server(app);
const io = require('socket.io')(server);
// var cron = require('node-cron');

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.use(express.static('public'));
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

server.listen(process.env.PORT);



app.post('/log_', async (request, reply) => { 
  console.log(request.query)

  console.log(request.body)

  reply.status(200).send("OK")
//  let params = request.query.raw ? {} : { seo: seo };

  // Flag to indicate we want to show the poll results instead of the poll form
//  params.results = true;
//  let options;
});

app.post('/log', (req, res) => {
  console.log(req.body.messages)
  res.status(200).send("OK")
})
