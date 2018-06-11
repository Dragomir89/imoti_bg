import axios from 'axios'
import types from './types'
// import { request } from 'http';

export default {
    addDetailsPost : (params) => {

        //console.log('actions/myActions.js  params:', params)
        
        let options = { 
            method: 'post',
            url: '/api/add-details',
            data: params
        }

        return (dispatch) => {
            
            axios(options).then((res)=>{
                console.log('/api/add-details server res: ', res)
                return dispatch({
                    type: types.ADD_DETAILS, 
                    payload:res.data
                })
            })
        }
    },

    getDetails: (params) =>{
        return (dispatch) =>{
            axios.get('/api/test-test',params).then((res)=>{
                console.log('/api/test-test server res: ', res)
                return dispatch({
                    type: types.GET_OFFER_OPTIONS, 
                    payload:res.data
                })
            })   
        }
    },
    chnageSelectDetailsOffer: (params) =>{
        return (dispatch) =>{
            return dispatch({
                type: types.CHANGE_OFFER_OPTIONS, 
                payload:params
            })
        }
    },
    chnageSelectDetailsOptions: (params) =>{
        return (dispatch) =>{
            return dispatch({
                type: types.CHANGE_DETAILS_OPTIONS, 
                payload:params
            })
        }
    },
    postOfferForm: (params)=>{
        return (dispatch) => {
            params.addedOn = new Date()
            let options = { 
                method: 'post',
                url: '/api/post-offer',
                data: params
            }
  
            axios(options).then((res)=>{
                console.log('/api/post-offer server res: ', res)
                return dispatch({
                    type: types.POST_OFFER_FORM, 
                    payload:res.data
                })
            })
        }
    },
    getOffers: (params)=>{
        // console.log('ACTION PARAMS ',params)
        return (dispatch)=>{
            axios.get('/api/get-offers/' + params.page).then((res)=>{
                console.log('/api/get-offers', res)
                return dispatch({
                    type: types.GET_OFFERS, 
                    payload:res.data
                })
            })
        }
    }
}