import React, { Component } from 'react'
import { connect } from 'react-redux'

class OfferDetails extends Component {
    constructor(props){
        super(props)
        console.log('constructor')
        this.state = {
            offer: {}
        }
    }

    componentDidMount(){
        // Да се направи със заявка от сървъра !!!!!
        const paramId = this.props.match.params.id        
        const offers = this.props.offers
        let offer = offers.filter((e)=>{ if(e._id === paramId ){return e}})[0]
        this.setState({offer})
    }


    render(){
        
        const offer = this.state.offer
        
        if(JSON.stringify(offer) === JSON.stringify({})){
            return ('No Offer')
        }

        return(
            <div>
                <h2>Детайли</h2>
                <p>Добавен на: {new Date(offer.addedOn).toLocaleDateString()}</p>
                <p>Адрес: {offer.address}</p>
                <p>Кв: {offer.area}</p>
                <p>Вид Стоителство: {offer.constructionTypeId.value}</p>
                <p>Етаж: {offer.floor}</p>
                <p>Описание: {offer.description}</p>
                <p>Допълнително инфо: {offer.info}</p>
                <p>Квартал: {offer.neighborhoodId.value}</p>
                <p>Номер На Оферта: {offer.number}</p>
                <p>Телефони: </p>
                <ul>
                    {offer.phoneNumbers.map((e,i)=>{
                        return(<li key={i}>{e}</li>)
                    })}
                </ul>
                <p>Цена: {offer.price}</p>
                <p>Собственик: {offer.propertyOwnerName}</p>
                <p>Състояние: {offer.state.value}</p>
            </div>
            

        )

    }
}


function mapStateToProps(state){
    console.log( 'OfferDetails  mapStateToProps - >')
    console.log(state.showOffersReducer)
    return{
         offers: state.showOffersReducer.offers
    }
}


export default connect(mapStateToProps)(OfferDetails)