const mongoose = require('mongoose')
const Offer = mongoose.model('offers')
const User = mongoose.model('users')
const ConstructionType = mongoose.model('constructionTypes')
const PropertyType = mongoose.model('propertyTypes')
const States = mongoose.model('states')
const Neighborhood = mongoose.model('neighborhoods')
const PhoneNumbers = mongoose.model('phoneNumbers')


function addNewDetails(params){

    
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

function getOffer(id) {

    function getRes(resolve, reject){
        Offer.findById(id, (err,offer)=>{
            if(err){
                console.log('===Error===')
                reject(err)
                return
            }
            return resolve(offer)
        })
    }
    return new Promise(getRes)
}

function createFilters(queryParams) {
    let searchObj = null
    if(queryParams) {
        searchObj = {}
        if(queryParams.constructionType) { 
            searchObj.constructionTypeId = queryParams.constructionType 
        }
        if(queryParams.propertyType){
            searchObj.propertyTypeId = queryParams.propertyType 
        }
        if(queryParams.state){
            searchObj.state = queryParams.state 
        }
        if(queryParams.neighborhood){
            searchObj.neighborhoodId = queryParams.neighborhood 
        }
        if(queryParams.nextCall && queryParams.nextCall !== 'Invalid date'){
            searchObj.nextCall = {"$lte": new Date(queryParams.nextCall)}
        }
    }
    return searchObj
}

function findOffersByPhone(phoneNumber, page, offersPerPage){
    phoneNumber = normalizePhoneNumber(phoneNumber)
    function getRes(resolve, reject){
        PhoneNumbers.find({phoneNumber}).then((numbers) => {

            let promiseOffers = []
            numbers.forEach((e)=>{
                promiseOffers.push(
                    Offer.findById(e.offerId)
                    .populate("propertyTypeId")
                    .populate("constructionTypeId")
                    .populate("state")
                    .populate("neighborhoodId"))
            })
    
            Promise.all(promiseOffers).then((offers)=>{
    
                let countOffers= offers.length
                const lastPageNbr = calcLastPageNbr(countOffers, offersPerPage)
                resolve({
                    offers,
                    page,
                    countOffers,
                    offersPerPage,
                    lastPageNbr
                })
            })
        })    
    }

    return new Promise(getRes)
}

function calculatePaginationDetails(page, offersPerPage){
    page =  Number(page)
    let skipVal = offersPerPage * (page - 1) < 0 ? 0 : offersPerPage * (page - 1)  
    return skipVal
}

function calcLastPageNbr(countOffers, offersPerPage){
    countOffers = Number(countOffers)
    let lastPageNbr = countOffers / offersPerPage
    if(!Number.isInteger(lastPageNbr)){
        lastPageNbr = Math.floor(lastPageNbr) + 1
    }
    console.log('Namereni Oferti --> ' + countOffers)
    console.log('lastPageNbr --> ' + lastPageNbr)
    return lastPageNbr
}

function getAllOffers(queryParams, page, offersPerPage){
    console.log('getAllOffers')
    const filters = createFilters(queryParams)
    const skipVal = calculatePaginationDetails(page, offersPerPage)

    function getRes(resolve, reject){
        
        Offer.find(filters)
        .skip(skipVal)  
        .limit(offersPerPage)
        .populate("propertyTypeId")
        .populate("constructionTypeId")
        .populate("state")
        .populate("neighborhoodId")
        .then((offers)=>{

            Offer.count(filters, function(err, countOffers) {
                const lastPageNbr = calcLastPageNbr(countOffers, offersPerPage)
                resolve({
                    offers,
                    page,
                    countOffers,
                    offersPerPage,
                    lastPageNbr
                })
            })
        })
    }
    return new Promise(getRes)
}
//// repair phone table

function normalizePhoneNumber(phoneNumber){
    return phoneNumber.split(/\D+/).join("")
}

function saveArrayOfphones(phoneNumbers, offerId){
    function getRes(resolve, reject){
        let promisePhones = []
        phoneNumbers.forEach((phoneNumber)=>{
            phoneNumber = normalizePhoneNumber(phoneNumber)
            const phone = new PhoneNumbers({offerId, phoneNumber})
            promisePhones.push(phone.save())
        })
        Promise.all(promisePhones).then((res)=>{
            console.log('zapazeni telefoni')
            console.log(res)
            resolve({msg: 'телефоните Бяха запазени', res})
        })
    }
    return new Promise(getRes)
}

function addPhonesToOffer(offerId){

    function getRes(resolve, reject){
        Offer.findById(offerId).then((offer)=>{
            const phoneNumber = normalizePhoneNumber(offer.phoneNumber)
            
            PhoneNumbers.find({ phoneNumber, offerId: offer._id }).then((res)=>{
                if(res.length > 0 ){
                    resolve({msg: 'телефоните съществъват'})
                    return
                }
                const {phoneNumbers} = offer
                // let promisePhones = []
                if(phoneNumbers && phoneNumbers.length !== 0){
                    
                    saveArrayOfphones(phoneNumbers, offer._id).then((res)=>{
                        resolve(res)
                    })
                }else{
                    const phone = new PhoneNumbers({
                        offerId: offer._id, 
                        phoneNumber:normalizePhoneNumber(phoneNumber)
                    })

                    phone.save().then((res)=>{
                        resolve({msg: 'телефона беше запазен', res})
                    })
                }
                
            })
        })
    }

    return new Promise(getRes)
}
//// repair phone table

function addOffer(data){
    console.log('/api/post-offer --- addOffer')
      
    // let userId = req.user ? req.user._id : null
    let userId = null
    function getRes(resolve, reject){
        let phoneNumbers = [];

        data.phoneNumber  ? phoneNumbers.push(data.phoneNumber)  : false
        data.phoneNumber2 ? phoneNumbers.push(data.phoneNumber2) : false
        data.phoneNumber3 ? phoneNumbers.push(data.phoneNumber3) : false

        const {number,area, phoneNumber, addedOn, description, price, address, info, propertyOwnerName,
            floor, constructionTypeId, propertyTypeId, state, neighborhoodId, nextCall, lastCall} = data

        let newOffer = new Offer({
            constructionTypeId,
            propertyTypeId,
            state,
            neighborhoodId,
            number,
            area,
            description,
            phoneNumber,
            phoneNumbers,
            price,
            address,
            floor,
            info,
            propertyOwnerName,
            addedOn,
            addedFrom: userId,
            nextCall,
            lastCall
        })
        console.log(newOffer)

        newOffer.save().then((offer)=>{
            console.log('SAVED OFFER...')            
            console.log(offer)

            saveArrayOfphones(phoneNumbers, offer._id).then((phones)=>{
                console.log('SAVED PHONES...')
                console.log(phones)
                resolve({phones, offer , success:true})
            }).catch((err)=>{
                reject({error: err})    
            })
                
        }).catch((err)=>{
            console.log('SAVE ERROR ! => ')
            console.log(err)
            reject({error: err})
        })
    }

    return new Promise(getRes)
}

module.exports = {
    getOffer,
    getAllOffers,
    addNewDetails,
    findOffersByPhone,
    addPhonesToOffer,
    addOffer
}