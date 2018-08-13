import types from '../actions/types'
// import myActions from '../actions/myActions'


export default (state = {}, action) => {
    
    switch (action.type) {
        
        case types.GET_OFFER_OPTIONS:
            console.log('GET_OFFER_OPTIONS action.type' )   
            let data = action.payload
            console.log(data)

            var { constructionTypes, neighborhoods, propertyTypes, states} = data
            return {
                constructionTypes,
                neighborhoods,
                propertyTypes,
                states
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
            var { constructionTypes, neighborhoods, propertyTypes, states} = res
            return {
                 
                    constructionTypes,
                    neighborhoods,
                    propertyTypes,
                    states,
                    constructionType: action.payload.constructionTypes[0]._id,
                    propertyType: action.payload.propertyTypes[0]._id,
                    state: action.payload.states[0]._id,
                    neighborhood: action.payload.neighborhoods[0]._id,
                    address:'',
                    area:'',
                    description:'',
                    info:'',
                    propertyOwnerName: '',
                    number:'',
                    phoneNumber:'',
                    phoneNumber2:'',
                    phoneNumber3:'',
                    price:'',
                    floor: '-1'
            }
        
        default:
            return state;
    }
}


