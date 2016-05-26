var azure = require('azure-storage');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;
var tableSvc = azure.createTableService();
var mytablename = process.env.mytablename;
var mypartitionkey = process.env.mypartitionkey;
var myrowkey = process.env.myrowkey;

tableSvc.retrieveEntity(mytablename, mypartitionkey, myrowkey, function (error, result, response) {
  if (!error) {
    console.log(result.Potentiometer._);
    RGB = result.RGB._;
    Temperature = result.Temperature._;
    Potentiometer = result.Potentiometer._;
  }
});

server.listen(port);
app.use(express.static(__dirname + '/public'));
console.log('Launched');

io.on('connection', function (socket) {
  socket.emit('RGB', RGB);
  socket.emit('Temperature', Temperature);
  socket.emit('Potentiometer', Potentiometer);
  console.log('RGB: ' + RGB + ', Temperature: ' + Temperature + ', Potentiometer: ' + Potentiometer);
});