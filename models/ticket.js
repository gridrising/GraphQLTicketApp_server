const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    number: String,
    status: String,
    description: String,
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    reportedTime: {
        type: Date,
        default: Date.now,
    },
    ownerId: String,
    assetId: String,
})

module.exports = mongoose.model("Ticket", ticketSchema);