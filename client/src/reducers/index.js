import { combineReducers } from 'redux'
import authReducer from './authReducer'
import myReducer from './myReducer'
import addOptionsReducer from './addOptionsReducer'
import showOffersReducer from './showOffersReducer'


export default combineReducers({
    auth: authReducer,
    myReducer,
    addOptionsReducer,
    showOffersReducer
})
