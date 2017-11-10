const express = require('express');
let app = express();
const github = require ('../helpers/github.js')
const db = require ('../database/index.js')

////////////////////////////
/// changeable Variables
module.exports.port = (process.env.dataport || 1128);
module.exports.url = 'localhost:1128';
///////////////////////////
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res, next) {  /// process the body data
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  res.header(200)
  var body = '';
  req.on('data', (data) => {body += data})
  req.on('end', () => {
    // console.log ('body', body)
    req.data = {};
    req.data.body = body;
    next();
  })
});


app.post('/repos', github.githubMiddle, db.middleware)
app.post('/repos', function (req, res) {
  console.log('aaaa')
  db.getAll()
    .then (data => {
      console.log (data.length)
      res.statusCode = 201;
      res.json(data)
    })
  
})


app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // console.log('get Message', req.body)
  db.getAll()
  .then (data => {
    console.log (data.length)
    res.statusCode = 200;
    res.json(data)
  })

});




let port = module.exports.port;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});



//https://stackoverflow.com/questions/14168433/node-js-error-connect-econnrefused
process.on('uncaughtException', function (err) {
  console.log ('uncaughtErrors: ',  err)
})


///// helper functions
var pickRandom = function (dataArray = [], number = 25){
  var picked = [];
  for (var i = 0; i < dataArray.length; i++){
    picked.push(dataArray[getRandom(0, dataArray.length)])
  }
  return picked
}


//creates a random number with a min and max
function getRandom(min=0, max=1) {
  return Math.floor((Math.random() * max) + min);
}