import React, { Component } from 'react'
import myActions from '../actions/myActions'
import { connect } from 'react-redux'
import OffersFilters from './OffersFilters'
import TableOffers from './tableComponents/TableOffers'
import Pagination from './tableComponents/Pagination'
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
        const page = this.props.match.params.page ? this.props.match.params.page : 1         
        let search = this.props.location.search

        if(search){
            search = search.substr(1)
            search = qs.parse(search)
            this.setState({filterValues: search})
        }
        
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


    getSerchingParameters(search){
        const pathname = '/show-offers/1'
        this.props.history.push({pathname,search})
        this.props.getData(1, search)
    }

    render(){

        if(this.props.state) {
            return (
                <div className='row'>
                    <div className='col-md-3'>
                        <h3>Брой на оферти: {this.props.state.countOffers}</h3>
                    </div>
                    <div className='col-md-9'>
                        <OffersFilters
                            selectedValues={this.state.filterValues} 
                            getSerchingParameters={this.getSerchingParameters}
                        />    
                    </div>
                    <TableOffers offers={this.props.state.offers} />
                    <Pagination 
                        currentPage={this.props.state.page}
                        baseUrl='/show-offers/'
                        querystring={this.props.location.search}
                        lastPage={this.props.state.lastPageNbr}
                    />
                
                </div>    
            )
        }

        return(

            <div className="offerWrapper">
                <h1>Loading ....</h1>
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
    // console.log("mapStateToProps")
    // console.log(state.showOffersReducer)

    return{
        state: state.showOffersReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowOffers)