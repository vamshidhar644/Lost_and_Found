import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
// import avatar from '../assets/24809.jpg';
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ItemDetails = ({ item }) => {
  const { user } = useAuthContext();

  

  return (
    <div className="item-details">
      <div className="details-box">
        <h4>{item.name} </h4>
        <p>{item._id}</p>
        <p>
          <strong>Description: </strong>
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
      <div className="details-box2">
        {user && (
          <Link
            className="Returns-btn"
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
            {/* <img src={avatar} alt="" className="image-container" /> */}
          </Link>
        )}
        {!user && (
          <div className='Returns-btn'>
            {/* <img src={avatar} alt="" className="image-container" /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
