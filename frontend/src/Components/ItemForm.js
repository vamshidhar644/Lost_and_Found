import React, { useState } from 'react';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import TimePicker from 'react-time-picker';

const ItemForm = () => {
  const { dispatch } = useItemsContext();
  const { user } = useAuthContext();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }
    const item = { name, desc, place, date };
    const response = await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(item),
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
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Item</h3>
      {error && <div className="error">{error}</div>}

      <div className="Form-Contents">
        <label>Item:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          // className={emptyFields.includes('name') ? 'error' : ''}
        />

        <label>Description:</label>
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          // className={emptyFields.includes('desc') ? 'error' : ''}
        ></textarea>
        {/* <input
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      /> */}

        <label>Place:</label>
        <input
          type="text"
          onChange={(e) => setPlace(e.target.value)}
          value={place}
          // className={emptyFields.includes('place') ? 'error' : ''}
        />

        <label>Date:</label>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          // className={emptyFields.includes('date') ? 'error' : ''}
        />

        <label>Time:</label>
      </div>

      <br />
      <div className="actions">
        <label htmlFor="file" className="button upload-btn">
          Choose File
          <input className="file" hidden="" type="file" id="file" />
        </label>
      </div>
      <br />

      <button>Add Item</button>
    </form>
  );
};

export default ItemForm;
