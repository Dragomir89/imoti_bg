import types from '../actions/types'
// import myActions from '../actions/myActions'


export default (state = {}, action) => {
    
    switch (action.type) {
       
        case types.CHANGE_OFFER_OPTIONS:

            let newObj = JSON.stringify(action.payload)
            newObj = JSON.parse(newObj)
            return newObj

        case types.POST_OFFER_FORM:
        
            let res = action.payload
            if(res.error){
                return res
            }

           
            const emptyOffer = {
                    number:'',
                    address:'',
                    area:'',
                    constructionType:'',
                    description:"",
                    floor:'',
                    info:'',
                    neighborhood:'',
                    phoneNumber:'',
                    phoneNumber2: '',
                    phoneNumber3: '',
                    phoneNumbers:[],
                    price:'',
                    propertyOwnerName:'',
                    propertyType:'',
                    state:''
                }
                
            return emptyOffer
        
        default:
            return state
    }
}


