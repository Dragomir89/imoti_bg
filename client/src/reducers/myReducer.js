import types from '../actions/types'
// import myActions from '../actions/myActions'


export default (state = {}, action) => {
    
    switch (action.type) {
        
        case types.GET_OFFER_OPTIONS:
            // console.log('GET_OFFER_OPTIONS action.type' )   
            let data = action.payload
            // console.log(data)

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
            // var { constructionTypes, neighborhoods, propertyTypes, states} = res
            console.log('before return ')
            return {
                success:true
            }
        
        default:
            return state;
    }
}


