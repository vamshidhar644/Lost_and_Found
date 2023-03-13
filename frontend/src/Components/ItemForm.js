import React, { useState } from 'react';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import '../Styles/ItemForm.css';

import ItemSuggestions from './ItemSuggestions';

const ItemForm = () => {
  const { dispatch } = useItemsContext();
  const { user } = useAuthContext();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState();
  const [submitedBy, setSubmitedBy] = useState('');
  const [regId, setRegId] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }
    const itemDetais = { name, desc, place, date, submitedBy, regId, phone };

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
    }
  };
  // console.log(date);

  const itemName = (name) => {
    setName(name);
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Item entry</h3>
      {error && <div className="error">{error}</div>}

      <div className="Form-Content">
        <div className="Item-form-Row">
          <label>Item:</label>
          <ItemSuggestions itemName={itemName} />
        </div>

        <div className="Item-form-Row">
          <label>Description:</label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            // className={emptyFields.includes('desc') ? 'error' : ''}
          ></textarea>
        </div>

        <div className="Item-form-Row">
          <label>Place found:</label>
          <input
            type="text"
            onChange={(e) => setPlace(e.target.value)}
            value={place}
            // className={emptyFields.includes('place') ? 'error' : ''}
          />
        </div>

        <div className="Item-form-Row">
          <label>Date:</label>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            // className={emptyFields.includes('date') ? 'error' : ''}
          />
        </div>

        <div className="Item-form-Row">
          <label>Submitted by</label>
          <input
            type="text"
            onChange={(e) => setSubmitedBy(e.target.value)}
            value={submitedBy}
            // className={emptyFields.includes('submitedBy') ? 'error' : ''}
          />
        </div>

        <div className="Item-form-Row">
          <label>Registration number / Employee id:</label>
          <input
            type="text"
            onChange={(e) => setRegId(e.target.value)}
            value={regId}
            // className={emptyFields.includes('regId') ? 'error' : ''}
          />
        </div>

        <div className="Item-form-Row">
          <label>Phone number</label>
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            // className={emptyFields.includes('phone') ? 'error' : ''}
          />
        </div>
        <div className="actions">
          <label htmlFor="file" className="button upload-btn">
            Choose File
            <input className="file" hidden="" type="file" id="file" />
          </label>
        </div>

        <button>Add Item</button>
      </div>
    </form>
  );
};

export default ItemForm;
