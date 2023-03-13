import React from 'react';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';

import '../Styles/ItemReturn.css'

const ReturnItem = () => {
  // const { dispatch } = useItemsContext();
  const { user } = useAuthContext();

  const location = useLocation();

  const { dispatch } = useItemsContext();
  if (user) {
    const {
      Item_Title,
      Item_Desc,
      Item_Place,
      Item_Date,
      Item_SubmitedBy,
      Item_RegId,
      Item_Phone,
    } = location.state;

    return (
      <div className="Retrun-Container">
        <div className="Details-Content">
          <div className="Item-Return-Row">
            <h4>Entry number: </h4>
            <p>{}</p>
          </div>
          <div className="Item-Return-Row">
            <h4>Item: </h4>
            <p>{Item_Title}</p>
          </div>
          <div className="Item-Return-Row">
            <h4>Description: </h4>
            <p>{Item_Desc}</p>
          </div>
          <div className="Item-Return-Row">
            <h4>Place found: </h4>
            <p>{Item_Place}</p>
          </div>
          <div className="Item-Return-Row">
            <h4>Date: </h4>
            <p>{Item_Date}</p>
          </div>
          <div className="Item-Return-Row">
            <h4>Submitted by: </h4>
            <p>{Item_SubmitedBy}</p>
          </div>
          <div className="Item-Return-Row">
            <h4>Registration number / Employee id: </h4>
            <p>{Item_RegId}</p>
          </div>
          <div className="Item-Return-Row">
            <h4>Phone number: </h4>
            <p>{Item_Phone}</p>
          </div>
        </div>

        
        <div className='Owner-Content'>
          <div className="Item-Return-Row">
            <h5>Reciever Details: </h5>
          </div>
          
          <div className="Item-Return-Row">
          <label>Recieved by:</label>
          <input
            type="text"
            // className={emptyFields.includes('submitedBy') ? 'error' : ''}
          />
          </div>
          
          <div className="Item-Return-Row">
          <label>Registration number / Employee id: </label>
          <input
            type="text"
            // className={emptyFields.includes('submitedBy') ? 'error' : ''}
          />
          </div>
          <div className="Item-Return-Row">
            <label>Phone number: </label>
            <input
              type="text"
              // className={emptyFields.includes('submitedBy') ? 'error' : ''}
            />
          </div>
          <div className="Item-Return-Row">
            <label>Father Phone: </label>
            <input
              type="text"
              // className={emptyFields.includes('submitedBy') ? 'error' : ''}
            />
          </div>
          <div className="Item-Return-Row">
          <label>Recieved Date: </label>
          <input
            type="text"
            // className={emptyFields.includes('submitedBy') ? 'error' : ''}
          />
          </div>
          <div className='Return-BtnS'>
            <div className="Returned-btn">Returned</div><br/>
            <Link to="/" className="Returned-btn">
              Back
            </Link>
          </div>
        </div>
        
      </div>
    );
  } else {
    return (
      <div className="Return-Section">
        <h3>Admin has to login</h3>
        <Link to="/login" className="login-btn">
          Admin login
        </Link>
      </div>
    );
  }
};

export default ReturnItem;
