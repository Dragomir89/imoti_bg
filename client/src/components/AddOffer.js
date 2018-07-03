import React, { Component } from 'react'
import Select from './formComponents/Select'
import Input from './formComponents/Input'
import { connect } from 'react-redux'
import myActions from '../actions/myActions'
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from 'constants';


class AddOffer extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            propertyTypes:'',
            constructionTypes: ''
        }
        console.log('ADD OFFER STATE')
        console.log(props.state)

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    
    handleChange(event){
        const name = event.target.name
        const value = event.target.value
        console.log(name,value)
        // this.setState({[name]: value})
        
        let changeData = this.props.state.myReducer
        //console.log(changeData)
        changeData.formValues[name] = value

        this.props.changeSelectData(changeData)

    }

    handleClick(e){
        e.preventDefault()
        console.log(this.props.state.myReducer.formValues)
        this.props.postForm(this.props.state.myReducer.formValues)
             
    }


    componentDidMount(){
        this.props.getSomeData()
    }

    
    render() {
        console.log('ADD OFFER RENDER STATE')
        // console.log(this.props.state.myReducer)
        console.log(this.props.state)

        if(this.props.state.myReducer){
            if(this.props.state.myReducer.error){
                return(
                    <div>
                        <h1>{this.props.state.myReducer.error.message}</h1>
                        <h2>Натисни F5, провери дали ти се е качила офертата и ако не работи ми звънни</h2>
                    </div>)
            }
        }
    
        let constructionTypesOptions = this.props.state.myReducer ? this.props.state.myReducer.offerDetails.constructionTypes : []
        let propertyTypesOptions = this.props.state.myReducer     ? this.props.state.myReducer.offerDetails.propertyTypes : []
        let statesOptions = this.props.state.myReducer            ? this.props.state.myReducer.offerDetails.states : []
        let neighborhoodOptions = this.props.state.myReducer      ? this.props.state.myReducer.offerDetails.neighborhoods : []
        
        let formValues = this.props.state.myReducer ? this.props.state.myReducer.formValues : {}
       
        return(
            <div>
                <form>
                <div className="row">
                    <div className="col-sm-4">

                        <Select name={'constructionTypes'} 
                            label='Вид Строителство' 
                            changeFn={ this.handleChange } 
                            val={formValues.constructionTypes}
                            options={constructionTypesOptions}/>
                
                        <Select name={'propertyTypes'} 
                            label='Вид Имот' 
                            changeFn={ this.handleChange } 
                            val={formValues.propertyTypes}
                            options={propertyTypesOptions}/>

                        <Select name={'states'} 
                            label='Състояние'
                            changeFn={ this.handleChange } 
                            val={formValues.states} 
                            options={statesOptions}/> 

                        <Select name={'neighborhoods'} 
                            label='Квартал' 
                            changeFn={ this.handleChange } 
                            val={formValues.neighborhoods}
                            options={neighborhoodOptions}/>

                    </div>
                    <div className="col-sm-4">
                    
                        <Input name='number' 
                            label='Номер На Оферта' 
                            type='number'
                            val={formValues.number}
                            changeFn={this.handleChange}/>

                        <Input name='area' 
                            label='Квадратура' 
                            type='number'
                            val={formValues.area}
                            changeFn={this.handleChange}/>

                        <Input name='description' 
                            label='Описание' 
                            type='text'
                            val={formValues.description}
                            changeFn={this.handleChange}/>
                        
                        <Input name='floor' 
                            label='Етаж' 
                            type='number'
                            val={formValues.floor}
                            changeFn={this.handleChange}/>
                        
                        <Input name='price' 
                            label='Цена' 
                            type='number'
                            val={formValues.price}
                            changeFn={this.handleChange}/>

                        <Input name='address' 
                            label='Адрес' 
                            type='text'
                            val={formValues.address}
                            changeFn={this.handleChange}/>
                    </div>
                    <div className="col-sm-4">
                        
                            
                        <Input name='info' 
                            label='Долълнително Инфо' 
                            type='text'
                            val={formValues.info}
                            changeFn={this.handleChange}/>

                        <Input name='propertyOwnerName' 
                            label='Име на Собственик' 
                            type='text'
                            val={formValues.propertyOwnerName}
                            changeFn={this.handleChange}/>
                        
                        <Input name='phoneNumber' 
                            label='Тлефон Главен' 
                            type='text'
                            val={formValues.phoneNumber}
                            changeFn={this.handleChange}/>
                            
                        <Input name='phoneNumber2' 
                            label='Тлефон 2' 
                            type='text'
                            val={formValues.phoneNumber2}
                            changeFn={this.handleChange}/>

                        <Input name='phoneNumber3' 
                            label='Тлефон 3' 
                            type='text'
                            val={formValues.phoneNumber3}
                            changeFn={this.handleChange}/>
                    </div>
                </div>

                <button onClick={this.handleClick.bind(this)} className="btn btn-success">Запази</button>
            </form>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch){
    return{
        getSomeData:(params)=>{
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
        state: state
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddOffer)
