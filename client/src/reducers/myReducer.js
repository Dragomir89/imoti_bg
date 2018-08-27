import types from '../actions/types'
// import myActions from '../actions/myActions'


export default (state = {}, action) => {
    
    switch (action.type) {
        
    
        case types.CHANGE_OFFER_OPTIONS:

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
                success:true
            }
        
        default:
            return state;
    }
}


