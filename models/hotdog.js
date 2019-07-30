const mongoose = require('mongoose');

let HotDogSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    cost: {type: Number, required: true}
});

module.exports = mongoose.model('HotDog', HotDogSchema);