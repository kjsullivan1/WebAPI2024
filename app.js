var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
const { Console, debug } = require('console');
var bodyparser = require("body-parser");
var crud = require('./routes/crud');

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use('/', crud);



//Connect to mongoDB via mongoose
mongoose.connect("mongodb://0.0.0.0:27017/WebAPI",{
    //useNewURLParser:true
}).then(function(){
    console.log("Connected to MongoDb Database");
}).catch(function(err){
    console.log(err);
});

//Example of static route
app.use(express.static(__dirname + '/pages'));


// JavaScript for a route 
app.get('/', function(req,res){ 
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/index.html"));
});

app.get('/about', function(req,res){ 
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/about.html"));
});

app.get('/contact', function(req,res){ 
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/contact.html"));
});

app.get('/games', function(req,res){ 
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/games.html"));
});

app.get('/update', function(req,res){ 
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/update.html"));
});

app.listen(3000, function(){
    console.log("Running on port 3000");
})



//var num = 6 * 6;

//console.log(num);