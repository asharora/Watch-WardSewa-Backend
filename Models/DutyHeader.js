const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DutyHeaders = new Schema(
    {
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        field1: { type: String, required: true },
        field2: { type: String, required: true },
   
    },
    { timestamps: true },
)

module.exports = mongoose.model('DutyHeader', DutyHeaders)