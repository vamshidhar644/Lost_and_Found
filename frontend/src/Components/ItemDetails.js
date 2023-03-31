import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ItemDetails = ({ item }) => {
  // const { dispatch } = useItemsContext();
  const { user } = useAuthContext();

  return (
    <div className="item-details">
      <div>
        <h4>{item.name} </h4>
        <p>{item._id}</p>
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
            _id: item._id,
            name: item.name,
            desc: item.desc,
            place_found: item.place,
            submited_date: item.date,
            submitedBy_Name: item.submitedBy,
            submitedBy_regId: item.regId,
            submitedBy_phone: item.phone,
          }}
        >
          Return to owner
        </Link>
      )}
    </div>
  );
};

export default ItemDetails;
