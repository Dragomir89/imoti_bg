const mongoose = require('mongoose')
const offersCtrl = require('../services/offers') 
const Offer = mongoose.model('offers')
// const User = mongoose.model('users')
const ConstructionType = mongoose.model('constructionTypes')
const PropertyType = mongoose.model('propertyTypes')
const States = mongoose.model('states')
const Neighborhood = mongoose.model('neighborhoods')
const PhoneNumbers = mongoose.model('phoneNumbers')
const url = require('url')




module.exports = (app) =>{
    
 
    app.post('/api/add-details', (req, res)=>{
        
        let data = req.body
        let promiseArr = []

        data.constructionType ? 
        promiseArr.push(new ConstructionType({value:data.constructionType}).save()) :
        false
        
        data.propertyType ? 
        promiseArr.push(new PropertyType({value:data.propertyType}).save()) :
        false

        data.state ? 
        promiseArr.push(new States({value:data.state}).save()) :
        false

        data.neighborhood ? 
        promiseArr.push(new Neighborhood({value:data.neighborhood}).save()) :
        false

        Promise.all(promiseArr).then(function(values){
            console.log("RESPONSE: ")
            console.log(values)
            res.send(values)
        })
    })

    app.get('/api/options', (req, res)=>{

        let returnObj = {}

        var promise1 = ConstructionType.find({})
        var promise2 = PropertyType.find({})
        var promise3 = States.find({})
        var promise4 = Neighborhood.find({})

        Promise.all([promise1, promise2, promise3, promise4]).then(function(values) {

            returnObj.constructionTypes = values[0]
            returnObj.propertyTypes = values[1]
            returnObj.states = values[2]
            returnObj.neighborhoods = values[3]
            res.send(returnObj)
        });
        

    })

    app.get('/api/get-offers/:page', (req, res)=> {
        
        const urlParts = url.parse(req.url, true)
        const queryParams = urlParts.query
        const offersPerPage = 10
        const page =  Number(req.params.page)
        const { phoneNumber } = queryParams

        console.log(queryParams)


        phoneNumber ?        
        offersCtrl.findOffersByPhone(phoneNumber, page, offersPerPage)
        .then((resObj)=>{ res.send(resObj) })
        :
        offersCtrl.getAllOffers(queryParams, page, offersPerPage)
        .then((resObj)=>{ res.send(resObj) })        
    })

    app.get('/api/offer/:id', (req, res)=>{
        offersCtrl.getOffer(req.params.id).then((offer)=>{ res.send(offer) })
    })

    app.put('/api/offer/:id', (req, res) => {
        console.log('/api/offer (UPDATE): =============')
        console.log(req.body)
        // console.log(req.params)
        const newOffer = {
            area:         req.body.area,
            description:  req.body.description,
            phoneNumber:  req.body.phoneNumber,
            // phoneNumbers: [{type: String, type: String, lowercase: true, trim: true}],
            price:       Number(req.body.price),
            address:     req.body.address,
            info:        req.body.info,
            propertyOwnerName: req.body.propertyOwnerName,
            floor:       Number(req.body.floor),
            constructionTypeId: req.body.constructionType,
            propertyTypeId:     req.body.propertyType,
            state:              req.body.state,
            neighborhoodId:     req.body.neighborhood,
            lastCall:           new Date(req.body.lastCall),
            nextCall:           new Date(req.body.nextCall)   
        }

        Offer.update(
            {_id:req.params.id}, 
            newOffer, 
            {multi: false}, 
            function(err, newObj){
                if(err){
                    console.log('ERROR')
                    console.log(err)
                    res.send(err)
                    return
                }

                console.log('updated obj')
                console.log(newObj)

                res.send(newObj)
        })
    })

    app.post('/api/post-offer',(req, res)=>{
        console.log('/api/post-offer')

        console.log(req.body)
        let sendData = req.body
        let userId = req.user ? req.user._id : null

        let returnObj = {}
        returnObj.success = true;

        let phoneNumbers = [];

        sendData.phoneNumber  ? phoneNumbers.push(sendData.phoneNumber)  : false
        sendData.phoneNumber2 ? phoneNumbers.push(sendData.phoneNumber2) : false
        sendData.phoneNumber3 ? phoneNumbers.push(sendData.phoneNumber3) : false

        let newOffer = new Offer({
            constructionTypeId: sendData.constructionType,
            propertyTypeId: sendData.propertyType,
            state: sendData.state,
            neighborhoodId: sendData.neighborhood,

            number: sendData.number,
            
            area: sendData.area,
            description: sendData.description,
            phoneNumber: sendData.phoneNumber,
            phoneNumbers: phoneNumbers,
            price: sendData.price,
            address: sendData.address,
            floor: sendData.floor,
            info: sendData.info,
            propertyOwnerName: sendData.propertyOwnerName,
            addedOn: sendData.addedOn,
            addedFrom: userId,
            nextCall: new Date(),
            lastCall: new Date()
        })

            newOffer.save().then((offer)=>{
                console.log('SAVE OFFER')
                
                console.log(offer)
                ////-----
                let promisePhones = []
                console.log(phoneNumbers)
                phoneNumbers.forEach((phoneNumber)=>{
                    console.log(phoneNumber)
                    const phone = new PhoneNumbers({offerId: offer._id, phoneNumber})
                    promisePhones.push(phone.save())
                })

                Promise.all(promisePhones).then((res)=>{
                    console.log('zapazeni telefoni')
                    console.log(res)
                })
                ////-----

                var promise1 = ConstructionType.find({})
                var promise2 = PropertyType.find({})
                var promise3 = States.find({})
                var promise4 = Neighborhood.find({})
                
        
                Promise.all([promise1, promise2, promise3, promise4]).then(function(values) {
                    returnObj.constructionTypes = values[0]
                    returnObj.propertyTypes = values[1]
                    returnObj.states = values[2]
                    returnObj.neighborhoods = values[3]
                    res.send(returnObj)
                })
                  
            }).catch((err)=>{
                console.log('SAVE ERROR ! => ')
                console.log(err)
                res.send({error: err})
            })
    })
}