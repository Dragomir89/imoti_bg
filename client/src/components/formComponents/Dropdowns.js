import React, { Component } from 'react'
import { connect } from 'react-redux'

import Select from './Select'
import actions from '../../actions/myActions'

class Dropdowns extends Component{

    componentDidMount(){
        this.props.getOptions()  
    }


    render(){

        if(!this.props){
            return (<h2>Loading .... </h2>)
        }


        return(
        <div className='row'>
            <div className='col-md-3'>
                <Select 
                    defaultValue={this.props.constructionType}
                    name='constructionType' 
                    label='Строителство' 
                    changeFn={ this.props.changeHandler } 
                    options={this.props.constructionTypes}
                />
            </div>
            
            <div className='col-md-3'>
                <Select 
                    defaultValue={ this.props.propertyType }
                    name={'propertyType'} 
                    label='Вид Имот' 
                    changeFn={ this.props.changeHandler } 
                    options={ this.props.propertyTypes }
                />
            </div>
            <div className='col-md-3'>
                <Select 
                    defaultValue={this.props.state}
                    name={'state'} 
                    label='Състояние'
                    changeFn={ this.props.changeHandler } 
                    options={this.props.states}
                />
            </div> 

            <div className='col-md-3'>
            
                <Select 
                    defaultValue={this.props.neighborhood}
                    name={'neighborhood'} 
                    label='Квартал' 
                    changeFn={ this.props.changeHandler } 
                    options={this.props.neighborhoods}
                />
            </div> 
        </div> 
    
        )

    }
}

function mapStateToProps(appState){
    const { 
        constructionTypes, 
        // constructionType, 
        neighborhoods, 
        // neighborhood, 
        propertyTypes, 
        // propertyType, 
        states, 
        // state 
    } = appState.getOptionsReducer
    return{
        constructionTypes,
        // constructionType,
        neighborhoods,
        // neighborhood,
        propertyTypes,
        // propertyType,
        states,
        // state
    }
}

function mapDispatchToProps(dispatch){
    return {
        getOptions: ()=> dispatch(actions.getDetails())  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdowns)