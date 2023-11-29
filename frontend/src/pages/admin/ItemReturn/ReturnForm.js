import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import './ReturnItems.css';
import NonAdmin from '../../NonAdmin';
import PostMongo from '../../../helpers/postMongo';

const ReturnItem = ({ user }) => {
  const location = useLocation();
  const { itemReturn } = PostMongo();

  const [recieved_date, setRecievedDate] = useState('');
  const [recievedBy_Name, setRecievedBy] = useState('');
  const [recievedBy_regId, setRecievedRegid] = useState('');
  const [recievedBy_phone, setRecievedPhone] = useState('');
  const [father_phone, setFatherPhone] = useState('');
  const [error, setError] = useState(null);

  if (user) {
    const {
      _id,
      name,
      desc,
      place_found,
      submited_date,
      submitedBy_Name,
      submitedBy_regId,
      submitedBy_phone,
      image,
    } = location.state;

    const handleClick = async (e) => {
      e.preventDefault();

      const itemDetais = {
        _id,
        name,
        desc,
        place_found,
        submited_date,
        submitedBy_Name,
        submitedBy_regId,
        submitedBy_phone,
        recieved_date,
        recievedBy_Name,
        recievedBy_regId,
        recievedBy_phone,
        father_phone,
      };

      if (user) {
        await itemReturn(itemDetais, user);
      }
    };

    return (
      <>
        <div className="Return__Container d-flex p-4 mt-4 gap-5">
          <div className="Details__Content">
            <div className="Item_Return__Row">
              <h4>Entry number : </h4>
              <p>{_id}</p>
            </div>
            <div className="Item_Return__Row">
              <h4>Item : </h4>
              <p>{name}</p>
            </div>
            <div className="Item_Return__Row">
              <h4>Description : </h4>
              <p>{desc}</p>
            </div>
            <div className="Item_Return__Row">
              <h4>Place found : </h4>
              <p>{place_found}</p>
            </div>
            <div className="Item_Return__Row">
              <h4>Date : </h4>
              <p>{submited_date}</p>
            </div>
            <div className="Item_Return__Row">
              <h4>Submitted by : </h4>
              <p>{submitedBy_Name}</p>
            </div>
            <div className="Item_Return__Row">
              <h4>Registration number/Employee id </h4>
              <p>{submitedBy_regId}</p>
            </div>
            <div className="Item_Return__Row">
              <h4>Phone number : </h4>
              <p>{submitedBy_phone}</p>
            </div>
            <div className="image_container">
              <img src={image} alt="not uploaded" className="w-100 h-100" />
            </div>
          </div>

          <form className="Owner-Content">
            {error && <div className="error">{error}</div>}

            <div className="Item_Return__Row">
              <h4>Recieved Date: </h4>
              <input
                type="date"
                onChange={(e) => setRecievedDate(e.target.value)}
                value={recieved_date}
                required
              />
            </div>
            <div className="Item_Return__Row">
              <h4>Recieved by:</h4>
              <input
                type="text"
                onChange={(e) => setRecievedBy(e.target.value)}
                value={recievedBy_Name}
                required
              />
            </div>

            <div className="Item_Return__Row">
              <h4>Registration number / Employee id: </h4>
              <input
                type="text"
                onChange={(e) => setRecievedRegid(e.target.value)}
                value={recievedBy_regId}
                required
              />
            </div>
            <div className="Item_Return__Row">
              <h4>Phone number: </h4>
              <input
                type="text"
                onChange={(e) => setRecievedPhone(e.target.value)}
                value={recievedBy_phone}
                required
              />
            </div>
            <div className="Item_Return__Row">
              <h4>Father Phone: </h4>
              <input
                type="text"
                onChange={(e) => setFatherPhone(e.target.value)}
                value={father_phone}
                required
              />
            </div>
            <div className="Return-BtnS d-flex">
              <button
                className="Return-btn w-100"
                onClick={() => handleClick()}
              >
                Return
              </button>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return <NonAdmin />;
  }
};

export default ReturnItem;
