import React, { useState, useEffect } from 'react';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useAllentriesContext } from '../hooks/useAllentriesContext';
import '../Styles/ItemForm.css';
import { Link, useNavigate } from 'react-router-dom';

import NonAdmin from './NonAdmin';
import Suggestions from './Suggestions';

const ItemForm = () => {
  const { items, dispatch } = useItemsContext();
  const { Allitems, Alldispatch } = useAllentriesContext();
  const { user } = useAuthContext();

  const [_id, setItemid] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [submitedBy, setSubmitedBy] = useState('');
  const [regId, setRegId] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const adminfetchItem = async () => {
      const response = await fetch('/api/items', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    const fetchAllItems = async () => {
      const Allitemresponse = await fetch('/api/all_items', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await Allitemresponse.json();

      if (Allitemresponse.ok) {
        Alldispatch({ type: 'SET_ITEMS', payload: json });
      }
    };

    if (user) {
      adminfetchItem();
      fetchAllItems();
    }

    if (items) {
      if (Allitems) {
        let ItemFullId = items.length + Allitems.length + 1;
        setItemid('SRSITM_' + ItemFullId);
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemDetais = {
      _id,
      name,
      desc,
      place,
      date,
      submitedBy,
      regId,
      phone,
    };

    const response = await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(itemDetais),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName('');
      setDesc('');
      setPlace('');
      setError(null);
      setEmptyFields([]);
      // console.log('new item added', json);
      dispatch({ type: 'CREATE_ITEM', payload: json });
      navigate('/items');
    }
  };

  const itemName = (name) => {
    setName(name);
    // console.log(name);
  };

  if (user) {
    return (
      <div className="form-parent">
        <form className="create">
          <h3>
            Item entry - <span>{_id}</span>
          </h3>
          {error && <div className="error">{error}</div>}

          <div className="Form-Content FormBoxes">
            <div className="Box">
              <div className="Item-form-Row">
                <label>Item:</label>
                {/* <ItemSuggestions itemName={itemName} className="Input-Box" /> */}
                <Suggestions onChange={itemName} />
              </div>

              <div className="Item-form-Row">
                <label>Description:</label>
                <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  className="Input-Box"
                  // className={emptyFields.includes('desc') ? 'error' : ''}
                ></textarea>
              </div>

              <div className="Item-form-Row">
                <label>Place found:</label>
                <input
                  type="text"
                  onChange={(e) => setPlace(e.target.value)}
                  value={place}
                  className="Input-Box"
                  // className={emptyFields.includes('place') ? 'error' : ''}
                />
              </div>

              <div className="Item-form-Row">
                <label>Date:</label>
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  className="Input-Box"
                  // className={emptyFields.includes('date') ? 'error' : ''}
                />
              </div>

              <div className="Item-form-Row">
                <label>Submitted by</label>
                <input
                  type="text"
                  onChange={(e) => setSubmitedBy(e.target.value)}
                  value={submitedBy}
                  className="Input-Box"
                  // className={emptyFields.includes('submitedBy') ? 'error' : ''}
                />
              </div>

              <div className="Item-form-Row">
                <label>Registration number / Employee id:</label>
                <input
                  type="text"
                  onChange={(e) => setRegId(e.target.value)}
                  value={regId}
                  className="Input-Box"
                  // className={emptyFields.includes('regId') ? 'error' : ''}
                />
              </div>
              <div className="Item-form-Row">
                <label>Phone number</label>
                <input
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  className="Input-Box"
                  // className={emptyFields.includes('phone') ? 'error' : ''}
                />
              </div>
              <div className="actions">
                <label htmlFor="file" className="button upload-btn">
                  Choose File
                  <input className="file" hidden="" type="file" id="file" />
                </label>
              </div>
              <div className="Item-form-Row">
                <label></label>
                <div className="Returned-btn" onClick={handleSubmit}>
                  Save
                </div>
              </div>
            </div>
          </div>

          <div className="Form-Btn-Container">
            
          </div>
        </form>
      </div>
    );
  } else {
    return <NonAdmin />;
  }
};

export default ItemForm;
