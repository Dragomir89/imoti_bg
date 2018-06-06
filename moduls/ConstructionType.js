const mongoose = require('mongoose')
const {Schema} = mongoose

const constructionTypeSchema = new Schema({
    value: { type: String, required: true , unique:true }
})


mongoose.model('constructionTypes', constructionTypeSchema)
// constructionType: