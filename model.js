const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Duty = new Schema(
    {
        date: { type: String, required: true },
        day: { type: String, required: true },
        sewadars: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('DutySlot', Duty)