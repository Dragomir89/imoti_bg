import React from 'react'

const Tr =(props)=>{

    const {
        address, 
        area, 
        constructionTypeId, 
        floor, 
        info, 
        number, 
        phoneNumber, 
        phoneNumbers, 
        price, 
        propertyOwnerName, 
        propertyTypeId, 
        state,
        description,
        neighborhoodId
    } = props.offer

    
    // console.log('Vid imot')
    // console.log(propertyTypeId)
    // console.log('Kvartal')
    // console.log(neighborhoodId)
    return(
        
        <tr>
            <td>{propertyTypeId.value}</td>
            <td>{state.value}</td>
            <td>{constructionTypeId.value}</td>
            <td>{number}</td>
            <td>{neighborhoodId.value}</td>
            
            <td>{area}</td>
            <td>{phoneNumber}</td>
            <td>{price}</td>
            <td>{address}</td>
            <td>{floor}</td>
            <td>{propertyOwnerName}</td>
            <td>{description}</td>
            <td>{info}</td>
        </tr>
    )
}

export default Tr