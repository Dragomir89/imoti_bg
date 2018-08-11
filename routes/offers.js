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
        console.log("========================================================================")
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
            console.log("RESPONSE: ")
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
            addedFrom: userId
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
                  
            }).catch((err)=>{
                console.log('SAVE ERROR ! => ')
                console.log(err)
                res.send({error: err})
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

    app.get('/api/get-offers/:page', (req,res)=>{

        // var newData = {'neighborhoodId':'5b1930664bb5d800041f468b'};
        
        // Offer.update({}, newData, {multi: true}, function(err, doc){
        //     if (err) return res.send(500, { error: err });
        //     return res.send("succesfully saved");
        // });
        // return
        let page =  Number(req.params.page)
        console.log('page = ' + page)
        let offersPerPage = 7

        let skipVal = offersPerPage * (page - 1) < 0 ? 0 : offersPerPage * (page - 1)  
        console.log('skip value = ' + skipVal)
        Offer.find()
            .skip(skipVal)
            .limit(offersPerPage)
            .populate("propertyTypeId")
            .populate("constructionTypeId")
            .populate("state")
            .populate("neighborhoodId")
            .then((offers)=>{

                Offer.count({}, function(err, countOffers) {
                    countOffers = Number(countOffers)
                    let lastPageNbr = countOffers / offersPerPage
                    if(!Number.isInteger(lastPageNbr)){
                        lastPageNbr = Math.floor(lastPageNbr) + 1
                    }


                    res.send({
                        offers,
                        page,
                        countOffers,
                        offersPerPage,
                        lastPageNbr
                    })
               });

                // res.send({offers: offers,page:page})
        })
    })
}