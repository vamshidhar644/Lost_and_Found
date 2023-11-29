import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './itemDetails.css';

const ItemDetails = ({ item, user, type }) => {
  const [imgSrc, setImageSrc] = useState();

  useEffect(() => {
    if (item.imgpath) {
      const img = new Image();
      img.src = `${item.imgpath}`;

      setImageSrc(img.src);
    }
  }, [item.imgpath]);

  return (
    <div className="item__details">
      <div className="details__box">
        <h5>{item.name} </h5>
        <p className="m-0">{item._id}</p>
        {user && user.role === 0 && (
          <div>
            <p className="m-0">
              <strong>
                Description: <br />
              </strong>
              {item.desc}
              <br />
            </p>
            <p className="m-0">
              <strong>Place: </strong>
              {item.place}
            </p>
          </div>
        )}
        <div>
          <p className="m-0">
            <strong>
              Found on:
              <br />
            </strong>{' '}
            {item.date}
          </p>
        </div>
      </div>

      {user && user.role === 0 ? (
        <div className="details__box2">
          <Link
            className="Returns-btn image__container"
            to="/itemTypes/return-item"
            state={{
              _id: item._id,
              name: item.name,
              desc: item.desc,
              place_found: item.place,
              submited_date: item.date,
              submitedBy_Name: item.submitedBy,
              submitedBy_regId: item.regId,
              submitedBy_phone: item.phone,
              image: imgSrc,
            }}
          >
            <img src={imgSrc} alt="not uploaded" className="w-100 h-100" />
          </Link>
        </div>
      ) : (
        <div>
          <Link
            className="Return__btn"
            to={`/items/${type}/${item._id}`}
            state={{
              _id: item._id,
            }}
          >
            Request
          </Link>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
