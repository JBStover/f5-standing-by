const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConsoleSchema = new Schema({
    title: String,    
    imageURL: String,   
    price: String,
    date: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("Console", ConsoleSchema);