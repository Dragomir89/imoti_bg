const mongoose = require('mongoose')
const {Schema} = mongoose

const propertyTypeSchema = new Schema({
    value: { type: String, required: true, unique:true }
})


mongoose.model('propertyTypes', propertyTypeSchema)

