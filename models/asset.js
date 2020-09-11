const mongoose = require("mongoose");
const Schema = mongoose.Schema

const assetSchema = new Schema({
    name: String,
    geoCode: String,
    kmFrom: Number,
    kmTo: Number,
})

module.exports = mongoose.model("Asset", assetSchema);
