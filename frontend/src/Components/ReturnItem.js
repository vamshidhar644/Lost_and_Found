import React from 'react'
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';

const ReturnItem = () => {
    
  // const { dispatch } = useItemsContext();
  const { user } = useAuthContext();

  const location = useLocation();
//   const handleClick = async () => {
//     if (!user) {
//       return;
//     }
//     const response = await fetch('/api/items/' + item._id, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     const json = await response.json();

//     if (response.ok) {
//       dispatch({ type: 'DELETE_ITEM', payload: json });
//     }
//   };
  if(user){
    const {
        Item_Title,
        Item_Desc,
        Item_Place
      } = location.state;

    return (
      <div className="item-details">
        <h4>{Item_Title}</h4>
        <p>
          <strong>Description </strong>
          {Item_Desc}
        </p>
        <p>
          <strong>Place: </strong>
          {Item_Place}
        </p>
        <p>
          {/* {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })} */}
        </p>
        {/* {
          user && 
          <span onClick={handleClick} className='Return-btn'>
          Return to owner
          </span>
        } */}
      </div>
    )
  }
  else{
    return(
      <div className='Return-Section'>
        <h3>Admin has to login</h3>
        <Link to="/login" className='login-btn'>Admin login</Link>
      </div>
    )
  }
}

export default ReturnItem