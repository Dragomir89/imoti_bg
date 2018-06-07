const mongoose = require('mongoose')
const {Schema} = mongoose

const neighborhoodSchema = new Schema({
    value: { type: String, required: true, unique: true }
})


mongoose.model('neighborhoods', neighborhoodSchema)

