import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'  


import Header from './Header'
import AddOptions from './AddOptions'
import AddOffer from './AddOffer';

const HomePage = ()=>{
    return(<h1>HOME PAGE</h1>)
}

class App extends Component {
    constructor(props){
        super(props)

    }
    componentDidMount(){
        console.log('App.js props', this.props)
        this.props.fetchUser()
    }

    render(){
        console.log('APP COMPONENT STATE!')
        console.log(this.props)
        return(
            <div>
                <BrowserRouter>

                    <div className='container'>
                        <Header/>
                       
                        <Route path="/"            exact component={HomePage} />
                        <Route path="/add-details" exact component={AddOptions} />
                        <Route path="/add-offer"   exact component={AddOffer} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

//export default connect(null, actions)(App)


// function mapDispatchToProps(dispatch){
//     return null
// }
function mapStateToProps(state){
    return{
        state: state
    }
}


export default connect(mapStateToProps, actions)(App)
