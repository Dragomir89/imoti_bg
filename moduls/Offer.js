const mongoose = require('mongoose')
const {Schema} = mongoose
const ObjectId = mongoose.Schema.ObjectId;

const offerSchema = new Schema({
   
    number: { type: Number, unique: true },
    area:        Number,
    description: String,
    phoneNumber: String,
    price:       Number,
    address:     String,
    info:        String,
    floor:       Number,
    constructionTypeId: { type: ObjectId, required: true },
    propertyTypeId:     { type: ObjectId, required: true },
    state:              { type: ObjectId, required: true }
})


mongoose.model('offers', offerSchema)
