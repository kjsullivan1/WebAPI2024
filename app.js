var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
const { Console, debug } = require('console');
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


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
app.get('/',function(req,res){
    //res.send("Here would be the page from the route");
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.get('/about',function(req,res){
    //res.send("Here would be the page from the route");
    res.sendFile(path.join(__dirname + '/pages/about.html'));
});

app.get('/contact',function(req,res){
    //res.send("Here would be the page from the route");
    res.sendFile(path.join(__dirname + '/pages/contact.html'));
});

var Schema = mongoose.Schema;

var GameData = new Schema({
    gamename:String,
    gamestudio:String
})

var GameModel = mongoose.model('games',GameData);

app.get('/getdata',function(req,res){
    GameModel.find({}).then(function(games){
        res.json({games});
        
    })
});

app.post('/deletegame', function(req,res){
    console.log(req.body.game._id);
    GameModel.findByIdAndDelete(req.body.game._id).exec();
    res.redirect('games.html');
})

app.post('/updategame', function(req,res){
    console.log(req.body)
    GameModel.findByIdAndUpdate(req.body.id,{gamename:req.body.game}).then(function(){
        res.redirect('games.html');
    });

})

app.listen(3000, function(){
    console.log("Running on port 3000");
})



//var num = 6 * 6;

//console.log(num);