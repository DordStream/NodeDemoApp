
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
module.exports.databaseHost ="mongodb+srv://demoUsername:demopassword@cluster0.4x129.mongodb.net/";   //"mongodb://127.0.0.1:27017/";
module.exports.userName ="";
module.exports.password ="";
module.exports.databeseName ="";
module.exports.connect = function(tableName,data,query, callback) {
    if((this.userName == "" || this.userName == undefined)|| (this.password == "" || this.password == undefined)) throw new Error("the username and password can not be empty or null or undefined");
   
    MongoClient.connect(this.databaseHost).then((database)=>{
        
        var db = database.db(this.databeseName);
        console.log("database connected");
         callback(tableName, data, query, db);
      
    
    }
    
    ).catch((error)=>{console.log(error)});
 
}
module.exports.connectQuery = function(tableName,query,select,callback,fallback){
    if((this.userName == "" || this.userName == undefined)|| (this.password == "" || this.password == undefined)) throw new Error("the username and password can not be empty or null or undefined");
   
    MongoClient.connect(this.databaseHost).then((database)=>{
        
        var db = database.db(this.databeseName);
        console.log("database connected");
         callback(tableName, query,select, db,fallback);
     
    
    }
    
    ).catch((error)=>{console.log(error)});
 
}
function _createTable  (tableName, data, query,db) {
   
    db.createCollection(tableName).then((message)=>{
        console.log(tableName +" Table created");
    }).catch((error)=>{console.log("Error: "+  error)});
    
}
function _createUserRole(db){
    db.createUser({ "user": this.userName, "pwd": this.password, "roles":[{"role":"userAdmin","db": this.databeseName}]});
}
function _insertObject(tableName,data, query,db){
    if(data == null || data == undefined) throw new Error("the data attached to this object");
 
db.collection(tableName).insertOne(data).then((message)=>
    console.log("the data has been added")).catch((error)=> console.log(error));

}
function _updateObject(tableName,data,query,db){
    if(data == null || data == undefined) throw new Error("the data attached to this object");
    let newdata ={$set: data};
db.collection(tableName).updateOne(query,newdata,{upsert: true}).then((message)=>
    console.log(message)).catch((error)=> console.log(error));


}
function _deleteObject(tableName,data, query,db){
   
db.collection(tableName).deleteOne(query).then((message)=>
    console.log("the data has been deleted")).catch((error)=> console.log(error));


}
function _dropCollection(tableName,data,query,db){
    db.collection(tableName).drop().then((message)=>{ console.log(message) }).catch((error)=> console.log(error));
}
function _findAll(tableName,query,select,db,fallback){
    if(query == null){ query = {}};
    db.collection(tableName).find(query,{projection: select}).toArray().then((result)=>{ fallback(result)}).catch((err)=> console.log(err));

}
function _findOne(tableName,query,select,db,fallback){
 
    if(query == null){ query = {}};
    db.collection(tableName).findOne(query).then((result)=>{ fallback(result)}).catch((err)=> console.log(err));

}

module.exports.createUser = function(_username,password){
    this.userName = _username;
    this.password = password;
//this.connect(_createUserRole);
}
module.exports.createTable= function(tableName){

   this.connect(tableName,null,_createTable);
}
module.exports.add = function(tableName, data){
 this.connect(tableName,data,null,_insertObject);
}
module.exports.update= function(tableName, query,data){
  this.connect(tableName,data,query,_updateObject);
}
module.exports.remove = function(tableName,query){
  this.connect(tableName,null,query,_deleteObject);
}
module.exports.drop = function(tableName){
    this.connect(tableName,null,null,_dropCollection);
}
module.exports.toArray = function(tableName,query,select,callback){

    this.connectQuery(tableName,query,select,_findAll,callback);
}
module.exports.first = function(tableName,query,callback){
   this.connectQuery(tableName,query,null,_findOne,callback);
}