
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

server.listen(process.env.PORT);



app.post('/log', async (request, reply) => { 
  console.log(request.query)
//  let params = request.query.raw ? {} : { seo: seo };

  // Flag to indicate we want to show the poll results instead of the poll form
//  params.results = true;
//  let options;
});

