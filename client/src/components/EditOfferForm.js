import React, { Component } from 'react'
import OfferForm from './OfferForm'
import myActions from '../actions/myActions'
import { connect } from 'react-redux'

class EditFormOffer extends Component {

    componentDidMount() {
        const paramId = this.props.match.params.id
        this.props.getOffer(paramId)
    }


    render() {
        
        if(this.props.offer.state){
            const {neighborhood, constructionType, propertyType, state} = this.props.offer
            const defaultValues = {neighborhood, constructionType, propertyType, state}
            
            return (
                <OfferForm 
                    dropdownsValues={defaultValues} 
                    submitForm={this.props.updateOffer}
                    {...this.props.offer}
                />
                
            )
        }else{
            return(<h1>Loading ...</h1>)
        }
    }
}



function mapStateToProps(state){

    return {
        offer: state.offerReducer
    }
}
function mapDispatchToProps(dispatch){
    return {
        updateOffer: (params)=>{
            console.log('Params', params)
            dispatch(myActions.updateOffer(params))
        },
        getOffer:(id)=>{
            dispatch(myActions.getOffer(id))
        }
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditFormOffer)