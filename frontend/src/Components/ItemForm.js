import React, { useState } from 'react';
import { useItemsContext } from '../hooks/useItemsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import '../Styles/ItemForm.css'
import TimePicker from 'react-time-picker';
import ItemSuggestions from './ItemSuggestions';

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

        <table className="Form-Contents">
          <tbody>
          <tr>
            <td><label>Item:</label></td>
            <td>
              <ItemSuggestions/>             
                {/* <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  // className={emptyFields.includes('name') ? 'error' : ''}
                /> */}
            </td>
          </tr>

          <tr>
            <td><label>Description:</label></td>
            <td>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                // className={emptyFields.includes('desc') ? 'error' : ''}
              ></textarea>
            </td>
          </tr>

          <tr>
            <td><label>Place:</label></td>
            <td>
            <input
              type="text"
              onChange={(e) => setPlace(e.target.value)}
              value={place}
              // className={emptyFields.includes('place') ? 'error' : ''}
            />
            </td>
          </tr>
          <tr>
            <td><label>Date:</label></td>
            <td>
            <input
              type="date"
            
              onChange={(e) => setDate(e.target.value)}
              value={date}
              // className={emptyFields.includes('date') ? 'error' : ''}
            />
            </td>
          </tr>

          <tr>
            <td><label>Time:</label></td>
            <td></td>
          </tr>
          </tbody>
        </table>
        
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
