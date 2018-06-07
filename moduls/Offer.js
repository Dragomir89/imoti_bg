const mongoose = require('mongoose')
const {Schema} = mongoose
const ObjectId = mongoose.Schema.ObjectId;

const offerSchema = new Schema({
   
    number:       Number,
    area:         Number,
    description:  String,
    phoneNumber:  String,
    phoneNumbers: [{type: String, type: String, lowercase: true, trim: true}],
    price:       Number,
    address:     String,
    info:        String,
    propertyOwnerName: {type: String, type: String, lowercase: true, trim: true},
    floor:       Number,
    constructionTypeId: { type: ObjectId, required: true },
    propertyTypeId:     { type: ObjectId, required: true },
    state:              { type: ObjectId, required: true },
    neighborhoodId:     { type: ObjectId, required: true },
    addedOn:            { type: Date }

})


mongoose.model('offers', offerSchema)
