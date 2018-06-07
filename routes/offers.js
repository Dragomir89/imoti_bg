const mongoose = require('mongoose')
const offersCtrl = require('../services/offers') 
const Offer = mongoose.model('offers')
const User = mongoose.model('users')
const ConstructionType = mongoose.model('constructionTypes')
const PropertyType = mongoose.model('propertyTypes')
const States = mongoose.model('states')
const Neighborhood = mongoose.model('neighborhoods')




module.exports = (app) =>{
    app.get('/api/offers', (req, res)=>{
        console.log('TUK');
        if(!req.user){
            res.send({"pedal": "EBI SE "})
            return
        }

        offersCtrl.getAllOffers().then((offers)=>{
            console.log(offers)
            res.send(offers)
        })
    })

    app.post('/api/construction-type',(req, res)=>{
        res.send(req.body)
    })

    app.get('/api/test',(req, res)=>{
        res.send({'test': 'test'})
    })
    ///////////////////////////////////////////////////////////////////////////



    app.post('/api/add-details', (req,res)=>{
        console.log('add-details POST BODY: ')
        console.log(req.body)
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
            console.log(values)
            res.send(values)
        })
    })

    app.get('/api/test-test', (req,res)=>{

        let sendData = req.body
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

            console.log('SHOW RETURN OBJECT')
            console.log(returnObj)
            res.send(returnObj)
        });
        

    })

    app.post('/api/post-offer',(req, res)=>{
        console.log('/api/post-offer')
        console.log(req.body)
        let sendData = req.body
        let returnObj = {}
        returnObj.success = true;

        let phoneNumbers = [];

        sendData.phoneNumber  ? phoneNumbers.push(sendData.phoneNumber)  : false
        sendData.phoneNumber2 ? phoneNumbers.push(sendData.phoneNumber2) : false
        sendData.phoneNumber3 ? phoneNumbers.push(sendData.phoneNumber3) : false

        let newOffer = new Offer({
            constructionTypeId: sendData.constructionTypes,
            propertyTypeId: sendData.propertyTypes,
            state: sendData.states,
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
            addedFrom: req.user
        })

            newOffer.save().then((offer)=>{
                console.log('SAVE OFFER')
                
                console.log(offer)
                  

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
                  
            })
    })

    app.get('/api/add-details', (req,res)=>{
        console.log(req.body)
        res.send(req.body)
        return
        offersCtrl.addNewDetails(req.body).save((data)=>{
            console.log('SUCCESS REQUEST')
            res.send({element:'data'})
        })
    })
}