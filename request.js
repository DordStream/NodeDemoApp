const axios = require("axios");
const url ="http://localhost:7000/showstudents";
module.exports.showStudent = function(){
    axios.get(url).then((response)=> console.log(JSON.stringify(response.data.data))).catch((error)=> console.log(error));

}

