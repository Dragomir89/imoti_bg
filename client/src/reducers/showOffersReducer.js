import types from '../actions/types'


export default function(state = null, action){
   
    switch (action.type) {

        case types.GET_OFFERS:
            // console.log('action.type GET_OFFERS')
            // console.log('action.payload: ', action.payload)
            let newObj1 = JSON.stringify(action.payload)
            newObj1 = JSON.parse(newObj1)
            return {
                offers: newObj1.offers, 
                page: newObj1.page, 
                countOffers: newObj1.countOffers, 
                offersPerPage:newObj1.offersPerPage,
                lastPageNbr: newObj1.lastPageNbr
            }
        
        default:
            return state;
    }
}


