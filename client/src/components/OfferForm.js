import React, { Component } from 'react'
import Dropdowns from './formComponents/Dropdowns'
import Input from './formComponents/Input'
import DatePickerSelector from './formComponents/DatePickerSelector'
import moment from 'moment'

class OfferForm extends Component { 
    constructor(props){
        super(props)
        console.log(props)
        this.state = {...props}
        
        if(props.phoneNumbers){
            let phoneNumber2 = props.phoneNumbers[1] ? props.phoneNumbers[1] : ''
            let phoneNumber3 = props.phoneNumbers[2] ? props.phoneNumbers[2] : ''
            this.state = {phoneNumber2, phoneNumber3}

        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeLastCall = this.handleChangeLastCall.bind(this)
        this.handleChangeNextCall = this.handleChangeNextCall.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillReceiveProps(props){
        this.setState({...props})
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleChangeLastCall(lastCall){
        console.log(lastCall)
        this.setState({lastCall})
    }

    handleChangeNextCall(nextCall){
        this.setState({nextCall})
    }

    handleClick(e) {
        e.preventDefault()
        this.state.submitForm(this.state)
    }

    render(){
        return(
            <div>
                <form>
                <div className="row">
                    <div className="col-md-12">
                        <Dropdowns 
                            defaultValues={this.state.dropdownsValues}
                            changeHandler={this.handleChange}
                        />
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
                    <div className="col-sm-6">
                        <DatePickerSelector 
                            label='Последно обаждане'
                            changeFn={this.handleChangeLastCall} 
                            startDate={moment(this.state.lastCall)}/>
                    </div>
                    <div className="col-sm-6">
                        <DatePickerSelector 
                            label='Следващо обаждане'
                            changeFn={this.handleChangeNextCall} 
                            startDate={moment(this.state.nextCall)}/>
                    </div>
                    
                </div>
                
                <button 
                    onClick={this.handleClick} 
                    className="btn btn-success">Запази</button>
            </form>
            </div>
        )
    }
}

export default OfferForm