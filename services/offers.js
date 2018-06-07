const mongoose = require('mongoose')
const Offer = mongoose.model('offers')
const User = mongoose.model('users')
const ConstructionType = mongoose.model('constructionTypes')
const PropertyType = mongoose.model('propertyTypes')
const States = mongoose.model('states')
const Neighborhood = mongoose.model('neighborhoods')

function getAllOffers(params) {
    return User.find({})
}

function addNewDetails(params){

    console.log('addNewDetails Fn PARAMS: ')
    console.log(params)
    
    if(params.constructionType){
        
        let newConstructionType = new ConstructionType({value:params.constructionType})
        return newConstructionType
    }
    if(params.propertyType){
        
            let newPropertyType = new PropertyType({value:params.propertyType})
            return newPropertyType
    }
    if(params.state){
    
        let newStates = new States({value:params.state})
        return newStates
    }
    if(params.neighborhood){
    
        let newNighborhood = new Neighborhood({value:params.neighborhood})
        return newNighborhood
    }


}

function getOptionDetails(){
    let returnObj = {}
    return ConstructionType
}

module.exports = {
    getAllOffers: getAllOffers,
    addNewDetails: addNewDetails,
    getOptionDetails: getOptionDetails
}