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

    componentDidMount(){
        console.log('App.js props', this.props)
        this.props.fetchUser()
    }

    render(){
        return(
            <div>
                <BrowserRouter>
                  
                    <div className='container'>
                    <Header/>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/add-details" exact component={AddOptions} />
                        <Route path="/add-offer" exact component={AddOffer} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App)
