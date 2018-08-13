import React from 'react'

const Select = (props)=>{

    const collection = props.options ? props.options : []

    const defaultOption = (<option defaultValue value='-select-'>-- избери --</option>)

    return(
        <div className="form-group">
            <label htmlFor={props.name}>{ props.label}</label>
            <select 
                name={props.name} 
                onChange={props.changeFn}
                className="form-control form-control-sm">
                {defaultOption}
                {collection.map((e)=>{
                    if (e._id === props.val){
                        //console.log('Selected value: ')
                        //console.log('id: ' +  e._id + ' value: ' + e.value)
                        // return (
                        //     <option 
                        //         key={e._id || e} 
                        //         defaultValue//="selected" 
                        //         value={e._id}>
                        //             {e.value || e}
                        //     </option>)
                    }    
                    return (<option key={e._id}  value={e._id} >{e.value}</option>)
                    
                })}
            </select>
        </div>
    )
}

export default Select
