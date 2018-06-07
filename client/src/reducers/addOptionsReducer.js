import types from '../actions/types'


export default function(state = null, action){
    
    switch (action.type) {

        case types.CHANGE_OFFER_OPTIONS:
            console.log('action.type CHANGE_OFFER_OPTIONS')
            console.log('action.payload: ', action.payload)
            let newObj1 = JSON.stringify(action.payload)
            newObj1 = JSON.parse(newObj1)
            return newObj1
        
        case types.CHANGE_DETAILS_OPTIONS:

            console.log('action.type CHANGE_DETAILS_OPTIONS')
            console.log('action.payload: ', action.payload)
            let newObj2= JSON.stringify(action.payload)
            newObj2 = JSON.parse(newObj2)
            return newObj2

        case types.ADD_DETAILS:
            console.log('ADD_DETAILS action.type')
            return {addOption : action.payload}
        default:
            return state;
    }
}


