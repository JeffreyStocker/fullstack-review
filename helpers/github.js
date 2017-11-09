const request = require('request');
const config = require('../config.js');
const https = require('https')
// const app = require('../server/index.js')



//////////////need to figure this out
let getReposByUsername = (userName) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  var userName = 'jeffreystocker'
  var callback = (error, data) => {
    console.log (error)
  }
  let options = {
    // url: `https://api.github.com/${userName}/repos`,
    //users/jeffreystocker/repos
    // host: 'https://api.github.com',
    host: 'api.github.com',
    path: '/users/' + userName + '/repos/',
    // method: 'GET', 
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    // callback: callback
  };

var talkToGit = https.request(options, (error, data) => {
  if (error) {
    console.error ('https: get error :', error)
  } else {
    console.error ('https: get data :', data)
  }
})

}
// getReposByUsername()

module.exports.getReposByUsername = getReposByUsername;