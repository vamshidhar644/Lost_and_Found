import React from 'react'
import { useItemsContext } from '../hooks/useItemsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { BsTrash } from 'react-icons/bs'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ItemDetails = ({item}) => {
  const { dispatch } = useItemsContext() 
  const { user } = useAuthContext()

  const handleClick = async () => {

    if(!user){
      return
    }
    const response = await fetch('/api/items/'+item._id, {
      method: 'DELETE',
      headers: {
        'Authorization' : `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_ITEM', payload: json})
    }
  }

  return (
    <div className='item-details'>
        <h4>{item.title}</h4>
        <p><strong>Load (kg): </strong>{item.load}</p>
        <p><strong>Reps: </strong>{item.reps}</p>
        <p>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
        <span onClick={handleClick}><BsTrash/></span>
    </div>
  )
}

export default ItemDetails