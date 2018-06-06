import { combineReducers } from 'redux'
import authReducer from './authReducer'
import myReducer from './myReducer'


export default combineReducers({
    auth: authReducer,
    myReducer
})
