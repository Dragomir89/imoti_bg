const mongoose = require('mongoose')
const offersCtrl = require('../services/offers') 
const Offer = mongoose.model('offers')
const User = mongoose.model('users')
const ConstructionType = mongoose.model('constructionTypes')
const PropertyType = mongoose.model('propertyTypes')
const States = mongoose.model('states')




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
        console.log('POST BODY: ')
        console.log(req.body)

        offersCtrl.addNewDetails(req.body).save((err)=>{
            
            let returnObj = {err:err}
            res.send(returnObj)
        })
    })

    app.get('/api/test-test', (req,res)=>{
        let sendData = req.body
        let returnObj = {}

        var promise1 = ConstructionType.find({})
        var promise2 = PropertyType.find({})
        var promise3 = States.find({})

        Promise.all([promise1, promise2, promise3]).then(function(values) {
            returnObj.constructionTypes = values[0]
            returnObj.propertyTypes = values[1]
            returnObj.states = values[2]
            res.send(returnObj)
        });
        

    })

    app.post('/api/post-offer',(req, res)=>{
        console.log('/api/post-offer')
        console.log(req.body)
        let sendData = req.body
        let returnObj = {}
        returnObj.success = true;

        let newOffer = new Offer({
            constructionTypeId: sendData.constructionTypes,
            propertyTypeId: sendData.propertyTypes,
            state: sendData.states,
            number: sendData.number,
            area: sendData.area,
            description: sendData.description,
            phoneNumber: sendData.phoneNumber,
            price: sendData.price,
            address: sendData.address,
            floor: sendData.floor,
            info: sendData.info
        })

            newOffer.save().then((offer)=>{
                console.log('SAVE OFFER')
                
                console.log(offer)
                  

                var promise1 = ConstructionType.find({})
                var promise2 = PropertyType.find({})
                var promise3 = States.find({})
        
                Promise.all([promise1, promise2, promise3]).then(function(values) {
                    returnObj.constructionTypes = values[0]
                    returnObj.propertyTypes = values[1]
                    returnObj.states = values[2]
                    res.send(returnObj)
                })
                  
        
            }).catch(err=>{
                res.send({error: true,err})
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