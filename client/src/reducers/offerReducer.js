import types from '../actions/types'
// import myActions from '../actions/myActions'


export default (state = {}, action) => {
    
    switch (action.type) {

        case types.GET_OFFER:
            let data = action.payload
            console.log('GET OFFER REDUCER')
            console.log(data)
            const newObj = {
                _id:data._id,
                addedOn:data.addedOn,
                address:data.address,
                area:data.area,
                constructionType: data.constructionTypeId,
                description: data.description,
                floor: data.floor,
                info: data.info,
                lastCall: data.lastCall,
                neighborhood:data.neighborhoodId,
                nextCall:data.nextCall,
                number:data.number,
                phoneNumber:data.phoneNumber,
                phoneNumbers: data.phoneNumbers,
                price:data.price,
                propertyOwnerName:data.propertyOwnerName,
                propertyType : data.propertyTypeId,
                state:data.state
            }
            return newObj

        default: return state

    }

}