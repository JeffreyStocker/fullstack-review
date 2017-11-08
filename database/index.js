const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here! http://mongoosejs.com/docs/guide.html
  // permitted info http://mongoosejs.com/docs/schematypes.html
    // String
    // Number
    // Date
    // Buffer
    // Boolean
    // Mixed
    // ObjectId
    // Array
  id = number, 
  full_name = string,
  name = string,
  html_url = string, 
  description = string, 
  size = number,
  watchers_count = number,
  stargazers_count = number,
  jsonData = string,
  created_at = date,
  updated_at = date,
  pushed_at = date,

  ownerId = number,
  owner_login = string,
});

let Repo = mongoose.model('Repo', repoSchema);  //compiles the schema into a model;

let save = (repoInfo) => {
  //WIP need to check for duplicates!!

  //note may want to make this into a promise later
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  
  //save an indivdual repo information to the mongoDB
  let saveObject = {
    id = repoInfo.id, 
    full_name = repoInfo.full_name,
    name = repoInfo.name,
    html_url = repoInfo.html_url,
    description = repoInfo.description,
    size = repoInfo.size,
    watchers_count = repoInfo.watchers_count,
    stargazers_count = repoInfo.stargazers_count,
    created_at = repoInfo.created_at,
    updated_at = repoInfo.updated_at,
    pushed_at = repoInfo.pushed_at,
    jsonData = JSON.stringify(repoInfo),

    ownerId = repoInfo.owner.id,
    owner_login = repoInfo.login,
  }; 
  //one way to save
  Repo.create (saveObject, (err, response) => { 
    if (err)  { console.log ('error saving repo', err); }
    else      { console.log('save sucessfull response: ', response)} 
  });
  
  //  or can use to save
  // var toSave = new Repo (saveObject)
  // toSave.save ((err, response) => {
  //   if (err) { console.log ('error saving repo', err); }
  // })
}

module.exports.save = save;