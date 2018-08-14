import React, { Component } from 'react'
import Input from './formComponents/Input'
import { connect } from 'react-redux'
import myActions from '../actions/myActions'
// import { runInThisContext } from 'vm';
// import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from 'constants';
import Dropdowns from './formComponents/Dropdowns'

class AddOffer extends Component{
    constructor(props){
        super(props)
        
        this.state = {
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
    

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    
    handleChange(event){
        const name = event.target.name
        const value = event.target.value
        
        this.setState({[name]: value})
    }

    handleClick(e){
        e.preventDefault()
        this.props.postForm(this.state)
             
    }

    componentWillReceiveProps(nextProps){
        const { constructionTypes, neighborhoods, propertyTypes, states} = nextProps.myReducer
        this.setState({constructionTypes, neighborhoods, propertyTypes, states})
    }

    componentDidMount(){
        this.props.getSomeData()
    }

    render() {

        // if(this.props.myReducer){
        //     if(this.props.myReducer.error){
        //         return(
        //             <div>
        //                 <h1>{this.props.myReducer.error.message}</h1>
        //                 <h2>Натисни F5, провери дали ти се е качила офертата и ако не работи ми звънни</h2>
        //             </div>)
        //     }
        // }
    

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
