import React, { Component } from 'react'
import myActions from '../actions/myActions'
import { connect } from 'react-redux'
import Tr from './tableComponents/Tr'
import { Link } from 'react-router-dom'

class ShowOffers extends Component {
    constructor(props){
        super(props)
        
    }

    componentDidMount(){
        
        const page = this.props.match.params.page ? this.props.match.params.page : 1 
      
        
        this.props.getData({page:page})
        
    }

    componentDidUpdate(){
        if(!this.props.state.showOffersReducer){
            return
        }

        console.log('componentDidUpdate')
        console.log(this.props.state.showOffersReducer)
        let paramsPage = Number(this.props.match.params.page)
        let statePage = Number(this.props.state.showOffersReducer.page)

        console.log(paramsPage , statePage)

        


        
        if(paramsPage != statePage){
            console.log('new page = ' + paramsPage)
            this.props.getData({page:paramsPage})
        }

    }

    
    hasPage(page){
        
        const offersPerPage = 6
        const countOffers = this.props.state.showOffersReducer.countOffers

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

    render(){
        // console.log('SHOW OFFERS  state')
        // console.log(this.props.state)

        let countOffers = 0;
        let offers = []
        if(this.props.state.showOffersReducer){
            offers      = this.props.state.showOffersReducer.offers
            countOffers = this.props.state.showOffersReducer.countOffers
            let nexPage = this.props.state.showOffersReducer.page + 1
            nexPage     = nexPage > this.props.state.showOffersReducer.lastPageNbr ? 
            this.props.state.showOffersReducer.lastPageNbr : nexPage
            let prevPage = this.props.state.showOffersReducer.page - 1
            prevPage    = prevPage < 1 ? 1 : prevPage 


            offers = offers.map((e)=>{
                return (<Tr key={e._id} offer={e} />)
            })

            return (
                <div>
                    <h3>Брой на оферти: {countOffers}</h3>
                    <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Вид Имот</th>
                            <th>Състояние</th>
                            <th>Вид Строителство</th>
                            <th>Номер на оферта</th>
                            <th>Квартал</th>
                            <th>Площ</th>
                            <th>Главен телефон</th>
                            <th>Цена</th>
                            <th>Адрес</th>
                            <th>Етаж</th>
                            <th>Собственик</th>
                            <th>Описание</th>
                            <th>Допълнителна информация</th>
                        </tr>
                    </thead>
                    <tbody>
                        { offers }
                    </tbody>
                    </table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                <Link className="page-link prefpage" to={'/show-offers/' + prevPage} aria-label="Previous">
                                    <span aria-hidden="true" className='prefpage'>&laquo;</span>
                                    <span className="sr-only prefpage">Previous</span>
                                </Link>
                                </li>
                                {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                                <li className="page-item">
                                <Link  className="page-link nextpage" to={'/show-offers/' + nexPage  } aria-label="Next">
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
        getData: (params)=>{
            dispatch(myActions.getOffers(params))
        }
    }
}
function mapStateToProps(state){
    return{
        state: state
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowOffers)