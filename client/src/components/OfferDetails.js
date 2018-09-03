import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditOfferForm from './EditOfferForm'
import myActions from '../actions/myActions'

class OfferDetails extends Component {
    constructor(props){
        super(props)

        this.state = {
            offer: {},
            showEditForm: true
        }
    }

    componentDidMount(){
        const paramId = this.props.match.params.id        
        this.props.getOffer(paramId)
    }

    showHideEditForm(e){
        e.preventdefault()
        const showEditForm = this.state.showEditForm ? false : true
        this.setState({showEditForm})
    }



    render() {
        
        const offer = this.props.offer
        
        if(JSON.stringify(offer) === JSON.stringify({})) {
            return ('No Offer')
        }

        let editOfferForm = this.state.showEditForm ? <EditOfferForm {...this.props.offer} updateOffer={this.props.updateOffer}/> : null
        

        return(
            <div>
                { editOfferForm }
            </div>

            // <div>
            //     <h2>Детайли</h2>
            //     <p>Добавен на: {new Date(offer.addedOn).toLocaleDateString()}</p>
            //     <p>Адрес: {offer.address}</p>
            //     <p>Кв: {offer.area}</p>
            //     <p>Вид Стоителство: {offer.constructionTypeId.value}</p>
            //     <p>Етаж: {offer.floor}</p>
            //     <p>Описание: {offer.description}</p>
            //     <p>Допълнително инфо: {offer.info}</p>
            //     <p>Квартал: {offer.neighborhoodId.value}</p>
            //     <p>Номер На Оферта: {offer.number}</p>
            //     <p>Телефони: </p>
            //     <ul>
            //         {offer.phoneNumbers.map((e,i)=>{
            //             return(<li key={i}>{e}</li>)
            //         })}
            //     </ul>
            //     <p>Цена: {offer.price}</p>
            //     <p>Собственик: {offer.propertyOwnerName}</p>
            //     <p>Състояние: {offer.state.value}</p>
                
            //     <button >Промени</button>
                
            
            // </div>
            

        )

    }
}


function mapStateToProps(state){
    // console.log('mapStateToProps - > Offer details')
    // console.log(state.offerReducer)
    return{
        offer: state.offerReducer
    }
}
function mapDispatchToProps(dispatch){
    return {
        updateOffer: (params)=>{
            dispatch(myActions.updateOffer(params))
        },
        getOffer:(id)=>{
            dispatch(myActions.getOffer(id))
        }
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails)