import React, { Component } from 'react'
import { connect } from 'react-redux'
import myActions from '../actions/myActions'
//import * as myActions from '../actions/myActions'  
import Input from './formComponents/Input'


class AddOptions extends Component {

    constructor(props){
        super(props)
        console.log('ADD OPTIONS STATE')
        console.log(props.state)
        
       
        this.handleChange = this.handleChange.bind(this)
        this.handleClick  = this.handleClick.bind(this)
    }
   

    componentDidMount(){
        this.props.state.addOptionsReducer = this.props.state.addOptionsReducer ? 
        this.props.state.addOptionsReducer : {} 
    }

    handleClick(event) {
        event.preventDefault()

        console.log(this.props.state.addOptionsReducer)
        if(Object.keys(this.props.state.addOptionsReducer).length === 0 
            && 
            this.props.state.addOptionsReducer.constructor === Object){
            
            return
        }
        
        this.props.postData(this.props.state.addOptionsReducer)
        
    }

    handleClickClean(e){
        e.preventDefault()
        this.props.getSomeData()
    }

    handleChange(event){
        const name = event.target.name
        const value = event.target.value

        let changeData = this.props.state.addOptionsReducer
        changeData[name] = value

        this.props.changeSelectData(changeData)
    }


    render(){
        //console.log('components/AddOptions  myActions:', myActions)
        console.log('ADD OPTIONS STATE')
        console.log(this.props.state)
        let addOptionsReducer = this.props.state.addOptionsReducer

        let propertyTypeVal =     addOptionsReducer ? addOptionsReducer.propertyType : ''
        let constructionTypeVal = addOptionsReducer ? addOptionsReducer.constructionType : ''
        let stateVal =            addOptionsReducer ? addOptionsReducer.state : ''
        let neighborhoodVal =     addOptionsReducer ? addOptionsReducer.neighborhood : ''

        return(
            <form>
                <Input
                    name='constructionType' 
                    label="Вид Строителство" 
                    type='text'
                    val={constructionTypeVal}
                    changeFn={this.handleChange}/>
               
                <Input
                    name='propertyType' 
                    label='Вид Имот' 
                    type='text'
                    val={propertyTypeVal}
                    changeFn={this.handleChange}/>
                
               <Input
                    name='state' 
                    label="Състояние" 
                    type='text'
                    val={stateVal}
                    changeFn={this.handleChange}/>

                <Input
                    name='neighborhood' 
                    label="Квартал" 
                    type='text'
                    val={neighborhoodVal}
                    changeFn={this.handleChange}/>


                <button onClick={this.handleClick.bind(this)} className="btn btn-info">Запази</button>
                
            </form>
          )
      }

}

//export default AddOptions

function mapDispatchToProps(dispatch){
    return{
        changeSelectData: (params)=>{
            dispatch(myActions.chnageSelectDetailsOptions(params))
        },
        postData: (params)=>{
            dispatch(myActions.addDetailsPost(params))
        }
    }
}
function mapStateToProps(state){
    return{
        state: state
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddOptions)
