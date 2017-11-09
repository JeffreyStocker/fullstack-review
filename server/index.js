const express = require('express');
let app = express();
const github = require ('../helpers/github.js')

////////////////////////////
/// changeable Variables
module.exports.port = 1128;
module.exports.url = 'localhost:1128';
///////////////////////////

app.post('/repos', function (req, res, next) {  /// process the body data
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var body = '';
  req.on('data', (data) => {body += data})
  req.on('end', () => {
    // console.log ('body', body)
    req.data = {};
    req.data.body = body;
    next();
  })
});

app.use(express.static(__dirname + '/../client/dist'));
app.use('/repos', github.githubMiddle)



app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('get Message', req.body)
});




let port = module.exports.port;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});



//https://stackoverflow.com/questions/14168433/node-js-error-connect-econnrefused
process.on('uncaughtException', function (err) {
  console.log ('uncaughtErrors: ',  err)
})