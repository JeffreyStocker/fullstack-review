const express = require('express');
let app = express();
console.log('Program Start')
////////////////////////////
/// changeable Variables
module.exports.port = 1128;
module.exports.url = 'localhost:1128';
///////////////////////////

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log ('gotbody~!body')
  var body = '';
  req.on('data', (data) => {body += data})
  req.on('end', () => {
    console.log ('body', body)
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('get Message', req.body)
});

let port = module.exports.port;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
