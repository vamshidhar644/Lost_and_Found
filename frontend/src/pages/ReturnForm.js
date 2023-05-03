import React, { useState } from 'react';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';

import { Link, useNavigate } from 'react-router-dom';

import '../Styles/ReturnItems.css';
import { useAllentriesContext } from '../hooks/useAllentriesContext';
import NonAdmin from '../Components/NonAdmin';

const ReturnItem = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [recieved_date, setRecievedDate] = useState('');
  const [recievedBy_Name, setRecievedBy] = useState('');
  const [recievedBy_regId, setRecievedRegid] = useState('');
  const [recievedBy_phone, setRecievedPhone] = useState('');
  const [father_phone, setFatherPhone] = useState('');
  const [error, setError] = useState(null);

  const { dispatch } = useItemsContext();
  const { Alldispatch } = useAllentriesContext();

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
      if (!user) {
        return;
      }

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

      const Addresponse = await fetch('/api/all_items', {
        method: 'POST',
        body: JSON.stringify(itemDetais),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const Addjson = await Addresponse.json();
      if (!Addresponse.ok) {
        setError(Addjson.error);
      }

      if (Addresponse.ok) {
        setRecievedDate('');
        setRecievedBy('');
        setRecievedRegid('');
        setRecievedPhone('');
        setFatherPhone('');
        setError(null);

        Alldispatch({ type: 'CREATE_ITEM', payload: Addjson });

        const response = await fetch('/api/items/' + _id, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'DELETE_ITEM', payload: json });
        }
        navigate('/items');
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
              {/* <div className="Return-btn">
              <Link to="/items">Back</Link>
            </div> */}
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
