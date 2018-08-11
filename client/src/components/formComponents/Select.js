import React from 'react'

const Select = (props)=>{

    let collection = []

    collection = props.options ? props.options : []


    return(
        <div className="form-group">
            <label htmlFor={props.name}>{ props.label}</label>
            <select 
                name={props.name} 
                onChange={props.changeFn}
                className="form-control form-control-sm">
                
                {collection.map((e)=>{
                    if (e._id === props.val){
                        //console.log('Selected value: ')
                        //console.log('id: ' +  e._id + ' value: ' + e.value)
                        return (
                            <option 
                                key={e._id || e} 
                                selected="selected" 
                                value={e._id}>
                                    {e.value || e}
                            </option>)
                    }    
                    return (<option key={e._id}  value={e._id} >{e.value}</option>)
                    
                })}
            </select>
        </div>
    )
}

export default Select
