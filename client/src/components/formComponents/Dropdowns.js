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

        const defaultValues = this.props.defaultValues

        return(
        <div className='row'>
            <div className='col-md-3'>
                <Select 
                    defaultValue={defaultValues['constructionType']}
                    name='constructionType' 
                    label='Строителство' 
                    changeFn={ this.props.changeHandler } 
                    options={this.props.constructionTypes}
                />
            </div>
            
            <div className='col-md-3'>
                <Select 
                    defaultValue={defaultValues['propertyType']}
                    name={'propertyType'} 
                    label='Вид Имот' 
                    changeFn={ this.props.changeHandler } 
                    options={this.props.propertyTypes}
                />
            </div>
            <div className='col-md-3'>
                <Select 
                    defaultValue={defaultValues['state']}
                    name={'state'} 
                    label='Състояние'
                    changeFn={ this.props.changeHandler } 
                    options={this.props.states}
                />
            </div> 

            <div className='col-md-3'>
            
                <Select 
                    defaultValue={defaultValues['neighborhood']}
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
    // console.log('Map State To Props Drop')
    // console.log(appState)
    // return {}
    const { 
        constructionTypes, 
        constructionType, 
        neighborhoods, 
        neighborhood, 
        propertyTypes, 
        propertyType, 
        states, 
        state } = appState.myReducer
    return{
        constructionTypes,
        constructionType,
        neighborhoods,
        neighborhood,
        propertyTypes,
        propertyType,
        states,
        state
    }
}

function mapDispatchToProps(dispatch){
    return {
        getOptions: ()=> dispatch(actions.getDetails())  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdowns)