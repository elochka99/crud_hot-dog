const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const hotdogScheme = new Schema({name: String, cost: Number}, {versionKey: false});
const Hotdog = mongoose.model("Hotdog", hotdogScheme);

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/hotdogdb", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(8000, function(){
        console.log("Server connected..localhost:8000");
    });
});

app.get("/list", function(req, res){

    Hotdog.find({}, function(err, hotdogs){

        if(err) return console.log(err);
        res.send(hotdogs)
    });
});

app.get("/:id", function(req, res){

    const id = req.params.id;
    Hotdog.findOne({_id: id}, function(err, hotdog){

        if(err) return console.log(err);
        res.send(hotdog);
    });
});

app.post("/add", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const hotdogName = req.body.name;
    const hotdogCost = req.body.cost;
    const hotdog = new Hotdog({name: hotdogName, cost: hotdogCost});

    hotdog.save(function(err){
        if(err) return console.log(err);
        res.send(hotdog);
    });
});

app.delete("/delete/:id", function(req, res){

    const id = req.params.id;
    Hotdog.findByIdAndDelete(id, function(err, hotdog){

        if(err) return console.log(err);
        res.send(hotdog);
    });
});

app.put("/update", jsonParser, function(req, res){

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
