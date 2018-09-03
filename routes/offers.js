const mongoose = require('mongoose')
const offersCtrl = require('../services/offers') 
const Offer = mongoose.model('offers')
// const User = mongoose.model('users')
const ConstructionType = mongoose.model('constructionTypes')
const PropertyType = mongoose.model('propertyTypes')
const States = mongoose.model('states')
const Neighborhood = mongoose.model('neighborhoods')

const url = require('url')




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

    app.get('/api/options', (req,res)=>{

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

    app.get('/api/get-offers/:page', (req,res)=> {

        const urlParts = url.parse(req.url, true)
        const queryParams = urlParts.query
        console.log(queryParams)
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
                searchObj.nextCall = {"$gte": new Date(queryParams.nextCall)}
            }
            
        }
        

        let page =  Number(req.params.page)
        let offersPerPage = 10

        let skipVal = offersPerPage * (page - 1) < 0 ? 0 : offersPerPage * (page - 1)  
        //--------------
        let updateOBJ = {
            nextCall: new Date(),
            lastCall: new Date(),
        }
        Offer.update({}, updateOBJ, {multi: true}, function(err, newObj){
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


        return
        //--------------
        if(searchObj) {
                Offer.find(searchObj)
                .skip(skipVal)
                .limit(offersPerPage)
                .populate("propertyTypeId")
                .populate("constructionTypeId")
                .populate("state")
                .populate("neighborhoodId")
                .then((offers)=>{

                    Offer.count(searchObj, function(err, countOffers) {
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
            })
        return
        }

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
    app.get('/api/offer/:id', (req,res)=>{

        Offer.findById(req.params.id, (err,offer)=>{
            if(err){
                console.log('Error')
                res.send(err)
                return
            }
            res.send(offer)
        })
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
}