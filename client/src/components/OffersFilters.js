import React, { Component } from 'react'
import { connect } from 'react-redux'

import  actions  from '../actions/myActions'
import Dropdowns from './formComponents/Dropdowns'

class OffersFilter extends Component {
    constructor(props){
        super(props)

        this.state = {
            constructionType:'',
            propertyType: '',
            state: '',
            neighborhood: ''
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.clickSearch = this.clickSearch.bind(this)
    }

    changeHandler(e){
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount(){
        this.props.getOptions()            
    }

    clickSearch(e){
        e.preventDefault()
    }


    render(){
        let btnStyle = {
            borderRadius: '50%'
        }
        return(
        <section>
            {/* <h3>Филтрирай: </h3> */}
            
            <div className='row'>
                <div className='col-md-10'>
                    <Dropdowns changeHandler={this.changeHandler}/>
                </div>
                <div>
                    <button style={btnStyle} onClick={this.clickSearch} className='btn btn-lg btn-primary'>Търси</button>
                </div>
                </div>    
        </section>
        )
    }

}


function mapStateToPorops(state){
    const {constructionTypes, constructionType , neighborhoods, neighborhood, propertyTypes, propertyType} = state.myReducer 

    return{
        constructionTypes,
        constructionType,
        neighborhoods,
        neighborhood,
        propertyTypes,
        propertyType
    }
}

function mapDispatchToProps(dispatch){
    return{
        getOptions : ()=> dispatch(actions.getDetails()) 
    }
}

export default connect(mapStateToPorops,mapDispatchToProps)(OffersFilter)
