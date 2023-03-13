import React from 'react';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ItemDetails = ({ item }) => {
  const { dispatch } = useItemsContext();
  const { user } = useAuthContext();

  // const navigate = Navigate();

  const handleClick = async () => {
    // if (!user) {
    //   return;
    // }
    // const response = await fetch('/api/items/' + item._id, {
    //   method: 'DELETE',
    //   headers: {
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // });
    // const json = await response.json();
    // if (response.ok) {
    //   dispatch({ type: 'DELETE_ITEM', payload: json });
    // }
  };

  return (
    <div className="item-details">
      <div>
        <h4>{item.name}</h4>
        <p>
          <strong>Description </strong>
          {item.desc}
        </p>
        <p>
          <strong>Place: </strong>
          {item.place}
        </p>
        <p>
          {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
        </p>
      </div>
      {user && (
        <Link
          className="Return-btn"
          to="return-item"
          state={{
            Item_id: item._id,
            Item_Title: item.name,
            Item_Desc: item.desc,
            Item_Place: item.place,
            Item_Date: item.date,
            Item_SubmitedBy: item.submitedBy,
            Item_RegId: item.regId,
            Item_Phone: item.phone,
          }}
        >
          Return to owner
        </Link>
      )}
    </div>
  );
};

export default ItemDetails;
