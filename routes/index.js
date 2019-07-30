let express = require('express');
let router = express.Router();
const jsonParser = express.json();
const Hotdog = require('../models/hotdog');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/list", function(req, res){

    Hotdog.find({}, function(err, hotdogs){

        if(err) return console.log(err);
        res.send(hotdogs);
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

module.exports = router;
