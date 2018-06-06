import React, { Component } from 'react'
import { connect } from 'react-redux'
 import myActions from '../actions/myActions'
//import * as myActions from '../actions/myActions'  


class AddOptions extends Component {

    constructor(props){
        super(props)
        console.log('ADD OPTIONS STATE')
        console.log(props.state)
        
        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.handleClick  = this.handleClick.bind(this)
    }
   
    handleClick(event) {
        event.preventDefault()
        const sendObj ={}
        if(this.state.constructionType){
            
            sendObj.constructionType = this.state.constructionType
            this.props.postSomeData(sendObj)
            this.setState({constructionType:''})
            return
        }else if(this.state.propertyType){
            console.log('send data -> ', sendObj)
            sendObj.propertyType = this.state.propertyType
            this.props.postSomeData(sendObj)
            this.setState({propertyType:''})
            return
        }else if(this.state.state){
        
            sendObj.state = this.state.state
            this.props.postSomeData(sendObj)
            this.setState({state:''})
            return
        }else{
            return
        }
    }

    handleClickClean(e){
        e.preventDefault()
        this.props.getSomeData()
    }

    handleChange(event){
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]: value})
    }


    render(){
        //console.log('components/AddOptions  myActions:', myActions)
       
        return(
            <form>
                <div className="form-group">
                    <label 
                        htmlFor="propertyType">Вид Имот</label>
                        <input 
                            onChange={this.handleChange}
                            type="text" 
                            className="form-control" 
                            id="propertyType"
                            name="propertyType" 
                            placeholder="Вид Имот"/>
                </div>
                <div className="form-group">
                    <label 
                        htmlFor="constructionType">Вид Строителство</label>
                        <input 
                            onChange={this.handleChange}
                            type="text" 
                            className="form-control" 
                            name="constructionType" 
                            id="constructionType" 
                            placeholder="Вид Строителство"/>
                </div>
                <div className="form-group">
                    <label 
                        htmlFor="state">Състояние</label>
                        <input 
                            onChange={this.handleChange}
                            type="text" 
                            className="form-control" 
                            id="state" 
                            name="state" 
                            placeholder="Състояние"/>
                </div>
                <button onClick={this.handleClick.bind(this)} className="btn btn-success">Запази</button>
                <button onClick={this.handleClickClean.bind(this)} className="btn btn-info">Изчисти</button>
            </form>
          )
      }

}

//export default AddOptions

function mapDispatchToProps(dispatch){
    return{
        postSomeData: (params)=>{
            dispatch(myActions.addDetailsPost(params))
        },
        getSomeData:(params)=>{
            dispatch(myActions.getDetails(params))
        }
    }
}
function mapStateToProps(state){
    return{
        state: state
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddOptions)
