import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
// import avatar from '../assets/24809.jpg';
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useEffect } from 'react';

const ItemDetails = ({ item }) => {
  const { user } = useAuthContext();
  const [imgSrc, setImageSrc] = useState();

  useEffect(() => {
    if (item.imgpath) {
      const img = new Image();
      img.src = `${item.imgpath}`;

      setImageSrc(img.src);
    }
  }, [item.imgpath]);

  return (
    <div className="item-details">
      <div className="details-box">
        <h4>{item.name} </h4>
        <p>{item._id}</p>
        {user && (
          <div>
            <p>
              <strong>
                Description: <br />
              </strong>
              {item.desc}
            </p>
            <p>
              <strong>Place: </strong>
              {item.place}
            </p>
          </div>
        )}
        <div>
          <p>Found on: {item.date}</p>
        </div>
        <p>
          Updated{' '}
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
            <img src={imgSrc} alt="not uploaded" className="image-container" />
          </Link>
        )}
        {/* {!user && (
          <div className="Returns-btn">
            <img src={imgSrc} alt="not uploaded" className="image-container" />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ItemDetails;
