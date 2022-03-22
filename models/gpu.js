const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GPUSchema = new Schema({
    title: String,    
    imageURL: String,   
    price: String,
    date: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("GPU", GPUSchema);