import axios from 'axios'
import types from './types'
import toastr from 'toastr'

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
            axios.get('/api/options',params).then((res)=>{
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
                console.log(res.data)
                
                if(res.data.error){
                    toastr.error(res.data.error.message)    

                    res.data.error.message.indexOf('Number is required') ? 
                    toastr.error('Номера на офертата е задължителен !') : null
                    toastr.error('Офертата не беше добавена !')

                }else {
                    toastr.success('Офертата беше добавена')
                    return
                }

                return dispatch({
                    type: types.POST_OFFER_FORM, 
                    payload:res.data
                })
            }).catch(function (error) {
                toastr.error('Възникна проблем с на сървъра')
                console.log(error);
              })
        }
    },
    getOffers: (page, queryStr)=>{
        // console.log('get offers ',page, queryStr)
        
        if(queryStr){
            queryStr = queryStr.indexOf('?') === -1 ? '?'+queryStr : queryStr   
        }else{
            queryStr = ''
        }

        return (dispatch)=>{
            axios.get(`/api/get-offers/${page}${queryStr}`).then((res)=>{
                // console.log('/api/get-offers', res)
                return dispatch({
                    type: types.GET_OFFERS, 
                    payload:res.data
                })
            })
        }
    }
}