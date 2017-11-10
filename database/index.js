const mongoose = require('mongoose');
// var uri = process.env.MONGOLAB_MAUVE_URI || 'mongodb://localhost/fetcher';
var uri = process.env.MONGOLAB_MAUVE_URI || 'mongodb://localhost/fetcher';
console.log ('uri',uri)
console.log ('process.env.MONGOLAB_MAUVE_URI', process.env.data_google_youtube_api)

console.log ('onedrive', process.env.ONEDRIVE)
mongoose.connect(uri);

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
  id : {type: Number, index: true, unique: true}, //note double check this 
  full_name : String,
  name : String,
  html_url : String, 
  description : String, 
  size : Number,
  watchers_count : Number,
  stargazers_count : Number,
  // jsonData : String,
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
    // jsonData : JSON.stringify(repoInfo),

    ownerId : repoInfo.owner.id,
    owner_login : repoInfo.login,
  }; 
  //one way to save
  Repo.create (saveObject, (err, response) => { 
    if (err)  { 
      if (err.code === 11000) { //'E11000 duplicate key error collection'
        console.log ('duplication')
        // may want to update
      } 
      // console.log ('error saving repo', err);
    }
    else { 
      // console.log('save sucessfull response: ', response)
    } 
  });
  
  //  or can use to save
  // var toSave = new Repo (saveObject)
  // toSave.save ((err, response) => {
  //   if (err) { console.log ('error saving repo', err); }
  // })
}


var find = (searchObject = {}, fieldsString) => {
  return new Promise ((resolve, revoke) => {
    Repo.findOne (searchObject, fieldsString, (err, singleInfo) => {
      if (err) {
        // console.log ('error', err)
        revoke(err)
      } else {
        // console.log ('query data', singleInfo)
        resolve(singleInfo);
      }
    })
  })
    Repo.find({'id' : id })
  }

  
  module.exports.save = save;
  module.exports.find = find;
  
  module.exports.getAll = function (fieldsString) {
    // console.log(fieldsString)
    return new Promise ((resolve, revoke) => {
      Repo.find({}, function (err, data) {
        if (err) {
          revoke(err)
        } else {
          resolve(data)
        }
    })
  })
}

var saveAll = function (ArrayOfRepos) {
  return new Promise ((resolve,revoke) => {
    if (ArrayOfRepos) {
      for (var i = 0; i < ArrayOfRepos.length; i++ ) {
        save(ArrayOfRepos[i])
      }
    }
    resolve()
  })
}

module.exports.middleware = function (req, res, next) {
  // console.log('here', req.data.gitdata)
  saveAll(req.data.gitdata)
  .then(next())
    /////////////// this was causing an error to be sent 500 server error
    // .then((test) => {
    //   console.log ('sucessful save')
    //   next()
    // })
    // .catch(err => {
    //   // console.log("Error saving to database")
    //   next();
    // })
}