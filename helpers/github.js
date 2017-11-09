const request = require('request');
const config = require('../config.js');
const bluebird = require('bluebird')

// const app = require('../server/index.js')


var githubMiddle = function (req, res, next) {
  
}


let getReposByUsername = (userName) => {
  return new Promise ((resolve, revoke) => {

    // TODO - Use the request module to request repos for a specific
    // user from the github API
    
    // The options object has been provided to help you out, 
    // but you'll have to fill in the URL
    var userName = 'jeffreystocker'
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
        resolve(JSON.parse(data))
        // console.error ('https: get data :', data)
      }
    })
  })
}
  
  /////testing
  // getReposByUsername()
  
  module.exports.getReposByUsername = getReposByUsername;