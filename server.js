
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

pp.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

server.listen(process.env.PORT);

