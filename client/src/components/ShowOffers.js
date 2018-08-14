import React, { Component } from 'react'
import myActions from '../actions/myActions'
import { connect } from 'react-redux'
import Tr from './tableComponents/Tr'
import { Link } from 'react-router-dom'
import OffersFilters from './OffersFilters'
import qs from 'querystring'    

class ShowOffers extends Component {
    constructor(props){
        super(props)
            
        this.state = {
            filterValues: null
        }
        this.getSerchingParameters = this.getSerchingParameters.bind(this)
    }

    componentDidMount(){
        let search = this.props.location.search
        if(search){
            search = search.substr(1)
            search = qs.parse(search)

            this.setState({filterValues: search})
        }
        
        const page = this.props.match.params.page ? this.props.match.params.page : 1 
        this.props.getData(page, this.props.location.search)  
    }

    componentDidUpdate(){
        if(!this.props.state){
            return
        }
        let paramsPage = Number(this.props.match.params.page)
        let statePage = Number(this.props.state.page)

        if(Number(paramsPage) !== Number(statePage)){
            this.props.getData(paramsPage,this.props.location.search)
        }
    }

    hasPage(page){
        
        const offersPerPage = 6
        const countOffers = this.props.state.countOffers

        const currentOffersCount = page * offersPerPage

        if(currentOffersCount > countOffers && Math.abs((currentOffersCount - offersPerPage)) < offersPerPage){
            return true
        }else if(page < 1){
            return false
        }else if(currentOffersCount < countOffers){
            return true
        }

        return false
        
    }

    getSerchingParameters(search){
        const pathname = '/show-offers/1'
        this.props.history.push({pathname,search})
        this.props.getData(1, search)
    }

    render(){

        let countOffers = 0
        let offers = []
        let querystring = this.props.location.search

        if(this.props.state){
            offers      = this.props.state.offers
            countOffers = this.props.state.countOffers
            let nexPage = this.props.state.page + 1
            nexPage     = nexPage > this.props.state.lastPageNbr ? 
            this.props.state.lastPageNbr : nexPage
            let prevPage = this.props.state.page - 1
            prevPage    = prevPage < 1 ? 1 : prevPage 


            offers = offers.map((e)=>{
                return (<Tr key={e._id} offer={e} />)
            })

            return (
                <div className='row'>
                    <div className='col-md-3'><h3>Брой на оферти: {countOffers}</h3></div>
                    <div className='col-md-9'>
                        <OffersFilters
                            selectedValues={this.state.filterValues} 
                            getSerchingParameters={this.getSerchingParameters}
                        />
                    </div>
                    <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Вид Имот</th>
                            <th>Състояние</th>
                            <th>Вид Строителство</th>
                            <th>Номер на оферта</th>
                            <th>Квартал</th>
                            <th>Площ</th>
                            {/* <th>Главен телефон</th> */}
                            <th>Цена</th>
                            <th>Адрес</th>
                            <th>Етаж</th>
                            {/* <th>Собственик</th> */}
                            {/* <th>Описание</th> */}
                            {/* <th>Допълнителна информация</th> */}
                            <th>Още</th>
                        </tr>
                    </thead>
                    <tbody>
                        { offers }
                    </tbody>
                    </table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                <Link className="page-link prefpage" to={'/show-offers/' + prevPage +  querystring} aria-label="Previous">
                                    <span aria-hidden="true" className='prefpage'>&laquo;</span>
                                    <span className="sr-only prefpage">Previous</span>
                                </Link>
                                </li>
                                
                                <li className="page-item">
                                <Link  className="page-link nextpage" to={'/show-offers/' + nexPage + querystring  } aria-label="Next">
                                    <span aria-hidden="true" className='nextpage'>&raquo;</span>
                                    <span className="sr-only nextpage">Next</span>
                                </Link>
                                </li>
                            </ul>
                    </nav>
                </div>    
            )
        }


        return(

            <div className="offerWrapper">
                    
            </div>  
        )
    }
}


function mapDispatchToProps(dispatch){
    return{
        getData: (params, querystring)=>{
            dispatch(myActions.getOffers(params, querystring))
        }
    }
}

function mapStateToProps(state){
    return{
        state: state.showOffersReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowOffers)