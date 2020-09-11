const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ownerSchema = new Schema({
    firstName: String,
    lastName: String,
    avatar: String,
    specialities: String,
})

module.exports = mongoose.model("Owner", ownerSchema);