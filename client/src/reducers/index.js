import { combineReducers } from 'redux'
import authReducer from './authReducer'
import myReducer from './myReducer'
import addOptionsReducer from './addOptionsReducer'
import showOffersReducer from './showOffersReducer'
import getOptionsReducer from './getOptionsReducer'
import offerReducer from './offerReducer'

export default combineReducers({
    auth: authReducer,
    myReducer,
    addOptionsReducer,
    showOffersReducer,
    getOptionsReducer,
    offerReducer
})
