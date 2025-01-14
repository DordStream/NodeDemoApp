//Express JS
const express = require('express');
//CORS
const cors = require('cors');
//Student Module.
const studentController = require("./studentController");
const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
//Security Layer
const corsOption = {
    origin: "*",
    optionsSuccessStatus: 200
}
app.use(cors());
//End Security Layer

//API
app.post("/create",studentController.create);
app.get("/showstudents",studentController.showStudent);
app.post("/update",studentController.update);
app.get("/find/:id",studentController.find);
app.get("/delete/:id",studentController.delete);
//End API

//Listen to port;
app.listen(port,console.log("Server stated on port " + port));
/*
const request = require("./request");

request.showStudent();
*/