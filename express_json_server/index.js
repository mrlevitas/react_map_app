const express = require('express')
const fs = require('fs')
const app = express()
var path = require('path')
const port = 3002
const jsonFolder = './trips/'

const files = fs.readdirSync(path.resolve(__dirname, jsonFolder));

var http = require('http');

// var app = http.createServer(function(req,res){
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({ a: 1 }, null, 3));
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/', (req, res) => {
  res.send(files)}
)

app.get('/trips', (req, res) => {
  res.send(files);
})


app.get('/trips/:tripDate', function (req, res) {
  res.send(require(path.resolve(__dirname, './trips/', req.params.tripDate)));
})

app.listen(port, () => console.log('Example app listening on port 3002!'))
