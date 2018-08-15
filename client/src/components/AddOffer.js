import React, { Component } from 'react'
import Input from './formComponents/Input'
import { connect } from 'react-redux'
import myActions from '../actions/myActions'
import Dropdowns from './formComponents/Dropdowns'


class AddOffer extends Component{
    constructor(props){
        super(props)
        
        this.state = this.defaultState()

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    defaultState(){
        return{
            propertyTypes:[],
            constructionTypes: [],
            states: [],
            neighborhoods: [],
            constructionType: '',
            propertyType: '',
            state: '',
            neighborhood: '',
            address:'',
            area:'',
            description:'',
            info:'',
            number:'',
            phoneNumber:'',
            phoneNumber2:'',
            phoneNumber3:'',
            price:'',
            floor: '-1',
            propertyOwnerName: ''
        }
    }
    
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleClick(e){
        e.preventDefault()
        this.props.postForm(this.state)
    }

    componentWillReceiveProps(nextProps){
        const success = nextProps.myReducer.success
        if(success){ this.setState(this.defaultState()) }
    }

    componentDidMount(){
        this.props.getSomeData()
    }

    render() {
        return(
            <div>
                <form>
                <div className="row">
                    <div className="col-md-12">
                        <Dropdowns defaultValues={this.state} changeHandler={this.handleChange}/>
                    </div>
                    
                    <div className="col-sm-4">
                        <Input name='number' 
                            label='Номер На Оферта' 
                            type='number'
                            val={this.state.number}
                            changeFn={this.handleChange}/>

                        <Input name='area' 
                            label='Квадратура' 
                            type='number'
                            val={this.state.area}
                            changeFn={this.handleChange}/>

                        <Input name='description' 
                            label='Описание' 
                            type='text'
                            val={this.state.description}
                            changeFn={this.handleChange}/>
                        
                        <Input name='floor' 
                            label='Етаж' 
                            type='number'
                            val={this.state.floor}
                            changeFn={this.handleChange}/>
                        
                    </div>
                    
                    <div className="col-sm-4">
                        <Input name='price' 
                            label='Цена' 
                            type='number'
                            val={this.state.price}
                            changeFn={this.handleChange}/>
            
                        <Input name='address' 
                            label='Адрес' 
                            type='text'
                            val={this.state.address}
                            changeFn={this.handleChange}/>

                        <Input name='info' 
                            label='Долълнително Инфо' 
                            type='text'
                            val={this.state.info}
                            changeFn={this.handleChange}/>

                        <Input name='propertyOwnerName' 
                            label='Име на Собственик' 
                            type='text'
                            val={this.state.propertyOwnerName}
                            changeFn={this.handleChange}/>

                    </div>
                    <div className="col-sm-4">                        
                        <Input name='phoneNumber' 
                            label='Тлефон Главен' 
                            type='text'
                            val={this.state.phoneNumber}
                            changeFn={this.handleChange}/>
                            
                        <Input name='phoneNumber2' 
                            label='Тлефон 2' 
                            type='text'
                            val={this.state.phoneNumber2}
                            changeFn={this.handleChange}/>

                        <Input name='phoneNumber3' 
                            label='Тлефон 3' 
                            type='text'
                            val={this.state.phoneNumber3}
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
        myReducer: state.myReducer
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddOffer)
