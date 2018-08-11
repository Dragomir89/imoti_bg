import types from '../actions/types'
// import myActions from '../actions/myActions'


export default (state = {}, action) => {
    
    switch (action.type) {
        
        case types.GET_OFFER_OPTIONS:
            console.log('GET_OFFER_OPTIONS action.type' )   
            let data = action.payload
            console.log(data)

            return {
                offerDetails:data,
                formValues: {
                    constructionTypes: data.constructionTypes[0]._id,
                    propertyTypes: data.propertyTypes[0]._id,
                    states: data.states[0]._id,
                    neighborhoods: data.neighborhoods[0]._id,
                    address:'',
                    area:'',
                    description:'',
                    info:'',
                    number:'',
                    phoneNumber:'',
                    phoneNumber2:'',
                    phoneNumber3:'',
                    price:'',
                    floor: '-1',
                    propertyOwnerName: ''
                }
            }
        
        case types.CHANGE_OFFER_OPTIONS:

            console.log('action.type CHANGE_OFFER_OPTIONS')
            console.log('action.payload: ', action.payload)
            let newObj = JSON.stringify(action.payload)
            newObj = JSON.parse(newObj)
            return newObj

             
       
        case types.POST_OFFER_FORM:
            console.log('POST_OFFER_FORM payload:')
            console.log(action.payload)
            let res = action.payload
            if(res.error){
                return res
            }
            return {
                offerDetails:action.payload,
                formValues: {
                    constructionTypes: action.payload.constructionTypes[0]._id,
                    propertyTypes: action.payload.propertyTypes[0]._id,
                    states: action.payload.states[0]._id,
                    neighborhoods: action.payload.neighborhoods[0]._id,
                    address:'',
                    area:'',
                    description:'',
                    info:'',
                    number:'',
                    phoneNumber:'',
                    phoneNumber2:'',
                    phoneNumber3:'',
                    price:'',
                    floor: '-1'
                }
            }
        
        default:
            return state;
    }
}


