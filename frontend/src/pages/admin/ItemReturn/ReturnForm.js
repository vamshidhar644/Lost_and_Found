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
        <div className="Return-Container">
          <div className="Details-Content">
            <div className="Item-Return-Row">
              <h4>Entry number : </h4>
              <p>{_id}</p>
            </div>
            <div className="Item-Return-Row">
              <h4>Item : </h4>
              <p>{name}</p>
            </div>
            <div className="Item-Return-Row">
              <h4>Description : </h4>
              <p>{desc}</p>
            </div>
            <div className="Item-Return-Row">
              <h4>Place found : </h4>
              <p>{place_found}</p>
            </div>
            <div className="Item-Return-Row">
              <h4>Date : </h4>
              <p>{submited_date}</p>
            </div>
            <div className="Item-Return-Row">
              <h4>Submitted by : </h4>
              <p>{submitedBy_Name}</p>
            </div>
            <div className="Item-Return-Row">
              <h4>Registration number : /Employee id </h4>
              <p>{submitedBy_regId}</p>
            </div>
            <div className="Item-Return-Row">
              <h4>Phone number : </h4>
              <p>{submitedBy_phone}</p>
            </div>
          </div>

          <div className="Owner-Content">
            {error && <div className="error">{error}</div>}
            <div className="Item-Return-Row">
              <h5>Reciever Details: </h5>
            </div>
            <div className="Item-Return-Row">
              <label>Recieved Date: </label>
              <input
                type="date"
                onChange={(e) => setRecievedDate(e.target.value)}
                value={recieved_date}
              />
            </div>
            <div className="Item-Return-Row">
              <label>Recieved by:</label>
              <input
                type="text"
                onChange={(e) => setRecievedBy(e.target.value)}
                value={recievedBy_Name}
              />
            </div>

            <div className="Item-Return-Row">
              <label>Registration number / Employee id: </label>
              <input
                type="text"
                onChange={(e) => setRecievedRegid(e.target.value)}
                value={recievedBy_regId}
              />
            </div>
            <div className="Item-Return-Row">
              <label>Phone number: </label>
              <input
                type="text"
                onChange={(e) => setRecievedPhone(e.target.value)}
                value={recievedBy_phone}
              />
            </div>
            <div className="Item-Return-Row">
              <label>Father Phone: </label>
              <input
                type="text"
                onChange={(e) => setFatherPhone(e.target.value)}
                value={father_phone}
              />
            </div>
            <div className="Return-BtnS">
              <div className="Return-btn" onClick={handleClick}>
                Return
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <NonAdmin />;
  }
};

export default ReturnItem;
