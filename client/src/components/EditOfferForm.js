import React, { Component } from 'react'
import Dropdowns from './formComponents/Dropdowns'
import Input from './formComponents/Input'
import DatePickerSelector from './formComponents/DatePickerSelector'
import moment from 'moment'

class EditFormOffer extends Component {
    constructor(props){
        super(props)
       
        this.state = { }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeLastCall = this.handleChangeLastCall.bind(this)
        this.handleChangeNextCall = this.handleChangeNextCall.bind(this)

        this.handleClick = this.handleClick.bind(this)

    }

    componentDidMount(){
        // this shood be moved in the constructor !!!!
        this.setState(this.props)
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleChangeLastCall(lastCall){
        this.setState({lastCall})
    }

    handleChangeNextCall(nextCall){
        this.setState({nextCall})
    }

    handleClick(e) {
        e.preventDefault()
        this.props.updateOffer(this.state)
    }

    render(){
        return(
            <div>
                <form>
                <div className="row">
                    <div className="col-md-12">
                        <Dropdowns 
                            changeHandler={this.handleChange}
                            neighborhood={this.props.neighborhood}
                            constructionType={this.props.constructionType}
                            propertyType={this.props.propertyType}
                            state={this.props.state}
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
                            val={this.state.phoneNumbers ? this.state.phoneNumbers[1] : null}
                            changeFn={this.handleChange}/>

                        <Input name='phoneNumber3' 
                            label='Тлефон 3' 
                            type='text'
                            val={this.state.phoneNumbers  ? this.state.phoneNumbers[2] : null}
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


export default EditFormOffer