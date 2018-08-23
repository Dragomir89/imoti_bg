import types from '../actions/types'
// import myActions from '../actions/myActions'


export default (state = {}, action) => {
    
    switch (action.type) {

        case types.GET_OFFER_OPTIONS:
        console.log('GET_OFFER_OPTIONS action.type' )   
        let data = action.payload
        // console.log(data)

        var { constructionTypes, neighborhoods, propertyTypes, states} = data
        return {
            constructionTypes,
            neighborhoods,
            propertyTypes,
            states
        }

        default: return state

    }

}