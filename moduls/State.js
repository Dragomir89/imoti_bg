const mongoose = require('mongoose')
const {Schema} = mongoose

const stateSchema = new Schema({
    value: { type: String, required: true, unique: true }
})


mongoose.model('states', stateSchema)

