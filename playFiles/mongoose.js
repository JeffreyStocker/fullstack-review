// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log ('MongoDB connected')
});

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
  id : {type: Number, unique: true}, //note double check this 
  full_name : String,
  name : String,
  html_url : String, 
  description : String, 
  size : Number,
  watchers_count : Number,
  stargazers_count : Number,
  jsonData : String,
  created_at : Date,
  updated_at : Date,
  pushed_at : Date,

  ownerId : Number,
  owner_login : String,
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
    id : repoInfo.id, 
    full_name : repoInfo.full_name,
    name : repoInfo.name,
    html_url : repoInfo.html_url,
    description : repoInfo.description,
    size : repoInfo.size,
    watchers_count : repoInfo.watchers_count,
    stargazers_count : repoInfo.stargazers_count,
    created_at : repoInfo.created_at,
    updated_at : repoInfo.updated_at,
    pushed_at : repoInfo.pushed_at,
    jsonData : JSON.stringify(repoInfo),

    ownerId : repoInfo.owner.id,
    owner_login : repoInfo.login,
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

const fs = require('fs')

var file = fs.readFile('./data.json', (err, data) => {
  if (err) {
    console.log ('error', err)
  } else {
    // console.log (JSON.parse(data))
    data = JSON.parse(data);
    data.forEach(repo => {
      save(repo);
    })
  }
})
  // .then (data => {
  //   console.log (JSON.parse(data))
  // })
  // .catch(err => {
  //   console.log ('error', err)
  // })
