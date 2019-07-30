const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
var router = express.Router();

const hotdogScheme = new Schema({name: String, cost: Number}, {versionKey: false});
const Hotdog = mongoose.model("Hotdog", hotdogScheme);

app.use(express.static(__dirname + "/public"));
// mongoose.connect("mongodb://localhost:27017/hotdogdb", { useNewUrlParser: true }, function(err){

mongoose.connect("mongodb://heroku_mzrsxhg9:2kqodtgcnklah51pvs4fo1bgrq@ds239206.mlab.com:39206/heroku_mzrsxhg9", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(8000, function(){
        console.log("Server connected..localhost:8000");
    });
});

router.get("/list", function(req, res){

    Hotdog.find({}, function(err, hotdogs){

        if(err) return console.log(err);
        res.send(hotdogs)
    });
});

router.get("/:id", function(req, res){

    const id = req.params.id;
    Hotdog.findOne({_id: id}, function(err, hotdog){

        if(err) return console.log(err);
        res.send(hotdog);
    });
});

router.post("/add", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const hotdogName = req.body.name;
    const hotdogCost = req.body.cost;
    const hotdog = new Hotdog({name: hotdogName, cost: hotdogCost});

    hotdog.save(function(err){
        if(err) return console.log(err);
        res.send(hotdog);
    });
});

router.delete("/delete/:id", function(req, res){

    const id = req.params.id;
    Hotdog.findByIdAndDelete(id, function(err, hotdog){

        if(err) return console.log(err);
        res.send(hotdog);
    });
});

router.put("/update", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const hotdogName = req.body.name;
    const hotdogCost = req.body.cost;
    const newhotdog = {cost: hotdogCost, name: hotdogName};

    Hotdog.findOneAndUpdate({_id: id}, newhotdog, {new: true}, function(err, hotdog){
        if(err) return console.log(err);
        res.send(hotdog);
    });
});
