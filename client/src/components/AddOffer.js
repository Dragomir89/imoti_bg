import React, { Component } from 'react'
import { connect } from 'react-redux'
import myActions from '../actions/myActions'
import OfferForm from './OfferForm'


class AddOffer extends Component{

    render() {
        return(
            <OfferForm 
                submitForm={this.props.postForm}
            />
        )
    }
}


function mapDispatchToProps(dispatch){
    return{
        getDetails:(params)=>{
            dispatch(myActions.getDetails(params))
        },
        changeSelectData:(params)=>{
            dispatch(myActions.chnageSelectDetailsOffer(params))
        },
        postForm:(params)=>{
            dispatch(myActions.postOfferForm(params))
        }
    }
}
function mapStateToProps(state){
    return{
        myReducer: state.myReducer
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddOffer)
