
const { ObjectId } = require('mongodb');
const db = require('./database');
db.userName ="demoUsername";
db.password ="demopassword";
db.databeseName = "mydb";
let tableName ="student";

module.exports.create = function(req,res,next){
  
    var result ={message: "",status:true, data:null};
    try{
    var model = req.body;

    if(model == null || model == undefined) throw new Error("the model can not be null or undefined");
    let trimmedName = model.name.toString().trim();
    db.first(tableName,{name: trimmedName},(response)=>{
      if(response != null)
        {
            result.message ="the name \"" + model.name +  "\""+ " already exist";
            result.status = false;
        } 
        else
        {
          model.name=trimmedName;
            db.add(tableName,model);
            result.status = true;
             result.message ="The Student \"" +  trimmedName +  "\"" + " Record has been added"; 
        }
        
       res.json(result);
    });
    }
    catch(error){
     result.message = error;
     result.status = false;
     
    res.json(result);
    }
}
module.exports.showStudent = function(req,res,next){
    
    var result ={message: "",status:true, data: null};
    try{
     
        result.message ="The Student Records Retrieved";
     db.toArray(tableName,null,null,(data)=> {
        
        result.message ="The Student Records Retrieved";
        result.data = data;
         res.json(result);
      
     });
        }
        catch(error){
         result.message = error;
         result.status = false;
         
        res.json(result);
        }
}
module.exports.update = function(req,res,next){
  
    var result ={message: "",status:true, data:null};
    try{
    var model = req.body;

    if(model == null || model == undefined) throw new Error("the model can not be null or undefined");

 db.first(tableName,{_id: new ObjectId(model._id)},(response)=>{
  
    if(response == null)
        {
            result.message = "the studentId \"" + model._id +  "\""+ "does not already exist";
            result.status = false;
        } 
        else
        {
          db.update(tableName, {_id:new ObjectId(model._id)}, {name: model.name, emailAddress: model.emailAddress, age: model.age});
            result.status = true;
         
          result.message ="The Student \"" +  model.name+  "\"" + " Record has been updated"; 
        }
        
       res.json(result);
   
 });

    }
    catch(error){
     result.message = error.message;
     result.status = false;
     
    res.json(result);
    }
}
module.exports.find = function(req,res,next){
  
    var result ={message: "",status:true, data:null};
    try{
    var id = req.params.id;
  db.first(tableName,{_id: new ObjectId(id)},(response)=>{
   result.data = response;
   res.json(result);
 });

    }
    catch(error){
     result.message = error.message;
     result.status = false;
     
    res.json(result);
    }
}

module.exports.delete = function(req,res,next){
  
    var result ={message: "",status:true, data:null};
    try{
    var id = req.params.id;
 
    db.first(tableName,{_id: new ObjectId(id)},(response)=>{
     
      if(response == null) throw new Error("the id can not be found");
        db.remove(tableName,{_id : new ObjectId(id)});
    });
    result.message ="record deleted";
    }
    catch(error){
     result.message = error.message;
     result.status = false;
     
    }
    
    res.json(result);
}