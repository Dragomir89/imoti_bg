import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions  from '../actions/myActions'
import Dropdowns from './formComponents/Dropdowns'
import qs from 'querystring'    

class OffersFilter extends Component {
    constructor(props){
        super(props)

        const values = this.props.selectedValues 

        if(values){
            const { constructionType, propertyType, neighborhood, state} = values
            this.state = {constructionType, propertyType, neighborhood, state}
        }else{
            this.state = {
                constructionType:'',
                propertyType: '',
                state: '',
                neighborhood: ''
            }
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.clickBtn = this.clickBtn.bind(this)
    }

    changeHandler(e){
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount(){
        this.props.getOptions()            
    }

    clickBtn(e){
        e.preventDefault()

        if(e.target.name === 'search'){
            
            const { constructionType, propertyType, neighborhood, state } = this.state

            let search = qs.stringify({constructionType, propertyType, neighborhood, state})
            this.props.getSerchingParameters(search)
        }else{
            this.props.getSerchingParameters(false)
            this.setState({
                constructionType:'',
                propertyType: '',
                state: '',
                neighborhood: ''
            })
        }
    }


    render() {
        let btnStyle = {
            borderRadius: '5%',
            width: '100%',
            margin: '3px'
        }
        return(
        <section>
            <div className='row'>
                <div className='col-md-10'>
                    <Dropdowns 
                        defaultValues={this.state} 
                        changeHandler={this.changeHandler}
                    />
                </div>
                <div>
                    <div className='col-md-2'>
                        <button style={btnStyle}
                        name='search' 
                        onClick={this.clickBtn} 
                        className='btn btn-md btn-primary'>Търси</button>
                        <button style={btnStyle}
                        name='clear' 
                        onClick={this.clickBtn} 
                        className='btn btn-md btn-warning'>Изчисти</button>
                    </div>  
                </div>        
            </div>    
        </section>
        )
    }

}




function mapDispatchToProps(dispatch){
    return{
        getOptions : ()=> dispatch(actions.getDetails()),
        getData: (params)=>{ dispatch(actions.getOffers(params)) }
    }
}

export default connect(()=>{return {}},mapDispatchToProps)(OffersFilter)
