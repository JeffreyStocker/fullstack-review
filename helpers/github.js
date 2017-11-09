const request = require('request');
const config = require('../config.js') || {TOKEN: ''};
const bluebird = require('bluebird')
const db = require ('../database/index.js')
// const app = require('../server/index.js')

//// middleware ////////
module.exports.githubMiddle = function (req, res, next) {
  // console.log('req.body', req.data.body)
  getReposByUsername ( req.data.body)
    .then (githubData => {
      req.data.gitdata = githubData
      next();
    })
    .catch (err => {
      // console.log ('error getting github data', err)
      next()
    })
}



///// helper functions////////////
let getReposByUsername = (userName) => {
  return new Promise ((resolve, revoke) => {
    // console.log('USERNAME', userName)
    // TODO - Use the request module to request repos for a specific
    // user from the github API
    
    // The options object has been provided to help you out, 
    // but you'll have to fill in the URL
    // var userName = 'jeffreystocker'
    // var callback = (error, data) => {
    //   console.log (error)
    // }
    let options = {
      url: `https://api.github.com/users/${userName}/repos`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${config.TOKEN}`
      },
    };
    
    var talkToGit = request(options, (error, data) => {
      if (error) {
        revoke (error)
        // console.error ('https: get error :', error)
      } else {
        // console.log (JSON.parse(data.body))
        resolve(JSON.parse(data.body))
      }
    })
  })
}
  
  /////testing
  // getReposByUsername()
  
  module.exports.getReposByUsername = getReposByUsername;
  module.exports.getReposByUsername = getReposByUsername;