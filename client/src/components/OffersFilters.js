import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from './formComponents/Select'
import actions  from '../actions/myActions'
import Dropdowns from './formComponents/Dropdowns'
import qs from 'querystring'    
import DatePickerSelector from './formComponents/DatePickerSelector'
import moment from 'moment'

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
                neighborhood: '',
                countOffers: 10,
                nextCall: moment()
            }
        }
        this.changeHandlerDatePicker = this.changeHandlerDatePicker.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.clickBtn = this.clickBtn.bind(this)
    }

    changeHandler(e){
        this.setState({[e.target.name]: e.target.value})
    }

    changeHandlerDatePicker(date){
        this.setState({'nextCall': date})
    }

    componentDidMount(){
        this.props.getOptions()            
    }

    clickBtn(e){
        e.preventDefault()

        if(e.target.name === 'search') {
            
            let { constructionType, propertyType, neighborhood, state, countOffers, nextCall } = this.state
            nextCall = moment(this.state.nextCall).format('YYYY-MM-DD')
            const search = qs.stringify({constructionType, propertyType, neighborhood, state, countOffers, nextCall})
            this.props.getSerchingParameters(search)
        }else{
            this.props.getSerchingParameters(false)
            this.setState({
                constructionType:'',
                propertyType: '',
                state: '',
                neighborhood: '',
                countOffers: 10,
                nextCall: moment()
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
                    <div className='row'>
                        <div className='col-md-12'>
                            <Dropdowns 
                                defaultValues={this.state} 
                                changeHandler={this.changeHandler}
                            />
                        </div>
                    </div>    
                    <div className='row'>
                        <div className='col-md-2'>
                            <Select 
                                label='Покажи'
                                options={[{value: 10, _id:10},{value:15, _id:15}]} 
                                defaultValue={10}/>
                        </div>
                        <div className='col-md-3'>
                            <DatePickerSelector 
                                label='Следващо обаждане'
                                changeFn={this.changeHandlerDatePicker} 
                                startDate={this.state.nextCall}/>
                        </div>        
                    </div>    
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
